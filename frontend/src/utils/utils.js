import Api from './Api';

const api = new Api({
	baseUrl: 'http://localhost:3001',
	headers: {
		authorization: `Bearer ${localStorage.getItem('jwt')}`,
		'Content-Type': 'application/json'
	}
});

export default api;