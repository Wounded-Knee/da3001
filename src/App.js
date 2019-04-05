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
		setTimeout(() => window.da3001 = this, 500);
	}

	componentDidMount() {
		Promise.all([
			this.api().getTests(),
			this.api().getMe()
		]).then(this.onLoad.bind(this));
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
			)
		}
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
					.then(res => this.setState({ newTag: res.data }))
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
							<Link to="/">Questions</Link> |
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

					<div>Error loading application.</div>

				: 'Loading...' }

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
						routeProps => <PrivacyLayout
							{...routeProps}
							privacyLevels={ this.state.privacyLevels }
							users={[]}
							tags={[]}
						/>
					}
				/>
			</div>
		);
	}
}

export default App;
