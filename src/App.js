import React, { Component } from 'react';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
//import { UserFace } from './User.js';
import UserLayout from './UserLayout.js';
import UserList from './UserList.js';
import UserActions from './data/UserActions';
import NodeActions from './data/NodeActions';
import './App.css';
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
		UserActions.getMe();
	}

	render() {
		const me = this.props.users.filter(user => user.me)[0];

		return me ? (
			<BrowserRouter>
				<div className="App">
					<header>
						<div>
							{/* --- Navigation --- */}
							<ul id="nav">
								<li><NavLink activeClassName="active" to="/user/{ me.id }">Ego</NavLink></li>
								<li><NavLink activeClassName="active" to="/users">Users</NavLink></li>
								<li><NavLink activeClassName="active" to="/node/1" exact>Node #1</NavLink></li>
							</ul>
						</div>
					</header>

					{/* --- User List View --- */}
					<DataRoute
						path="/users"
						getData={ routeProps => (
							UserActions.getAllUsers(
								{ },
								this.props.users
							)
						) }
						propName="users"
					><UserList /></DataRoute>

					{/* --- User Detail View --- */}
					<DataRoute
						path="/user/:userId"
						getData={ routeProps => (
							UserActions.getUser(
								{ userId: parseInt(routeProps.match.params.userId) },
								this.props.users
							)
						) }
						propName="user"
					><UserLayout /></DataRoute>

					{/* --- Node Detail View --- */}
					<DataRoute
						path="/node/:nodeId"
						getData={ routeProps => (
							NodeActions.getNode(
								{ nodeId: parseInt(routeProps.match.params.nodeId) },
								this.props.nodes
							)
						) }
						propName="node"
					><Node /></DataRoute>
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
