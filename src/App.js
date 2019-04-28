import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
//import { UserFace } from './User.js';
import UserLayout from './UserLayout';
import UserList from './UserList';
import UserActions from './data/user/UserActions';
import NodeActions from './data/node/NodeActions';
import Node from './Node';

const DataRoute = ({ path, getData, propName, children }) => (
	<Route
		path={ path }
		render={
			routeProps => {
				const data = getData(routeProps);
				return data ? (
					React.cloneElement(children, {
						[propName]: data,
					})
				) : null;
			}
		}
	/>
);

class App extends Component {
	componentWillMount() {
		UserActions.getMe({}, this.props.users);
	}

	render() {
		const me = this.props.users.filter(user => user.me)[0];
		const globalProps = {
			me: me,
		};
		const {
			users,
			nodes,
		} = this.props;
		const userListViewGetData = rp => UserActions.getAllUsers(users);
		const userDetailViewGetData = rp => UserActions.getUser(users, { userId: parseInt(rp.match.params.userId) });
		const nodeDetailViewGetData = rp => NodeActions.getNode(nodes, { nodeId: parseInt(rp.match.params.nodeId) });

		return me ? (
			<BrowserRouter>
				<div className="App">
					<header>
						<div>
							{/* --- Navigation --- */}
							<ul id="nav">
								<li><NavLink activeClassName="active" to={ `/user/${me.id}` }>Ego</NavLink></li>
								<li><NavLink activeClassName="active" to="/users">Users</NavLink></li>
								<li><NavLink activeClassName="active" to="/node/1" exact>Node #1</NavLink></li>
							</ul>
						</div>
					</header>

					{/* --- User List View --- */}
					<DataRoute propName="users" path="/users" getData={ userListViewGetData }>
						<UserList {...globalProps} />
					</DataRoute>

					{/* --- User Detail View --- */}
					<DataRoute propName="user" path="/user/:userId" getData={ userDetailViewGetData }>
						<UserLayout {...globalProps} />
					</DataRoute>

					{/* --- Node Detail View --- */}
					<DataRoute propName="node" path="/node/:nodeId" getData={ nodeDetailViewGetData }>
						<Node {...globalProps} />
					</DataRoute>
				</div>
			</BrowserRouter>
		) : (
			<div>
				<h1>Loading</h1>
				<p>Be patient, fool.</p>
			</div>
		);
	}
}

export default App;
