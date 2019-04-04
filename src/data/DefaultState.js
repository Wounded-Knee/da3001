import pluck from 'utils-pluck';

Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if ( i == 0 ) return this;
  while ( --i ) {
	 j = Math.floor( Math.random() * ( i + 1 ) );
	 temp = this[i];
	 this[i] = this[j];
	 this[j] = temp;
  }
  return this;
}

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
  userRelationships: [],
  privacyLevels: [
	{ id: 0, value: 0, name: "Private" },
	{ id: 1, value: 1, name: "Close" },
	{ id: 2, value: 2, name: "Near" },
	{ id: 3, value: 3, name: "Far" },
	{ id: 4, value: 4, name: "Public" },
  ]
};

// Temporarily generating fake users
var fauxUser,
	fauxUserTags = [];
for (var userId=1; userId<22; userId++) {
	fauxUser = {
		id: userId, name: "Anon #"+userId, avatar: '/userAvatar_'+Math.floor(Math.random()*5)
	};
	for (var tagId=1; tagId<Math.floor(Math.random()*10); tagId++) {
		var privacyLevel = (
			tagId === 0 ? 4 : pluck(DefaultState.privacyLevels, 'id').shuffle().splice(0,1)[0]
		);
		privacyLevel = 4;
		fauxUserTags.push({
			userId: userId,
			tagId: Math.floor(Math.random()*10),
			privacyLevel: privacyLevel
		})
	}
	DefaultState.users.push(fauxUser);
	DefaultState.userTags = [...DefaultState.userTags, ...fauxUserTags];
};

export default DefaultState;
