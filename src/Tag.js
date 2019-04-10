import React from 'react';
import { Link } from 'react-router-dom';
import consts from './constants.js';

const Tag = ({ tag, displayMode }) => {
	var tagNameDisplay, tagClassName;
	switch (displayMode) {
		case consts.tagDisplayMode.EMOJI:
			tagNameDisplay = tag.emoji;
			tagClassName = 'emoji_mode';
		break;
		default:
			tagNameDisplay = tag.emoji + ' ' + tag.name;
			tagClassName = '';
		break;
	}

	return (
		<li title={ tag.name } className={ tagClassName }>
			<Link to={ '/tags/' + tag.id }>{ tagNameDisplay }</Link>
		</li>
	);
};

export default Tag;
