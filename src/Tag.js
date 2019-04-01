import React from 'react';
import { Link } from 'react-router-dom';
import tagDisplayMode from './constants.js';

const Tag = ({ tag, displayMode }) => {
	var tagNameDisplay, tagClassName;
	switch (displayMode) {
		case tagDisplayMode.EMOJI:
			tagNameDisplay = tag.name.split(' ')[0];
			tagClassName = 'emoji_mode';
		break;
		default:
			tagNameDisplay = tag.name;
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
