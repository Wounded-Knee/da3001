import React from 'react';

const Profile = (props) => {
	const userTags = props.me.tags.filter(tag => tag.name.indexOf('undefined') === -1);
	return (
	  <div>
		<h2>Profile</h2>
		{ props.me.name }

		<h3>Your Tags:</h3>
		<ul>
			{
				!userTags.length ? 'None yet... Answer some questions, below.' : userTags.map(tag => {
					return tag.name.indexOf('undefined') === -1 ? (
						<li key={ tag.id }>
							{ tag.name }
						</li>
					) : '';
				})
			}
		</ul>
	  </div>
	);
};

export default Profile;
