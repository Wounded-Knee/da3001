import React, { Component } from 'react';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import Ajax from './Ajax.js';
import User from './User.js';
import TagDetail from './TagDetail.js';
import TestList from './TestList.js';
import UserList from './UserList.js';
import DefaultState from './data/DefaultState.js';
import Test from './Test.js';
import UserLayout from './UserLayout.js';
import Specimen from './Specimen.js';
import consts from './constants.js';
import axios from 'axios';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		// Setup state
		this.state = DefaultState;
	}

	componentDidMount() {
		this.onLoad();
	}

	api() {
		return {
			getUrl: () => this.state.api,
			getTests: () => (
				this.ajax('get', this.api().getUrl()+"/tests")
					.then(res => this.setState({ tests: res.data }))
					.catch(err => {})
			),
			getMe: () => (
				this.ajax('get', this.api().getUrl()+"/users/me")
					.then(res => {
						this.setState((previousState, currentProps) => {
							return {
								me: res.data,
								users: [
									...previousState.users.filter(user => user.id !== res.data.id),
									res.data
								]
							};
						})
					})
			),
			getUser: function(userId) {
				this.ajax('get', this.api().getUrl()+'/user/'+userId)
					.then(res => {
						this.setState((previousState, currentProps) => {
							return {
								users: [
									...previousState.users.filter(user => user.id !== userId),
									res.data
								]
							};
						})
					})
			}.bind(this),
			getUsers: function() {
				this.ajax('get', this.api().getUrl()+'/users')
					.then(res => {
						this.setState((previousState, currentProps) => {
							return {
								users: res.data
							};
						})
					})
			}.bind(this),
			getRelations: () => (
				this.ajax('get', this.api().getUrl()+"/users")
					.then(res => this.setState({ relations: res.data }))
			),
			getTag: tagId => (
				this.ajax('get', this.api().getUrl()+"/tag/"+tagId)
					.then(res => {
						this.setState((previousState, currentProps) => {
							return {
								tags: [
									...previousState.tags.filter(tag => tag.id !== tagId),
									res.data
								]
							};
						})
					})
			),
		}
	}

	testHelpers() {
		return {
			onAnswer: function(testId, answerId) {
				return this.ajax('put', this.api().getUrl()+"/tests/"+testId+"/answer/"+answerId)
					.then(res => {
						this.assimilateTag(res.data);
						this.api().getTests();
					});
			}.bind(this),
			submitTest: function(testData) {
				return this.ajax('post', this.api().getUrl()+'/tests', testData)
					.then(res => {
						this.api().getTests();
					});
			}.bind(this),
			setUserPrivacyLevel: function(userId, privacyLevel_id) {
				return this.ajax('put', this.api().getUrl()+'/user/'+userId+'/privacy/'+privacyLevel_id)
					.then(res => {
						this.api().getMe();
						this.api().getRelations();
					});
			}.bind(this),
			setTagPrivacylevel: function(tagId, privacyLevel_id) {
				return this.ajax('put', this.api().getUrl()+'/tag/'+tagId+'/privacy/'+privacyLevel_id)
					.then(res => {
						this.api().getMe();
					});
			}.bind(this),
		}
	}

	ajax(httpMethod, url, data) {
		const args = [url];
		if (['put', 'patch', 'post'].indexOf(httpMethod) !== -1) args.push(data);
		args.push({
			withCredentials: true,
		});
		return axios[httpMethod](...args);
	}

	assimilateTag(tagData) {
		return new Promise((resolve, reject) => {
			this.setState((previousState, currentprops) => {
				if (previousState.me.tags.filter(tag => tag.id === tagData.id).length) {
					reject('Tag already exists!');
					return new Error('Tag already exists.');
				} else {
					const newState = {
						me: {
							...previousState.me,
							tags: tagData.me.tags,
						}
					};
					resolve(newState);
					return newState;
				}
			});
		});
	}

	assimilateMe(me) {
		this.setState((previousState, currentProps) => {
			return {
				...previousState,
				me: me
			}
		})
	}

	onError(error) {
		this.setState((previousState, currentProps) => {
			if (this.props.onError) this.props.onError(error);
			return {
				loadStatus: {
					...previousState.loadStatus,
					app: error
				}
			};
		});
	}

	onLoad() {
		this.setState((previousState, currentProps) => {
			if (this.props.onLoad) this.props.onLoad();
			return {
				loadStatus: {
					...previousState.loadStatus,
					app: true
				}
			};
		});
	}

	/* Render
	********/
	render() {
		return (
			<BrowserRouter>
				{ this.state.loadStatus.app === true ?
					<div className="App">
						<header>
							<div>

								{/* --- Identification -- */}

								<Route
									path="/"
									render={
										routeProps => (
											<Ajax fetch={ this.api().getMe }>
												{ routeProps.location.pathname === '/me' ?
													<User me={ this.state.me } user={ this.state.me } UDM={ consts.userDisplayMode.FACE } helpers={ this.testHelpers() } />
													:
													<User me={ this.state.me } user={ this.state.me } UDM={ consts.userDisplayMode.CARD } helpers={ this.testHelpers() } />
												}
											</Ajax>
										)
									}
								/>

								{/* --- Navigation --- */}
								<ul id="nav">
									<li><NavLink activeClassName="active" to="/me">Ego</NavLink></li>
									<li><NavLink activeClassName="active" to="/" exact>Answer</NavLink></li>
									<li><NavLink activeClassName="active" to="/ask">Inquiry</NavLink></li>
									<li><NavLink activeClassName="active" to="/users">Users</NavLink></li>
								</ul>
							</div>
						</header>

						{/* --- Specimen --- */}
						<Route
							path="/specimen"
							render={
								routeProps => {
									return (
										<Specimen {...routeProps} />
									);
								}
							}
						/>

						{/* --- Tag Detail View --- */}
						<Route
							path="/tags/:tagId"
							render={
								routeProps => {
									const tagId = parseInt(routeProps.match.params.tagId);
									return (
										<Ajax fetch={ this.api().getTag } args={ [tagId] }>
											<TagDetail
												{...routeProps}
												me={ this.state.me }
												helpers={ this.testHelpers() }
												tag={ this.state.tags.filter(tag => tag.id === tagId)[0] }
												usersWhoHaveTag={ [] }
											/>
										</Ajax>
									);
								}
							}
						/>

						{/* --- Users --- */}
						<Route
							path="/users"
							render={
								routeProps => <Ajax fetch={ this.api().getUsers }>
									<UserList
										{...routeProps}
										title="All Users"
										users={ this.state.users }
										me={ this.state.me }
										UDM={ consts.userDisplayMode.CARD }
										helpers={ this.testHelpers() }
									/>
								</Ajax>
							}
						/>

						{/* --- Answer View (index) --- */}
						<Route
							path="/"
							exact
							render={
								routeProps => {
									return (
										<Ajax fetch={ this.api().getTests }>
											<TestList
												title=""
												helpers={ this.testHelpers() }
												tests={ this.state.tests }
											/>
										</Ajax>
									)
								}
							}
						/>

						{/* --- Compose Test View --- */}
						<Route
							path="/ask"
							render={
								routeProps => <Test
									edit
									helpers={ this.testHelpers() }
								/>
							}
						/>

						{/* --- Me Detail View --- */}
						<Route
							path="/me"
							render={
								routeProps => (
									<Ajax fetch={ this.api().getRelations }>
										<UserLayout
											{...routeProps}
											user={ this.state.me }
											me={ this.state.me }
											title={ this.state.me.name }
											helpers={ this.testHelpers() }
										/>
									</Ajax>
								)
							}
						/>

						{/* --- User Detail View --- */}
						<Route
							path="/user/:userId"
							render={
								routeProps => {
									const userId = parseInt(routeProps.match.params.userId);
									const user = this.state.users.filter(user => user.id === userId)[0] || {};
									return (
										<Ajax fetch={ this.api().getUser } args={ [userId] }>
											<UserLayout
												{...routeProps}
												user={ user }
												me={ this.state.me }
												title={ user.name || '' }
												helpers={ this.testHelpers() }
											/>
										</Ajax>
									);
								}
							}
						/>
					</div>

				: this.state.loadStatus.app instanceof Error ?

					<div id="error">
						<p>Error loading application.</p>
					</div>

				:
					<div className="App loading">
						<p>Loading...</p>
					</div>
				}
			</BrowserRouter>
		);
	}
}

export default App;
