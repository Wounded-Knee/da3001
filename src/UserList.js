import React, { Component} from 'react';
import { UserCard } from './User.js';
import UserActions from './data/UserActions';
import HDiv from './HDiv.js';

class UserList extends Component {
	componentWillMount() {
		setTimeout(() => {
			UserActions.getAllUsers();
		}, 1);
	}

	componentWillReceiveProps(nextProps) {
		if (JSON.stringify(nextProps.users) !== JSON.stringify(this.props.users)) {
			//UserActions.getAllUsers();
		}
	}

	render() {
		const {
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
										{ ...this.props }
										key={ index }
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
