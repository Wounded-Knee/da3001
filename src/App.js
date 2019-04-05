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
			this.api().getMe()
		]).then(this.onLoad.bind(this));
	}

	api() {
		return {
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

	/* Render
	********/
	render() {
		const youtubeVideos = [
			'DWO1pkHgrBM', 'gjY3LxPNaRM', '7xxgRUyzgs0'
		];
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

						{/* --- Questions --- 
						<TestList
							title="Questions"
							tests={ this.state.tests }
							shouldTestRender={ this.shouldTestRender.bind(this) }
							onAnswer={ this.recordAnswer.bind(this) }
							onInitialize={ this.initializeTest.bind(this) }
						/>
						*/}
					</div>

				: this.state.loadStatus.app instanceof Error ?

					<div>Error loading application.</div>

				: 'Loading...' }
{/*
				<iframe
					className="grayscale"
					title="video"
					width="560"
					height="315"
					src={ "https://www.youtube.com/embed/" + youtubeVideos[Math.floor(Math.random()*youtubeVideos.length)] }
					frameBorder="0"
					allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen>
				</iframe>
*/}
			</BrowserRouter>
		);
	}
}

export default App;
