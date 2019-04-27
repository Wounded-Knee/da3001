import NodeActionTypes from './NodeActionTypes';
import Dispatcher from './Dispatcher';
import AJAX from './AJAX';

const Actions = {
	getNode(nodeId) {
		if (nodeId > 0 && !Dispatcher.isDispatching()) {
			Dispatcher.dispatch({
				type: NodeActionTypes.REQUEST_NODE,
			});

			AJAX('get', '/node/'+nodeId).then(response => {
				Dispatcher.dispatch({
					type: NodeActionTypes.RECEIVE_NODE,
					node: response.data,
				});
			})
		} else {
			console.error('Failed to dispatch getNode() action because dispatcher was already dispatching.');
		}
	},
};

export default Actions;
