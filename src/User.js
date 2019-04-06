import React from 'react';
import TagList from './TagList.js';
import tagDisplayMode from './constants.js';
import PropTypes from 'prop-types';

const User = ({ user, index, style, me }) => {
	const {
		id,
		name,
		avatar,
		tags,
	} = user;

	if (user.id === undefined) return "";

	return (
		<li style={ style } className={ me && id === me.id ? 'me' : '' }>
			<img src={ avatar } alt={ name } width="50" />
			<p className="name">{ name }</p>
			<TagList tags={ [ ...tags ].splice(0,5) } displayMode={ tagDisplayMode.EMOJI }>
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
