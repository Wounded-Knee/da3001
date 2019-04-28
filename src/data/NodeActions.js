import NodeActionTypes from './NodeActionTypes';
import Dispatcher from './Dispatcher';
import act from './act';

const Actions = {
	getNode(store, params) {
		const { nodeId } = params;
		return act({
			store: store,
			params: params,
			extractor: (store, params, response) => {
				if (response) {
					if (response.data) {
						return response.data;
					} else {
						return false;
					}
				}
				if (store instanceof Array) {
					return store.filter(node => node.id === params.nodeId)[0] || false;
				}
				return false;
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
