import React, { Component} from 'react';
import { UserCard } from './User.js';
import HDiv from './HDiv.js';

class UserList extends Component {
	render() {
		const {
			me,
			users,
			children,
		} = this.props;

		return (
			<HDiv classNames="layout userList grayscale" title="User List">
				{
					users.length ?
						<ul className="clearfix">
							{ users.map(
								(user, index) => (
									<UserCard
										key={ index }
										me={ me }
										user={ user }
									/>
								)
							) }
						</ul>
					: children
				}
			</HDiv>
		);
	}
};

export default UserList;
