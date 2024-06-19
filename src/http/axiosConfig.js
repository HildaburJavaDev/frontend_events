import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.APP_API_URL || 'http://31.128.40.92:8080'
});

instance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default instance;
