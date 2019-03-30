import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Home from './Home.js';
import Profile from './Profile.js';
import TestPromises from './TestPromises.js';
import TagList from './TagList.js';
import TagDetail from './TagDetail.js';
import pluck from 'utils-pluck';
import './App.css';

const navComponents = [
  { name: 'Home', Component: Home },
  { name: 'Profile', Component: Profile },
  { name: 'TagList', Component: TagList },
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testsLoaded: false,
      testLoadError: false,
      me: {
        id: 0
      },
      users: [
        { id: 0, name: 'Anonymous' } /* prompt('What is your name?', 'Anonymous') */
      ],
      tags: [],
      userTags: [],
      testTags: [],
      tests: [],
      testInstances: [],
    };

    Promise.all(TestPromises).then(
      (tests) => {
        const testInstances = tests.map((testPromise, index) => {
          const Test = testPromise.default;
          return (
            <Test
              key={index}
              shouldTestRender={ this.shouldTestRender.bind(this) }
              onAnswer={ this.recordAnswer.bind(this) }
              onInitialize={ this.initializeTest.bind(this) }
            />
          );
        });

        this.setState((previousState, currentProps) => {
          return {
            ...previousState,
            tests: pluck(tests, 'default'),
            testInstances: testInstances,
            testsLoaded: true
          };
        })
      }
    ).catch(
      () => this.setState((previousState, currentProps) => ({
        ...previousState,
        testLoadError: true
      }))
    );

    setTimeout(() => window.da3001 = this, 500);
  }

  initializeTest(test) {
    pluck(test.getAnswers(), 'tag').map((tagName, index) => {
      this.createTag(
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
      return { ...previousState, userTags: [...previousState.userTags, {
        userId: user.id,
        tagId: globalTagId
      }]}
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

  /* Test Helpers
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

  recordAnswer(answer) {
    this.giveTagToMe(answer.globalTagId);
  }

  /* Render
  ********/
  render() {
    const HomeComponent = navComponents[0].Component;
    return (
      <BrowserRouter>
        { this.state.testsLoaded ?
          <div className="App">
            <ul>
              { navComponents.map(({ name }, index) => {
                return ( <li key={ index }><Link to={ '/' + name }>{ name }</Link></li> );
              })}
            </ul>
            <div className="App-intro">
              <Route path="/" component={ HomeComponent } />
              <Route
                path="/tags/:tagId"
                render={
                  routeProps => <TagDetail
                    {...routeProps}
                    tag={ this.getTagById(routeProps.match.params.tagId) }
                    usersWhoHaveTag={ this.usersWhoHaveTag(routeProps.match.params.tagId) }
                  />
                }
              />              
              { navComponents.map(({ name, Component, pathSuffix }) => {
                return (
                  <Route
                    key={ name }
                    path={ "/" + name + (pathSuffix || '') }
                    render={
                      routeProps => <Component
                        {...routeProps}
                        tags={ this.state.tags }
                        title="Master Tag List"
                        me={ this.getMe() }
                      />
                    }
                  />
                );
              })}
            </div>

            <h2>Questions</h2>
            <div className="initializeTests">
              { this.state.testInstances }
            </div>
          </div>
        : this.state.testLoadError ?
          <div>Error loading tests.</div>
        : 'Loading...' }

        <iframe
          title="video"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/gjY3LxPNaRM"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </BrowserRouter>
    );
  }
}

export default App;
