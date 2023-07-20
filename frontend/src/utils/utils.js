import Api from './Api';

const api = new Api({
	baseUrl: 'https://api.mesto.project.adg.nomoredomains.xyz',
	headers: {
		authorization: `Bearer ${localStorage.getItem('jwt')}`,
		'Content-Type': 'application/json'
	}
});

export default api;
