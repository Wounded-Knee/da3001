import React, { Component } from 'react';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import { UserFace } from './User.js';
import DefaultState from './data/DefaultState.js';
import UserLayout from './UserLayout.js';
import consts from './constants.js';
import './App.css';
import API from './API';

class App extends Component {
	constructor(props) {
		super(props);

		// Setup state
		this.state = DefaultState;
	}

	api() {
		/*
		return {
			getUrl: () => this.state.api,
			becomeUser: userId => {
				return this.ajax('get', this.api().getUrl()+"/become/"+userId)
					.then(res => this.api().getMe())
			},
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
		*/
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

	/* Render
	********/
	render() {
		const me = this.state.users.filter(user => user.id === this.state.userId);
		return (
			<BrowserRouter>
				{ this.state.loadStatus.app === true ?
					<div className="App">
						<header>
							<div>
								<UserFace me={ me } user={ me } />

								{/* --- Navigation --- */}
								<ul id="nav">
									<li><NavLink activeClassName="active" to="/me">Ego</NavLink></li>
									<li><NavLink activeClassName="active" to="/" exact>Answer</NavLink></li>
									<li><NavLink activeClassName="active" to="/ask">Inquiry</NavLink></li>
									<li><NavLink activeClassName="active" to="/users">Users</NavLink></li>
								</ul>
							</div>
						</header>

						{/* --- User Detail View --- */}
						<Route
							path="/user/:userId"
							render={
								routeProps => {
									const userId = parseInt(routeProps.match.params.userId);
									const user = this.state.users.filter(user => user.id === userId)[0] || {};
									return (
										<API routine="getUser" params={ routeProps.match.params } setState={ this.setState.bind(this) }>
											<UserLayout
												{...routeProps}
												user={ user }
												me={ me }
												title={ user.name || '' }
												helpers={ this.testHelpers() }
											/>
										</API>
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
