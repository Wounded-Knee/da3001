import React from 'react';
import HDiv from './HDiv.js';
import UserList from './UserList.js';

const Profile = ({ me, tags }) => {
	return (
		<HDiv title="Profile" classNames="profile">
			<UserList users={ [me] } />
		</HDiv>
	);
};

export default Profile;
// Flashmobs
// Peace through freedom
// Identify a song
// Identify song lyrics
// 