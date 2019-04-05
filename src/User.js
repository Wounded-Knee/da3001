import React from 'react';
import TagList from './TagList.js';
import tagDisplayMode from './constants.js';
import PropTypes from 'prop-types';

const User = ({ user, index, style, me }) => {
	if (user.id === undefined) return "";
	return (
		<li style={ style } className={ me && user.id === me.id ? 'me' : '' }>
			<img src={ user.avatar } alt={ user.name } width="50" />
			<p className="name">{ user.name }</p>
			<TagList tags={ user.tags.splice(0,6) } displayMode={ tagDisplayMode.EMOJI }>
				<p>The Tagless One</p>
			</TagList>
		</li>
	);
};

User.propTypes = {
	user: PropTypes.object.isRequired,
	index: PropTypes.number,
	style: PropTypes.object,
	me: PropTypes.object,
};

export default User;
