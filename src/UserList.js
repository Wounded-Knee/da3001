import React from 'react';

const UserList = (props) => {
	const {
		users,
		title,
	} = props;

	return (
		<div className="userList">
			<h2>{ title }</h2>
			<ul className="userList">
				{ users.map(user => ( <li>{ user.name }</li> )) }
			</ul>
		</div>
	);
};

export default UserList;
