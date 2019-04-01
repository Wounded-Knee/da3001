import React from 'react';
import TagList from './TagList.js';
import tagDisplayMode from './constants.js';

const User = ({ user }) => {
	return (
		<li>
			<img src={ user.avatar } alt={ user.name } width="50" />
			<p className="name">{ user.name }</p>
			<TagList tags={ user.tags.splice(0,6) } displayMode={ tagDisplayMode.EMOJI }>
				<p>The Tagless One</p>
			</TagList>
		</li>
	);
};

export default User;
