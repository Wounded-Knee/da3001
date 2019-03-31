import React from 'react';
import User from './User.js';

const UserList = (props) => {
	const {
		users,
		title,
		children,
	} = props;

	return (
		<div className="userList">
			<h2>{ title }</h2>
			{
				users.length ?
					<ul class="clearfix">
						{ users.map(user => ( <User user={user} {...props} /> )) }
					</ul>
				: children
			}
		</div>
	);
};

export default UserList;
