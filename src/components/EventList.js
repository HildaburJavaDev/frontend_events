import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Grid, Button, Modal, TextField } from '@material-ui/core';
import { Context } from '../index';
import { createEvent, getStatsByEvent, updateEvent, updateRegister } from '../http/eventsAPI';

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 275,
		marginBottom: 20,
		background: '#fff',
		color: '#000',
		border: '1px solid #d4af37',
		borderRadius: '10px',
		transition: 'transform 0.3s',
		'&:hover': {
			transform: 'scale(1.05)',
		},
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	date: {
		fontSize: 14,
		color: '#000',
	},
	address: {
		fontSize: 14,
		color: '#777',
		marginBottom: 5,
	},
	description: {
		fontSize: 14,
		marginBottom: 5,
	},
	registrationStatus: {
		fontSize: 14,
		color: '#777',
	},
	button: {
		marginTop: 10,
	},
	modal: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	addButton: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
}));

const EventList = ({ events }) => {
	const { user } = useContext(Context);
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [editedEvent, setEditedEvent] = useState({});
	const [isAddingEvent, setIsAddingEvent] = useState(false);

	const handleOpen = (event) => {
		setSelectedEvent(event);
		setEditedEvent({ ...event });
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setIsAddingEvent(false);
	};

	const handleRegistrationToggle = async (event) => {
		try {
			const newRegistrationIsOpen = !event.registrationIsOpen;
			await updateRegister(event.id, newRegistrationIsOpen);
			event.registrationIsOpen = newRegistrationIsOpen;
		} catch (error) {
			console.error('Ошибка при изменении статуса регистрации', error);
		}
	};

	const handleEdit = (event) => {
		handleOpen(event);
	};

	const handleViewStats = async (event) => {
		try {
			const response = (await getStatsByEvent(event.id)).data;
			console.log(response)
			const data = response[0];
			if (data && Object.keys(data).length !== 0) {
				alert(`Зарегистрировано на мероприятие: ${data.total_users} чел. \nПодтверждено ${data.confirmed_users}`);
			} else {
				alert('Нет зарегистрированных участников');
			}
		} catch (error) {
			console.error('Failed to get event stats:', error);
		}
	};

	const handleSave = async (e) => {
		e.preventDefault();
		try {
			if (isAddingEvent) {
				await createEvent(editedEvent.title, editedEvent.description, editedEvent.date, editedEvent.time, editedEvent.address);
			} else {
				alert(JSON.stringify(editedEvent))
				await updateEvent(
					selectedEvent.id,
					editedEvent.title,
					editedEvent.description,
					editedEvent.date,
					editedEvent.time,
					editedEvent.address,
					editedEvent.registrationIsOpen
				);
			}
			setOpen(false);
			setIsAddingEvent(false);
		} catch (error) {
			alert('Ошибка при обновлении мероприятия', error);
		}
	};

	const handleAddEvent = () => {
		setIsAddingEvent(true);
		setEditedEvent({}); // Clear the form
		setOpen(true);
	};

	if (!events || events.length === 0) {
		return <Typography>Нет доступных мероприятий</Typography>;
	}

	return (
		<Grid container spacing={3}>
			{events.map((event) => (
				<Grid item xs={12} sm={6} md={4} key={event.id}>
					<Card className={classes.root}>
						<CardContent>
							<Typography className={classes.title} gutterBottom>
								{event.title}
							</Typography>
							<Typography className={classes.date} variant="body2" component="p">
								Дата: {event.date}
							</Typography>
							<Typography className={classes.date} variant="body2" component="p">
								Время: {event.time}
							</Typography>
							<Typography className={classes.address} variant="body2" component="p">
								Адрес: {event.address}
							</Typography>
							<Typography className={classes.description} variant="body2" component="p">
								Описание: {event.description}
							</Typography>
							<Typography className={classes.registrationStatus} variant="body2" component="p">
								{event.registrationIsOpen ? 'Регистрация открыта' : 'Регистрация закрыта'}
							</Typography>
							{user._user.role_id === 1 && (
								<Button
									className={classes.button}
									variant="outlined"
									color="primary"
									onClick={() => handleRegistrationToggle(event)}
								>
									{event.registrationIsOpen ? 'Закрыть регистрацию' : 'Открыть регистрацию'}
								</Button>
							)}
							{user._user.role_id === 1 && (
								<Button
									className={classes.button}
									variant="outlined"
									color="primary"
									onClick={() => handleEdit(event)}
								>
									Редактировать
								</Button>
							)}
							{user._user.role_id === 1 && (
								<Button
									className={classes.button}
									variant="outlined"
									color="primary"
									onClick={() => handleViewStats(event)}
								>
									Смотреть статистику
								</Button>
							)}
						</CardContent>
					</Card>
				</Grid>
			))}
			<Button
				className={classes.addButton}
				variant="contained"
				color="primary"
				onClick={handleAddEvent}
				disabled={user._user.role_id !== 1}
			>
				Добавить мероприятие
			</Button>
			<Modal open={open} onClose={handleClose}>
				<div className={classes.modal}>
					<Typography variant="h6">{isAddingEvent ? 'Добавить мероприятие' : 'Редактировать мероприятие'}</Typography>
					<form onSubmit={handleSave}>
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							id="title"
							label="Название"
							name="title"
							autoFocus
							value={editedEvent.title || ''}
							onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							id="address"
							label="Адрес"
							name="address"
							value={editedEvent.address || ''}
							onChange={(e) => setEditedEvent({ ...editedEvent, address: e.target.value })}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							id="date"
							label="Дата (YYYY-MM-DD)"
							name="date"
							type="text"
							value={editedEvent.date || ''}
							onChange={(e) => setEditedEvent({ ...editedEvent, date: e.target.value })}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							id="time"
							label="Время (HH:MM)"
							name="time"
							type="text"
							value={editedEvent.time || ''}
							onChange={(e) => setEditedEvent({ ...editedEvent, time: e.target.value })}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							id="description"
							label="Описание"
							name="description"
							multiline
							rows={4}
							value={editedEvent.description || ''}
							onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })}
						/>
						<Button type="submit" variant="contained" color="primary" className={classes.button}>
							{isAddingEvent ? 'Добавить' : 'Сохранить'}
						</Button>
					</form>
				</div>
			</Modal>
		</Grid>
	);
};

export default EventList;
