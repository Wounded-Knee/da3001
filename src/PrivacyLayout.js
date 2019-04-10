import React from 'react';
import UserList from './UserList.js';
//import TagList from './TagList.js';
import HDiv from './HDiv.js';

const PrivacyLayout = ({ privacyLevels, users, me, tags, helpers }) => (
  <HDiv classNames="privacy" title="Privacy">
	{
		privacyLevels.map(privacyLevel => (
			<div className={ privacyLevel.name } key={ privacyLevel.value }>
				<h3>{ privacyLevel.name }</h3>
				<UserList cardFan users={ users } me={ me } helpers={ helpers} />
				{/*<TagList tags={ tags } />*/}
			</div>
		))
	}
  </HDiv>
);

export default PrivacyLayout;
