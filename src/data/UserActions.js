import UserActionTypes from './UserActionTypes';
import Dispatcher from './Dispatcher';
import AJAX from './AJAX';
import act from './act';

const Actions = {
	getAllUsers(params, store) {
		return act({
			store: store,
			params: params,
			extractor: (store, params, response) => response ? response.data : store || false,
			xhr: {
				method: 'get',
				endpoint: `/user/all`,
				onSuccess: response => {
					Dispatcher.dispatch({
						type: UserActionTypes.RECEIVE_ALL_USERS,
						users: response.data,
					});
				}
			}
		});
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

	getUser(params, store) {
		const { userId } = params;
		return act({
			store: store,
			params: params,
			extractor: (store, params, response) => {
				return response ? response.data : (store.filter(user => user.id === params.userId)[0] || false);
			},
			xhr: {
				method: 'get',
				endpoint: `/user/${userId}`,
				onSuccess: response => {
					Dispatcher.dispatch({
						type: UserActionTypes.RECEIVE_USER,
						node: response.data,
					});
				}
			}
		});
	},

	addUser(text) {
	},
};

export default Actions;
