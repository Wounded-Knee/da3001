import UserActionTypes from './UserActionTypes';
import Dispatcher from '../Dispatcher';
import act from '../act';

const Actions = {
	getAllUsers(store, params) {
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

	getMe(store, params) {
		return act({
			store: store,
			params: params,
			extractor: (store, params, response) => {
				if (response) return response.data;
				if (store instanceof Array) {
					return store.filter(user => !!user.me)[0] || false;
				}
				return false;
			},
			xhr: {
				method: 'get',
				endpoint: `/user/me`,
				onSuccess: response => {
					Dispatcher.dispatch({
						type: UserActionTypes.RECEIVE_ME,
						users: response.data,
					});
				}
			}
		});
	},

	getUser(store, params) {
		const { userId } = params;
		return act({
			store: store,
			params: params,
			extractor: (store, params, response) => {
				if (response) return response.data;
				if (store instanceof Array) {
					return store.filter(user => user.id === params.userId)[0] || false;
				}
				return false;
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
