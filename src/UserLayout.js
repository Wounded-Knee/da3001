import React from 'react';
import { UserProfile } from './User.js';
import HDiv from './HDiv.js';

const UserLayout = ({ user, me, title, helpers }) => {
	return (
		<HDiv classNames="layout userLayout grayscale">
			<UserProfile
				user={ user }
				me={ me }
				helpers={ helpers }
			/>
		</HDiv>
	);
};

export default UserLayout;
