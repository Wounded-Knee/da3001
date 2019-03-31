import React from 'react';
import TagList from './TagList.js';

const Profile = ({ me, tags }) => {
	return (
	  <div className="profile">
		<h2>Profile</h2>
		<h3>{ me.name }</h3>

		<TagList title="Your Tags" tags={ me.tags }>
			<p>None yet... Answer some questions, below.</p>
		</TagList>
	  </div>
	);
};

export default Profile;
// Flashmobs
// Peace through freedom
// Identify a song
// Identify song lyrics
// 