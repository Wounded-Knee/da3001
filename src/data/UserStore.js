import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import UserActionTypes from './UserActionTypes';
import Dispatcher from './Dispatcher';

class UserStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap();
  }

  reduce(state, action) {
    var newState = state;

    switch (action.type) {
      case UserActionTypes.RECEIVE_ME:
        newState = [ ...state.filter(obj => obj.me !== undefined), { ...action.me, me: true } ];
        console.log('RECEIVE_ME: ', action, newState);
        return newState;

      case UserActionTypes.RECEIVE_ALL_USERS:
        return action.users;

      case UserActionTypes.ADD_UPDATE_USER:
        newState = [ ...state.filter(obj => obj.id !== action.record.id), action.record ];
        return newState;

      case UserActionTypes.REQUEST_ALL_USERS:
      case UserActionTypes.REQUEST_ME:
        return state;

      default:
        if (UserActionTypes[action.type] !== undefined) {
          console.warn('UserStore: Unhandled action type "'+action.type+'"');
        }
        return state;
    }
  }
}

export default new UserStore();
