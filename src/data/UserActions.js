import UserActionTypes from './UserActionTypes';
import Dispatcher from './Dispatcher';
import AJAX from './AJAX';

const Actions = {
	getAllUsers() {
		Dispatcher.dispatch({
			type: UserActionTypes.REQUEST_ALL_USERS,
		});

		AJAX('get', '/user/all').then(response => {
			Dispatcher.dispatch({
				type: UserActionTypes.RECEIVE_ALL_USERS,
				users: response.data,
			});
		})
	},

	getMe() {
		Dispatcher.dispatch({
			type: UserActionTypes.REQUEST_ME,
		});

		AJAX('get', '/user/me').then(response => {
			Dispatcher.dispatch({
				type: UserActionTypes.RECEIVE_ME,
				me: response.data,
			});
		})
	},

	getUser(userId) {
	},

	addUser(text) {
	},
};

export default Actions;
