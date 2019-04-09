import React, { Component } from 'react';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import Ajax from './Ajax.js';
import UserList from './UserList.js';
import TagDetail from './TagDetail.js';
import TestList from './TestList.js';
import PrivacyLayout from './PrivacyLayout.js';
import DefaultState from './data/DefaultState.js';
import ComposeTest from './ComposeTest.js';
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
					.then(res => this.setState({ me: res.data }))
			),
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
				this.ajax('put', this.api().getUrl()+"/tests/"+testId+"/answer/"+answerId)
					.then(res => this.assimilateTag(res.data));
				this.api().getTests();
			}.bind(this),
			submitTest: function(testData) {
				this.ajax('post', this.api().getUrl()+'/tests', testData);
				this.api().getTests();
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
						{/* --- Navigation --- */}
						<header>

							<Ajax fetch={ this.api().getMe }>
								<UserList me={ this.state.me } users={ [this.state.me] } />
							</Ajax>

							<NavLink activeClassName="active" to="/" exact>Answer</NavLink>
							&nbsp;|&nbsp;
							<NavLink activeClassName="active" to="/ask">Ask</NavLink>
							&nbsp;|&nbsp;
							<NavLink activeClassName="active" to="/privacy">Privacy</NavLink>

						</header>

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
												tag={ this.state.tags.filter(tag => tag.id === tagId)[0] }
												usersWhoHaveTag={ [] }
											/>
										</Ajax>
									);
								}
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
												title="Questions"
												helpers={ this.testHelpers() }
												tests={ this.state.tests }
											/>
										</Ajax>
									)
								}
							}
						/>

						{/* --- Compose Test View (index) --- */}
						<Route
							path="/ask"
							render={
								routeProps => {
									return ( <ComposeTest helpers={ this.testHelpers() } /> )
								}
							}
						/>

						{/* --- Privacy View --- */}
						<Route
							path="/privacy"
							render={
								routeProps => (
									<Ajax fetch={ this.api().getRelations }>
										<PrivacyLayout
											{...routeProps}
											privacyLevels={ this.state.privacyLevels }
											users={ this.state.relations }
											tags={[]}
										/>
									</Ajax>
								)
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
