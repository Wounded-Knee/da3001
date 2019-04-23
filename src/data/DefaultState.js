const DefaultState = {
	loadStatus: {
		app: true,
		me: true,
		tests: true,
	},
	api: 'http://joshua.local:3001',
	me: {},
	tags: [],
	relations: [],
	users: [],
	tests: [],
	privacyLevels: [
		{ id: 0, value: 0, name: "Private" },
		{ id: 1, value: 1, name: "Close" },
		{ id: 2, value: 2, name: "Near" },
		{ id: 3, value: 3, name: "Far" },
		{ id: 4, value: 4, name: "Public" },
	]
};

export default DefaultState;
