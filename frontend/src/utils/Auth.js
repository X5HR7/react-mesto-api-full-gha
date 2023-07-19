class Auth {
	constructor({ baseUrl, headers }) {
		this.baseUrl = baseUrl;
		this.headers = headers;
	}

	_getResponseData(res) {
		if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
		return res.json();
	}

	register(password, email) {
		return fetch(`${this.baseUrl}/signup`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				password: password,
				email: email
			})
		}).then(res => {
			return this._getResponseData(res);
		});
	}

	login(password, email) {
		return fetch(`${this.baseUrl}/signin`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				password: password,
				email: email
			})
		}).then(res => {
			return this._getResponseData(res);
		});
	}

	checkToken(token) {
		return fetch(`${this.baseUrl}/users/me`, {
			method: 'GET',
			headers: {
				...this.headers,
				Authorization: `Bearer ${token}`
			}
		}).then(res => {
			return this._getResponseData(res);
		});
	}
}

const auth = new Auth({
	// baseUrl: 'https://auth.nomoreparties.co',
	baseUrl: 'http://localhost:3000',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
});

export default auth;
