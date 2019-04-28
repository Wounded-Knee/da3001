import CustomImmutable from './CustomImmutable';

const Node = CustomImmutable({
  id: '',
  text: '',
  user_id: '',
  ratification: '',
  creation: '',
  handle: '',
  children: [],
});

export default Node;
