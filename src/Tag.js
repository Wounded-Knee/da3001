import React from 'react';
import { Link } from 'react-router-dom';

const Tag = ({tag}) => {
	return (
		<li className={ 'tag_' + tag.id }>
			<Link to={ '/tags/' + tag.id }>{ tag.name }</Link>
		</li>
	);
};

export default Tag;
