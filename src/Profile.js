import React from 'react';
import Tag from './Tag.js';

const Profile = (props) => {
	const userTags = props.me.tags.filter(tag => tag.name.indexOf('undefined') === -1);
	return (
	  <div>
		<h2>Profile</h2>
		{ props.me.name }

		<h3>Your Tags:</h3>
		<ul className="tagList clearfix">
			{
				!userTags.length ? 'None yet... Answer some questions, below.' : userTags.map(tag => {
					return tag.name.indexOf('undefined') === -1 ? <Tag tag={tag} /> : '';
				})
			}
		</ul>
	  </div>
	);
};

export default Profile;
