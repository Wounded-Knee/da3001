import React from 'react';

const User = ({ user }) => {
	return (
		<li>
			<img src={ user.avatar } width="50" />
			<p className="name">{ user.name }</p>
		</li>
	);
};

export default User;
