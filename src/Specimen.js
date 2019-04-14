import React, { Component } from 'react';
import User from './User.js';
import HDiv from './HDiv.js';
import consts from './constants.js';
import Stack from './Stack.js';

const shuffleArray = function(a) {
	var i = a.length, j, temp;
	if ( i === 0 ) return a;
	while ( --i ) {
		 j = Math.floor( Math.random() * ( i + 1 ) );
		 temp = a[i];
		 a[i] = a[j];
		 a[j] = temp;
	}
	return a;
}

const tagSpecimen = [
	{
		"id": 1,
		"name": "Spatula City",
		"emoji": "🍳",
		"privacyLevel_id": 1
	},
	{
		"id": 13,
		"name": "Cool Looking",
		"emoji": "😎",
		"privacyLevel_id": 1
	},
	{
		"id": 15,
		"name": "Unemployed",
		"emoji": "🏚️",
		"privacyLevel_id": 1
	},
	{
		"id": 19,
		"name": "Indecisive",
		"emoji": "🤔",
		"privacyLevel_id": 1
	},
	{
		"id": 7,
		"name": "Tag",
		"emoji": "😘",
		"privacyLevel_id": 1
	},
	{
		"id": 8,
		"name": "1",
		"emoji": "😀",
		"privacyLevel_id": 1
	},
	{
		"id": 9,
		"name": "TagName",
		"emoji": "😘",
		"privacyLevel_id": 1
	},
	{
		"id": 10,
		"name": "asdfasdf",
		"emoji": "😂",
		"privacyLevel_id": 1
	},
	{
		"id": 5,
		"name": "Wal-Mart",
		"emoji": "🍳",
		"privacyLevel_id": 1
	}
];

const getTags = (n) => {
	return shuffleArray([...tagSpecimen]).splice(0,n);
};

const getUser = () => ({
	"id": Math.floor((Math.random() * 1000) + 1),
	"name": getUserName(),
	"avatar": "userAvatar_" + Math.floor((Math.random() * 5) + 1),
	"tags": getTags(shuffleArray([0,1,5,10,50])[0]),
	"relations": [],
});

const addFriends = (thisUser) => {
	const user = { ...thisUser };
	for (var x=0; x<Math.floor((Math.random() * 5) + 1); x++) {
		user.relations.push(getUser());
	}
	return user;
}

const getUserName = () => {
	return shuffleArray([
		'Darth Kitten',
		'Anonymous',
		'John Smith',
		'Geraldine Clay',
		'Robert Thompson',
		'Bob Polichronopolous',
		'Jerard Selding',
		'Bob Trosper',
	])[0];
};

const me = getUser();

const userSpecimen = [
	addFriends(getUser()),
	addFriends(getUser()),
	addFriends(getUser()),
	addFriends(getUser()),
	addFriends(getUser()),
	addFriends(getUser()),
	addFriends(getUser()),
	addFriends(getUser()),
];

const helpers = {
	setUserPrivacyLevel: () => {}
};

class Specimen extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return (
			<div className="specimenLayout">
				<Stack>
					{
						userSpecimen.map(specimen => (
							<User key={ specimen.id } user={ specimen } me={ me } helpers={ helpers } UDM={ consts.userDisplayMode.FACE } />
						))
					}
				</Stack>

				<HDiv title="User Full">
					<User user={ userSpecimen[0] } me={ me } helpers={ helpers } UDM={ consts.userDisplayMode.FULL } />
				</HDiv>

				<HDiv title="User Faces">
				{
					userSpecimen.map(specimen => (
						<User key={ specimen.id } user={ specimen } me={ me } helpers={ helpers } UDM={ consts.userDisplayMode.FACE } />
					))
				}
				</HDiv>

				<HDiv title="User Cards">
				{
					userSpecimen.map(specimen => (
						<User key={ specimen.id } user={ specimen } me={ me } helpers={ helpers } />
					))
				}
				</HDiv>
			</div>
		);
	}
};

export default Specimen;
