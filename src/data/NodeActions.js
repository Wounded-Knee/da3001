import NodeActionTypes from './NodeActionTypes';
import Dispatcher from './Dispatcher';
import act from './act';

const Actions = {
	getNode(params, store) {
		const { nodeId } = params;
		return act({
			store: store,
			params: params,
			extractor: (store, params, response) => {
				return response ? response.data : (store.filter(node => node.id === params.nodeId)[0] || false);
			},
			xhr: {
				method: 'get',
				endpoint: `/node/${nodeId}`,
				onSuccess: response => {
					Dispatcher.dispatch({
						type: NodeActionTypes.RECEIVE_NODE,
						node: response.data,
					});
				}
			}
		});
	},
};

export default Actions;
