const DefaultState = {
  testsLoaded: false,
  testLoadError: false,
  me: {
    id: 0
  },
  users: [
    { id: 0, name: 'Anonymous', avatar: '/userAvatar_0' }
  ],
  tags: [],
  userTags: [],
  testTags: [],
  tests: [],
  testInstances: [],
};

// Temporarily generating fake users
var fauxUser,
	fauxUserTags = [];
for (var userId=1; userId<45; userId++) {
	fauxUser = {
		id: userId, name: "Anon #"+userId, avatar: '/userAvatar_'+Math.floor(Math.random()*5)
	};
	for (var tagId=1; tagId<Math.floor(Math.random()*10); tagId++) {
		fauxUserTags.push({
			userId: userId, tagId: Math.floor(Math.random()*10)
		})
	}
	DefaultState.users.push(fauxUser);
	DefaultState.userTags = [...DefaultState.userTags, ...fauxUserTags];
};

export default DefaultState;
