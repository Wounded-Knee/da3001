import React from 'react';
import User from './User.js';
import HDiv from './HDiv.js';
import consts from './constants.js';

const UserLayout = ({ user, me, title, helpers }) => {
	return (
		<HDiv classNames="layout userLayout grayscale">
			<User
				user={ user }
				me={ me }
				tagName='div'
				UDM={ consts.userDisplayMode.FULL }
				helpers={ helpers }
			/>
		</HDiv>
	);
};

export default UserLayout;
