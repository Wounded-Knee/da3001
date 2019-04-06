import React from 'react';
import UserList from './UserList.js';
//import TagList from './TagList.js';
import HDiv from './HDiv.js';

const PrivacyLayout = ({ privacyLevels, users, tags }) => (
  <HDiv classNames="privacy" title="Privacy">
	{
		privacyLevels.map(privacyLevel => (
			<div className={ privacyLevel.name } key={ privacyLevel.value }>
				<h3>{ privacyLevel.name }</h3>
				<UserList cardFan users={ users } />
				{/*<TagList tags={ tags } />*/}
			</div>
		))
	}
  </HDiv>
);

export default PrivacyLayout;
