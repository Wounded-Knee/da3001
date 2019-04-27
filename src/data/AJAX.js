import axios from 'axios';
import DefaultState from './DefaultState.js';

const url = DefaultState.api;

const AJAX = function(method, endpoint, data) {
	const args = [ url + endpoint ];
	if (['put', 'patch', 'post'].indexOf(method) !== -1) args.push(data);
	args.push({	withCredentials: true }); // CORS

	return axios[method](...args)
}

export default AJAX;
