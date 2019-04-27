import {ReduceStore} from 'flux/utils';
import NodeActionTypes from './NodeActionTypes';
import Dispatcher from './Dispatcher';

const CHANGE_EVENT = 'change';

class NodeStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return [];
  }

  reduce(state, action) {
    var newState = state;
    switch (action.type) {
      case NodeActionTypes.RECEIVE_NODE:
        newState = [ ...state.filter(node => node.id !== action.node.id), action.node ];
        return newState;

      case NodeActionTypes.GET_NODE:
        newState = [ ...state.filter(obj => obj.id !== action.record.id), action.record ];
        this.emit(CHANGE_EVENT);
        return newState;

      case NodeActionTypes.REQUEST_NODE:
        return newState;

      default:
        if (NodeActionTypes[action.type] !== undefined) {
          console.warn('NodeStore: Unhandled action type "'+action.type+'"');
        }
        return state;
    }
  }
}

export default new NodeStore();
