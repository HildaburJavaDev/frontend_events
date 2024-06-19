import React, { useState, useEffect, useContext } from 'react';
import EventList from '../components/EventList';
import { getAll } from '../http/eventsAPI';
import { Context } from '../index';

const EventPage = () => {
	const [events, setEvents] = useState([]);


	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const data = (await getAll()).data;
				console.log(data)
				setEvents(data);
			} catch (error) {
				console.error('Ошибка:', error);
			}
		};

		fetchEvents();
	}, []);
	console.log("HERE!	")
	return (
		<div>
			<h1>Список мероприятий</h1>
			<EventList events={events} />
		</div>
	);
};

export default EventPage;
