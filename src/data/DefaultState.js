const DefaultState = {
  testsLoaded: false,
  testLoadError: false,
  me: {
    id: 0
  },
  users: [
    { id: 0, name: 'Anonymous', avatar: '/userAvatar_0.jpg' }
  ],
  tags: [],
  userTags: [],
  testTags: [],
  tests: [],
  testInstances: [],
}

export default DefaultState;
