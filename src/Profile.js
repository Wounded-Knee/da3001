import React from 'react';
import TagList from './TagList.js';

const Profile = (props) => {
	const userTags = props.me.tags.filter(tag => tag.name.indexOf('undefined') === -1);
	return (
	  <div>
		<h2>Profile</h2>
		{ props.me.name }

		<TagList title="Your Tags:" tags={userTags}>
			<p>None yet... Answer some questions, below.</p>
		</TagList>
	  </div>
	);
};

export default Profile;
