import React from 'react';
import User from './User.js';
import HDiv from './HDiv.js';

const UserList = (props) => {
	const {
		users,
		title,
		children,
	} = props;
	const cardFan = props.cardFan && users.length > 1;

	return (
		<HDiv classNames="userList grayscale" title={ title }>
			{
				users.length ?
					<ul className={ "clearfix" + (cardFan ? " cardFan" : "") }>
						{ users.map(
							(user, index) => (
								<User
									{ ...props }
									key={ index }
									style={ cardFan ? { transform: "translate(-50%, -50%) rotate(" + ( (-40 / users.length) * index + 20 ) + "deg)" } : {} }
									user={ user }
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
