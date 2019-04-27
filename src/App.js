import React, { Component } from 'react';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
//import { UserFace } from './User.js';
import UserLayout from './UserLayout.js';
import UserList from './UserList.js';
import UserActions from './data/UserActions';
import './App.css';
import Node from './Node';

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
					<Route
						path="/users"
						render={
							routeProps => {
								return (
									<UserList
										{...this.props}
										{...routeProps.match.params}
										me={ me }
										title=""
									/>
								);
							}
						}
					/>

					{/* --- User Detail View --- */}
					<Route
						path="/user/:userId"
						render={
							routeProps => {
								return (
									<UserLayout
										{...this.props}
										{...routeProps.match.params}
										me={ me }
										user={ this.props.users.filter(user => user.id === parseInt(routeProps.match.params.userId))[0] }
									/>
								);
							}
						}
					/>

					{/* --- Node Detail View --- */}
					<Route
						path="/node/:nodeId"
						render={
							routeProps => {
								return (
									<Node {...this.props} {...routeProps.match.params} />
								);
							}
						}
					/>
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
