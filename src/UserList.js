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
		<HDiv classNames="userList grayscale" title={ title }>
			{
				users.length ?
					<ul class="clearfix cardFan">
						{ users.map(
							(user, index) => (
								<User
									style={{ transform: "translate(-50%, -50%) rotate(" + ( (-40 / users.length) * index + 20 ) + "deg)" }}
									user={ user }
									{...props}
								/>
							)
						) }
					</ul>
				: children
			}
		</HDiv>
	);
};

export default UserList;
