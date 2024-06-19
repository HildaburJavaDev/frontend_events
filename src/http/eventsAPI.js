import axios from './axiosConfig';

export const getAll = async () => {
	return await axios.get('/api/events/')
}

export const getOne = async (eventId) => {
	return await axios.get(`/api/events/${eventId}`)
}

export const updateEvent = async (id, title, description, date, time, address, registrationIsOpen) => {
	return await axios.patch('/api/events/', { id, title, description, address, date, time, registrationIsOpen })
}

export const updateRegister = async (id, registrationIsOpen) => {
	return await axios.patch('/api/events/changeregister', { id, registrationIsOpen })
}

export const createEvent = async (title, description, date, time, address,) => {
	alert("HERE")
	return await axios.post('/api/events/create', { title, description, date, time, address })
}

export const getStatsByEvent = async (id) => {
	return await axios.post('api/events/getstats', { id })
}