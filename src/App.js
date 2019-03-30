import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Home from './Home.js';
import Profile from './Profile.js';
import Tests from './Tests.js';
import TagList from './TagList.js';
import './App.css';
const pluck = require('utils-pluck');

const navComponents = [
  { name: 'Home', Component: Home },
  { name: 'Profile', Component: Profile },
  { name: 'TagList', Component: TagList },
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      me: {
        id: 0
      },
      users: [
        { id: 0, name: 'Anonymous' } /* prompt('What is your name?', 'Anonymous') */
      ],
      tags: [],
      userTags: []
    };

    setTimeout(() => window.da3001 = this.state, 500);
  }

  initializeTest(test) {
    pluck(test.getAnswers(), 'tag').map((tagName, index) => {
      this.createTag(tagName, test.assignGlobalIdToTag.bind(test, index));
    });
  }

  /* Tags
  ********/
  createTag(tagName, assignGlobalIdToTag) {
    this.setState((previousState, currentProps) => {
      const globalTagId = Math.max(...pluck(previousState.tags, 'id'), -1)+1;
      assignGlobalIdToTag(globalTagId);
      return { ...previousState, tags: [...previousState.tags, {
          id: globalTagId,
          name: tagName
        }]
      };
    });
  }

  /* Users
  ********/
  getUsers() {
    return this.addTagsToUsers(this.state.users);
  }

  getUserById(id) {
    return this.addTagsToUsers(this.state.users.filter(( user ) => ( user.id === id )))[0];
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

  tagsUserHas(user, globalTagIds) {
    // Todo: Limit number of id checks for privacy
    const userTags = pluck(user.tags, 'id');
    return globalTagIds.filter(tagId => userTags.indexOf(tagId) !== -1);
  }
  tagsIHave(globalTagIds) {
    return this.tagsUserHas(this.getMe(), globalTagIds);
  }

  userHasAnyTag(user, globalTagIds) {
    const userTagIds = pluck(user.tags, 'id');
    for (var x=0; x<userTagIds.length; x++) {
      if (globalTagIds.indexOf(userTagIds[x]) !== -1) return true;
    }
    return false;
  }

  iHaveAnyTag(globalTagIds) {
    return this.userHasAnyTag(this.getMe(), globalTagIds);
  }

  /* Test Helpers
  ***************/
  shouldTestRender(test) {
    const tagsInTest = pluck(test.getAnswers(), 'globalTagId');
    const dependsOnTags = test.dependsOnTags();
    return (
      test.shouldTestRender(this.tagsIHave(dependsOnTags)) &&
      !this.iHaveAnyTag(tagsInTest) &&
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
        <div className="App">
          <ul>
            { navComponents.map(({ name }, index) => {
              return ( <li key={ index }><Link to={ '/' + name }>{ name }</Link></li> );
            })}
          </ul>
          <div className="App-intro">
            <Route path="/" component={ HomeComponent } />
            { navComponents.map(({ name, Component }) => {
              return (
                <Route
                  key={ name }
                  path={ "/" + name }
                  render={ routeProps => <Component {...routeProps} tags={ this.state.tags } me={ this.getMe() } /> }
                />
              );
            })}
          </div>

          <h2>Questions</h2>
          <div className="initializeTests">
            { Tests.map((Test, index) => (
              <Test
                key={index}
                shouldTestRender={ this.shouldTestRender.bind(this) }
                onAnswer={ this.recordAnswer.bind(this) }
                onInitialize={ this.initializeTest.bind(this) }
              />)) }
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
