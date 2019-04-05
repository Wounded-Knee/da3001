import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import UserList from './UserList.js';
import TagDetail from './TagDetail.js';
import TestList from './TestList.js';
import PrivacyLayout from './PrivacyLayout.js';
import DefaultState from './data/DefaultState.js';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		// Setup state
		this.state = DefaultState;

		// Scope pointer for debuggery
		setTimeout(() => window.da3001 = this, 500);
	}

	getRoutes() {
		return (
			<div className="App-intro">
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
				{ this.state.testsLoaded ?

					<div className="App">
						{/* --- Navigation --- */}
						<header>
							<UserList me={ this.getMe() } users={ [this.getMe()] } />
							<Link to="/">Questions</Link> |
							<Link to="/privacy">Privacy</Link>
						</header>

						{/* --- Routes --- */}
						{ this.getRoutes() }

						{/* --- Questions --- */}
						<TestList
							title="Questions"
							tests={ this.state.tests }
							shouldTestRender={ this.shouldTestRender.bind(this) }
							onAnswer={ this.recordAnswer.bind(this) }
							onInitialize={ this.initializeTest.bind(this) }
						/>
					</div>

				: this.state.testLoadError ?

					<div>Error loading tests.</div>

				: 'Loading...' }

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
			</BrowserRouter>
		);
	}
}

export default App;
