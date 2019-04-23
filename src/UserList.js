import React from 'react';
import { UserCard, UserFace, UserProfile } from './User.js';
import HDiv from './HDiv.js';

const UserList = (props) => {
	const {
		users,
		me,
		title,
		children,
		UDM,
		helpers,
	} = props;
	const cardFan = props.cardFan && users.length > 1;

	return (
		<HDiv classNames="layout userList grayscale" title={ title }>
			{
				users.length ?
					<ul className={ "clearfix" + (cardFan ? " cardFan" : "") }>
						{ users.map(
							(user, index) => (
								<UserCard
									{ ...props }
									key={ index }
									style={ cardFan ? { transform: "translate(-50%, -50%) rotate(" + ( (-40 / users.length) * index + 20 ) + "deg)" } : {} }
									user={ user }
									me={ me }
									UDM={ UDM }
									helpers={ helpers }
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
