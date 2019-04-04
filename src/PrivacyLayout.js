import React from 'react';
import UserList from './UserList.js';
import TagList from './TagList.js';
import HDiv from './HDiv.js';

const PrivacyLayout = (props) => (
  <HDiv classNames="privacy" title="Privacy">
	{
		props.privacyLevels.map(privacyLevel => (
			<div className={ privacyLevel.name } key={ privacyLevel.value }>
				<h3>{ privacyLevel.name }</h3>
				<UserList cardFan users={ props.users[privacyLevel.value] } />
				<TagList tags={ props.tags[privacyLevel.value] } />
			</div>
		))
	}
  </HDiv>
);

export default PrivacyLayout;
