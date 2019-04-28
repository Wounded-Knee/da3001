import {ReduceStore} from 'flux/utils';
import UserActionTypes from './UserActionTypes';
import Dispatcher from '../Dispatcher';

class UserStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return [];
  }

  reduce(state, action) {
    var newState = state;

    switch (action.type) {
      case UserActionTypes.RECEIVE_ME:
        newState = [ ...state.filter(obj => obj.me !== undefined), { ...action.me, me: true } ];
        return newState;

      case UserActionTypes.RECEIVE_ALL_USERS:
        return action.users;

      default:
        if (UserActionTypes[action.type] !== undefined) {
          console.warn('UserStore: Unhandled action type "'+action.type+'"');
        }
        return state;
    }
  }
}

export default new UserStore();
