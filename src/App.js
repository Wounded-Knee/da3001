import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import UserList from './UserList.js';
import TestPromises from './TestPromises.js';
import TagDetail from './TagDetail.js';
import TestList from './TestList.js';
import PrivacyLayout from './PrivacyLayout.js';
import DefaultState from './data/DefaultState.js';
import pluck from 'utils-pluck';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		// Setup state
		this.state = DefaultState;

		// Handle promises for test module loading
		this.awaitTestPromises();

		// Scope pointer for debuggery
		setTimeout(() => window.da3001 = this, 500);
	}

	awaitTestPromises() {
		const onImportAllTests = testPromises => {
			this.setState((previousState, currentProps) => {
				var testId = previousState.tests.length;
				return {
					tests: testPromises ? testPromises.map((testPromise, index) => ({
						id: testId + index,
						TestClass: testPromise.default,
						testInstance: undefined,
					})) : [],
					testsLoaded: !!testPromises,
					testLoadError: !testPromises
				};
			});
		};

		Promise.all(TestPromises).then(
			onImportAllTests
		).catch(
			onImportAllTests
		);
	}

	initializeTest({ TestClass, testInstance }) {
		pluck(testInstance.getAnswers(), 'tag').map((tagName, index) => {
			return this.createTag(
				tagName,
				globalTagId => {
					testInstance.assignGlobalIdToTag(index, globalTagId);
					this.setState((previousState, currentProps) => {
						return {
							...previousState,
							tests: [
								...(previousState.tests.map(test => ({
									...test,
									testInstance: (test.TestClass === TestClass) ? testInstance : test.testInstance
								})))
							],
							testTags: [
								...previousState.testTags,
								{
									testId: this.getIdByTestClass(TestClass),
									tagId: globalTagId
								}
							]
						}
					});
				}
			)
		});
	}

	/* Tests
	*********/
	getIdByTestClass(TestClass) {
		return this.state.tests.filter(test => test.TestClass === TestClass)[0].id;
	}

	getTestById(testId) {
		return this.state.tests.filter(test => test.id === testId)[0];
	}

	getTestByTag(tag) {
		return this.getTestById(this.state.testTags.filter(testTag => testTag.tagId === tag.id)[0].testId);
	}

	/* Tags
	********/
	createTag(tagName, registerNewTagIdCallback) {
		this.setState((previousState, currentProps) => {
			const globalTagId = Math.max(...pluck(previousState.tags, 'id'), -1)+1;
			registerNewTagIdCallback(globalTagId);
			return {
				...previousState,
				tags: [
					...previousState.tags,
					{
						id: globalTagId,
						name: tagName
					}
				]
			};
		});
	}

	getTagById(globalTagId) {
		return this.getTagsById([ parseInt(globalTagId) ])[0];
	}

	getTagsById(globalTagIds) {
		return this.hydrateTags(this.state.tags.filter(tag => globalTagIds.indexOf(tag.id) !== -1));
	}

	hydrateTags(tags) {
		return tags.map(tag => ({
			...tag,
			test: this.getTestByTag(tag)
		}));
	}

	getTagsByTest(test) {
		return this.hydrateTags(
			this.getTagsById(
				pluck(
					this.state.testTags.filter(testTag => testTag.testId === test.id),
					'tagId'
				)
			)
		);
	}

	/* Users
	********/
	getUsers() {
		return this.hydrateUsers(this.state.users);
	}

	getUserById(id) {
		return this.getUsersById([id])[0];
	}

	getUsersById(ids) {
		return this.hydrateUsers(this.state.users.filter(( user ) => ( ids.indexOf(user.id) !== -1 )));
	}

	getMe() {
		return this.getUserById(this.state.me.id);
	}

	/* User Tags
	************/
	hydrateUsers(users) {
		return users.map(user => {
			const userTags = this.state.userTags.filter(({ userId, tagId }) => ( userId === user.id ));
			return {
				...user,
				tags: this.state.tags.filter(({ id, name }) => ( pluck(userTags, 'tagId').indexOf(id) !== -1 ))
			};
		});
	}

	giveTagToMe(globalTagId) {
		this.giveTagToUser(this.getMe(), globalTagId);
	}

	giveTagToUser(user, globalTagId) {
		this.setState((previousState, currentProps) => {
			return {
				...previousState,
				userTags: [
					...previousState.userTags,
					{
						userId: user.id,
						tagId: globalTagId
					}
				]
			}
		})
	}

	/*
	 * Receives an array of globalTagIds,
	 * removes globalTagIds which the targeted user does not have,
	 * returns the changed array
	 *
	 * Except it does not change the array, it creates a new one.
	 **/
	tagsUserHas(user, globalTagIds) {
		// Todo: Limit number of id checks for privacy
		const userTags = pluck(user.tags, 'id');
		return globalTagIds.filter(tagId => userTags.indexOf(tagId) !== -1);
	}

	tagsIHave(globalTagIds) {
		return this.tagsUserHas(this.getMe(), globalTagIds);
	}

	usersWhoHaveTag(globalTagId) {
		const userTags = this.state.userTags.filter(userTag => userTag.tagId === parseInt(globalTagId));
		const idsOfUsersWhoHaveTheTag = pluck(userTags, 'userId');
		const usersWhoHaveTag = this.getUsersById(idsOfUsersWhoHaveTheTag);
		return usersWhoHaveTag;
	}

	/* Misc
	********/
	recordAnswer(answer) {
		this.giveTagToMe(answer.globalTagId);
	}

	/* Render Helpers
	***************/
	shouldTestRender(test) {
		const tagsInTest = pluck(test.getAnswers(), 'globalTagId');
		const dependsOnTags = test.dependsOnTags();
		return (
			test.shouldTestRender(this.tagsIHave(dependsOnTags)) &&
			this.tagsIHave(tagsInTest).length === 0 &&
			true
		);
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

				<Route
					path="/privacy"
					render={
						routeProps => <PrivacyLayout
							{...routeProps}
							privacyLevels={ this.state.privacyLevels }
							users={
								[
									this.getUsers().shuffle().splice(0,3),
									this.getUsers().shuffle().splice(0,6),
									this.getUsers().shuffle().splice(0,13),
									this.getUsers().shuffle().splice(0,23),
									this.getUsers().shuffle().splice(0,30),
								]
							}
							tags={
								[
									this.getMe().tags.splice(0,15),
									this.getMe().tags.splice(0,8),
									this.getMe().tags.splice(0,7),
									this.getMe().tags.splice(0,5),
									this.getMe().tags.splice(0,3),
								]
							}
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

Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if ( i == 0 ) return this;
  while ( --i ) {
	 j = Math.floor( Math.random() * ( i + 1 ) );
	 temp = this[i];
	 this[i] = this[j];
	 this[j] = temp;
  }
  return this;
}