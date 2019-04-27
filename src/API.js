import React from 'react';
import axios from 'axios';
import Dispatcher from './data/Dispatcher';
import DefaultState from './data/DefaultState.js';
import UserActionTypes from './data/UserActionTypes';
import NodeActionTypes from './data/NodeActionTypes';
import httpStatus from './data/httpStatus';
import User from './data/User';
import Node from './data/Node';

const url = DefaultState.api;
const debug = true;
const actions = {
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

	[NodeActionTypes.GET_NODE]: {
		getFromProps: (props, { nodeId }) => {
			const node = props.nodes.filter(node => node.id === nodeId)[0];
			return node ? node : false;
		},
		getStubData: ({ nodeId }) => ({ id: nodeId, HTTP_STATUS: httpStatus.PENDING }),
		getRecord: data => new Node(data),
		method: 'get',
		endpoint: ({ nodeId }) => `/node/${nodeId}`,
	},

	[UserActionTypes.ADD_UPDATE_USER]: {
		getFromProps: (props, { userId }) => {
			const record = props.users.filter(user => user.id === userId)[0];
			return record ? record : false;
		},
		getStubData: ({ userId }) => ({ id: userId, HTTP_STATUS: httpStatus.PENDING }),
		getRecord: data => new User(data),
		method: 'get',
		endpoint: ({ userId }) => `/user/${userId}`,
	},

	[UserActionTypes.ADD_UPDATE_USERS]: {
		getFromProps: props => props.users.length ? props.users : false,
		getStubData: params => [],
		getRecord: data => [ ...data ],
		method: 'get',
		endpoint: ({ userId }) => `/user/all`,
	},
};

const API = function(props) {
	if (debug) console.log('API ', props);
	const action = actions[props.action];
	if (!action) throw new Error("API has no "+props.action+" action.");
	const params = props.params || {};
	const { data } = params;
	const { method, endpoint, getFromProps, getStubData, getRecord } = action;
	const recordFromProps = getFromProps(props, params);
	const parentProps = props.parentProps || {};

	if (recordFromProps) {
		if (debug) console.log('API Returning from props: ', recordFromProps);
		return React.cloneElement(props.children, {
			parentProps: parentProps,
			[props.propName]: recordFromProps,
		});
	} else {
		const stub = getRecord(getStubData(params));
		const completeUrl = url + (typeof(endpoint) === 'function' ? endpoint(params) : endpoint );
		const args = [completeUrl];
		if (['put', 'patch', 'post'].indexOf(method) !== -1) args.push(data);
		args.push({
			withCredentials: true,
		});

		if (debug) console.log('API Stubbing: ', stub);

		// Stuff a stub into the store, until AJAX completes.
		Dispatcher.dispatch({
			type: props.action,
			record: stub,
		});

		// Kick off the AJAX
		axios[method](...args).then(
			response => {
				const record = getRecord({ ...response.data, HTTP_STATUS: httpStatus.COMPLETE });
				if (debug) console.log('API Dispatching server data: ', record);
				Dispatcher.dispatch({
					type: props.action,
					record: record,
				});
			}
		);
		return React.cloneElement(props.children, {
			parentProps: parentProps,
			[props.propName]: stub,
		});
	}
}

export default API;
