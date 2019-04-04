import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import UserList from './UserList.js';
import TestPromises from './TestPromises.js';
import TagDetail from './TagDetail.js';
import TestList from './TestList.js';
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
    Promise.all(TestPromises).then(
      this.onImportAllTests.bind(this)
    ).catch(
      this.onImportAllTests.bind(this)
    );
  }

  onImportAllTests(testPromises) {
    this.setState({
      tests: testPromises ? testPromises.map(testPromise => testPromise.default) : [],
      testsLoaded: !!testPromises,
      testLoadError: !testPromises
    });
  }

  initializeTest(test) {
    pluck(test.getAnswers(), 'tag').map((tagName, index) => {
      return this.createTag(
        tagName,
        globalTagId => {
          test.assignGlobalIdToTag(index, globalTagId);
          this.setState((previousState, currentProps) => {
            return {
              ...previousState,
              testTags: [
                ...previousState.testTags,
                {
                  testIndex: previousState.tests.indexOf(test),
                  tagId: globalTagId
                }
              ]
            }
          });
        }
      )
    });
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
    return this.state.tags.filter(tag => tag.id === parseInt(globalTagId))[0];
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
    return this.addTagsToUsers(this.state.users);
  }

  getUserById(id) {
    return this.addTagsToUsers(this.state.users.filter(( user ) => ( user.id === id )))[0];
  }

  getUsersById(ids) {
    return this.addTagsToUsers(this.state.users.filter(( user ) => ( ids.indexOf(user.id) !== -1 )));
  }

  getMe() {
    return this.getUserById(this.state.me.id);
  }

  /* User Tags
  ************/
  addTagsToUsers(users) {
    return users.map((user) => {
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
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </BrowserRouter>
    );
  }
}

export default App;
