import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../index';

const NavbarComponent = () => {
	const location = useLocation();
	const { user } = useContext(Context);

	return (
		<Navbar bg="light" expand="lg" variant="light">
			<Navbar.Brand as={Link} to="/" style={{ color: 'black', fontFamily: 'Arial' }}>
				Мероприятия МКУК
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link
						as={Link}
						to="/courses"
						style={{
							color: location.pathname === '/courses' ? 'green' : 'black',
							borderBottom: location.pathname === '/events' ? '2px solid green' : 'none',
						}}
					>
						Мероприятия
					</Nav.Link>
					<Nav.Link
						as={Link}
						to="/cabinet"
						style={{
							color: location.pathname === '/cabinet' ? 'green' : 'black',
							borderBottom: location.pathname === '/cabinet' ? '2px solid green' : 'none',
						}}
					>
						Кабинет
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavbarComponent;
