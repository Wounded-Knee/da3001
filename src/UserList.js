import React from 'react';
import User from './User.js';
import HDiv from './HDiv.js';

const UserList = (props) => {
	const {
		users,
		title,
		children,
	} = props;

	return (
		<HDiv classNames="userList" title={ title }>
			{
				users.length ?
					<ul class="clearfix">
						{ users.map(user => ( <User user={user} {...props} /> )) }
					</ul>
				: children
			}
		</HDiv>
	);
};

export default UserList;
