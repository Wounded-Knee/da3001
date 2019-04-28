import AJAX from './AJAX';

const act = ({ store, params, extractor, xhr }) => {
	const { method, endpoint, onSuccess } = xhr;
	const storeRecord = extractor(store, params);
	const serializer = data => JSON.stringify(data);

	AJAX(method, endpoint).then(response => {
		if (storeRecord === false || serializer(extractor(store, params, response)) !== serializer(storeRecord)) {
			onSuccess(response);
		} else {
			console.log('Preventing loop');
		}
	});

	return storeRecord;
};

export default act;
