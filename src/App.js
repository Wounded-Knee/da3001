import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import UserList from './UserList.js';
import TagDetail from './TagDetail.js';
import TestList from './TestList.js';
import PrivacyLayout from './PrivacyLayout.js';
import DefaultState from './data/DefaultState.js';
import axios from 'axios';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		// Setup state
		this.state = DefaultState;

		// Scope pointer for debuggery
		window.da3001 = function() { return this.state; }.bind(this);
	}

	componentDidMount() {
		Promise.all([
			this.api().getTests(),
			this.api().getMe()
		]).then(
			this.onLoad.bind(this)
		).catch(
			this.onError.bind(this)
		);
	}

	api() {
		return {
			getTests: () => (
				axios
					.get("https://c53b9df7-65bc-422a-8167-3a4f8018cfbc.mock.pstmn.io/tests")
					.then(res => this.setState({ tests: res.data }))
			),
			getMe: () => (
				axios
					.get("https://c53b9df7-65bc-422a-8167-3a4f8018cfbc.mock.pstmn.io/users/me")
					.then(res => this.setState({ me: res.data }))
			),
			getRelations: () => (
				axios
					.get("https://c53b9df7-65bc-422a-8167-3a4f8018cfbc.mock.pstmn.io/users")
					.then(res => this.setState({ relations: res.data }))
			),
		}
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
							tags: [
								...previousState.me.tags,
								tagData
							]
						}
					};
					resolve(newState);
					return newState;
				}
			});
		});
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

	testHelpers() {
		return {
			onAnswer: function(testId, answerId) {
				axios
					.put("https://c53b9df7-65bc-422a-8167-3a4f8018cfbc.mock.pstmn.io/tests/"+testId+"/answer/"+answerId)
					.then(res => this.assimilateTag(res.data));
				this.api().getTests();
			}.bind(this)
		}
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
							<UserList me={ this.state.me } users={ [this.state.me] } />
							<Link to="/">Questions</Link> -
							<Link to="/privacy">Privacy</Link>
						</header>

						{/* --- Routes --- */}
						{ this.getRoutes() }

						{/* --- Questions --- */}
						<TestList
							title="Questions"
							helpers={ this.testHelpers() }
							tests={ this.state.tests }
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

	getRoutes() {
		return (
			<div className="routes">
				{/* --- Tag Detail View --- */}
				<Route
					path="/tags/:tagId"
					render={
						routeProps => <TagDetail
							{...routeProps}
							getSiblingTags={ this.getTagsByTest.bind(this) }
							tag={ this.getTagById(routeProps.match.params.tagId) }
							usersWhoHaveTag={ this.usersWhoHaveTag(routeProps.match.params.tagId) }
						/>
					}
				/>

				{/* --- Privacy View --- */}
				<Route
					path="/privacy"
					render={
						routeProps => {
							this.api().getRelations();
							return (
								<PrivacyLayout
									{...routeProps}
									privacyLevels={ this.state.privacyLevels }
									users={ this.state.relations }
									tags={[]}
								/>
							);
						}
					}
				/>
			</div>
		);
	}
}

export default App;
