import { Component } from 'react';
import DefaultState from './data/DefaultState.js';
import axios from 'axios';

const url = DefaultState.api;
const routines = {
	'setUserPrivacy': {
		method: 'put',
		endpoint: ({ userId, privacyId }) => `/user/${userId}/privacy/${privacyId}`,
	},
	'getMe': {
		method: 'get',
		endpoint: '/user/me',
		setState: (previousState, currentProps, responseData) => ({
			userId: responseData.id,
			users: [
				...previousState.users.filter(user => user.id !== responseData.id),
				responseData
			]
		})
	},
	'getUser': {
		method: 'get',
		endpoint: ({ userId }) => `/user/${userId}`,
		setState: (previousState, currentProps, responseData) => {
			console.log(previousState, currentProps, responseData);
			return {
				users: [
					...previousState.users.filter(user => user.id !== responseData.id),
					responseData
				]
			};
		},
	}
};

class API extends Component {
	componentWillMount() {
		this.doFetch();
	}

	componentWillReceiveProps(nextProps) { // or componentDidUpdate
		if (JSON.stringify(nextProps.args) !== JSON.stringify(this.props.args)) {
			this.doFetch();
		}
	}

	doFetch() {
		const { data, params, routine } = this.props;
		const { method, endpoint, setState } = routines[routine];
		const completeUrl = url + (typeof(endpoint) === 'function' ? endpoint(params) : endpoint );
		const args = [completeUrl];
		if (['put', 'patch', 'post'].indexOf(method) !== -1) args.push(data);
		args.push({
			withCredentials: true,
		});
		if (setState) {
			return axios[method](...args)
				.then(
					res => this.props.setState(
						(previousState, currentProps) => setState(previousState, currentProps, res.data)
					)
				);
		} else {
			return axios[method](...args);
		}
	}

	render() {
		return this.props.children || null;
	};
};

export default API;
