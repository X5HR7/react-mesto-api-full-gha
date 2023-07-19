import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainPage from './MainPage';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import auth from '../utils/Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/utils';

const App = () => {
	const [isEditProfilePopupOpen, setEditProfileOpened] = React.useState(false);
	const [isAddPlacePopupOpen, setAddPlacePopupOpened] = React.useState(false);
	const [isEditAvatarPopupOpen, setEditAvatarPopupOpened] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState(null);
	const [currentUser, setCurrentUser] = React.useState({});
	const [loggedIn, setLoggedIn] = React.useState(false);
	const [email, setEmail] = React.useState('');

	const navigate = useNavigate();


	React.useEffect(() => {
		const jwt = localStorage.getItem('jwt');
		if (jwt) {
			auth
				.checkToken(jwt)
				.then(data => {
					if (data) {
						// api.updateToken();
						setLoggedIn(true);
						navigate('/', { replace: true });
						setEmail(data.data.email);
					}
				})
				.catch(err => {
					console.log(`Ошибка: ${err.status}`);
				});
		}
	}, [loggedIn, navigate]);

	React.useEffect(() => {
		api
			.getUser()
			.then(data => data.data)
			.then(user => setCurrentUser(user))
			.catch(err => {
				console.log(`Ошибка: ${err.status}`);
			});
	}, [loggedIn]);

	const handleAvatarUpdate = ({ avatar }) => {
		api
			.changeAvatar(avatar)
			.then(data => data.data)
			.then(user => {
				setCurrentUser(user);
				closeAllPopups();
			})
			.catch(err => {
				console.log(`Ошибка: ${err.status}`);
			});
	};

	const handleUserUpdate = ({ name, about }) => {
		api
			.editUserInfo(name, about)
			.then(data => data.data)
			.then(user => {
				setCurrentUser(user);
				closeAllPopups();
			})
			.catch(err => {
				console.log(`Ошибка: ${err.status}`);
			});
	};

	const closeAllPopups = () => {
		setEditProfileOpened(false);
		setEditAvatarPopupOpened(false);
		setAddPlacePopupOpened(false);
		setSelectedCard(null);
	};

	const handleEditAvatarClick = () => {
		setEditAvatarPopupOpened(true);
	};

	const handleEditProfileClick = () => {
		setEditProfileOpened(true);
	};

	const handleAddPlaceClick = () => {
		setAddPlacePopupOpened(true);
	};

	const handleCardClick = card => {
		setSelectedCard(card);
	};

	const handleLogin = () => {
		setLoggedIn(true);
	};

	const handleQuit = () => {
		setLoggedIn(false);
		localStorage.removeItem('jwt');
	};

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className='root'>
				<Routes>
					<Route path='/sign-up' element={<Register />} />
					<Route path='/sign-in' element={<Login handleLogin={handleLogin} />} />
					<Route
						path='*'
						element={
							<ProtectedRoute
								element={MainPage}
								loggedIn={loggedIn}
								email={email}
								handleQuit={handleQuit}
								handleUserUpdate={handleUserUpdate}
								handleAvatarUpdate={handleAvatarUpdate}
								closeAllPopups={closeAllPopups}
								popupsState={{ isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen }}
								handleEditAvatarClick={handleEditAvatarClick}
								handleEditProfileClick={handleEditProfileClick}
								handleAddPlaceClick={handleAddPlaceClick}
								handleCardClick={handleCardClick}
								selectedCard={selectedCard}
							/>
						}
					/>
				</Routes>
			</div>
		</CurrentUserContext.Provider>
	);
};

export default App;
