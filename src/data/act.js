import AJAX from './AJAX';

const serializer = data => JSON.stringify(data);
const act = ({ store, params, extractor, xhr }) => {
	const { method, endpoint, onSuccess } = xhr;
	const storeRecord = extractor(store, params);

	AJAX(method, endpoint).then(response => {
		if (storeRecord === false || serializer(extractor(store, params, response)) !== serializer(storeRecord)) {
			if (response.data !== '') {
				onSuccess(response);
			}
		}
	});

	return storeRecord;
};

export default act;
