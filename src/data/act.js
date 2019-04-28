import axios from 'axios';
import DefaultState from './DefaultState.js';

const url = DefaultState.api;
const serializer = data => JSON.stringify(data);
const act = ({ store, params, extractor, xhr }) => {
	const { method, endpoint, onSuccess, data } = xhr;
	const storeRecord = extractor(store, params);

	const args = [ url + endpoint ];
	if (['put', 'patch', 'post'].indexOf(method) !== -1) args.push(data);
	args.push({	withCredentials: true }); // CORS

	axios[method](...args).then(response => {
		if (storeRecord === false || serializer(extractor(store, params, response)) !== serializer(storeRecord)) {
			if (response.data !== '') {
				onSuccess(response);
			}
		}
	});

	return storeRecord;
};

export default act;
