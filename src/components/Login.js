import React, { useContext, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { useLocation, useHistory } from "react-router-dom";
import { EVENT_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { login } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Login = observer(() => {
	const { user } = useContext(Context)
	const location = useLocation()
	const history = useHistory()
	const isLogin = location.pathname === LOGIN_ROUTE
	const [phoneNumber, setPhoneNumber] = useState('')
	const [password, setPassword] = useState('')

	const click = async () => {
		try {
			const response = await login(phoneNumber, password);
			user.setUser(response);
			user.setIsAuth(true);
			history.push(EVENT_ROUTE);
		} catch (e) {
			alert(e.response.data.message)
		}
	};



	return (
		<Container
			className="d-flex justify-content-center align-items-center"
			style={{ height: window.innerHeight - 54 }}
		>
			<Card style={{ width: 600 }} className="p-5">
				<h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
				<Form className="d-flex flex-column">
					<Form.Control
						className="mt-3"
						placeholder="Введите ваш номер телефона..."
						value={phoneNumber}
						onChange={e => setPhoneNumber(e.target.value)}
					/>
					<Form.Control
						className="mt-3"
						placeholder="Введите ваш пароль..."
						value={password}
						onChange={e => setPassword(e.target.value)}
						type="password"
					/>
					<Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
						<Button
							variant={"outline-success"}
							onClick={click}
						>
							{'Войти'}
						</Button>
					</Row>

				</Form>
			</Card>
		</Container>
	);
});

export default Login;