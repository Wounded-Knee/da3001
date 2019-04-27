import AppView from '../views/AppView';
import {Container} from 'flux/utils';
import UserStore from '../data/UserStore';
import NodeStore from '../data/NodeStore';

function getStores() {
  return [
    UserStore,
    NodeStore,
  ];
}

function getState() {
  return {
    users: UserStore.getState(),
    nodes: NodeStore.getState(),
  };
}

export default Container.createFunctional(AppView, getStores, getState);
