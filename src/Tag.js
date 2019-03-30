import React from 'react';
import { Link } from 'react-router-dom';

const Tag = ({tag}) => {
	return (
		<li>
			<Link to={ '/tags/' + tag.id }>{ tag.name }</Link>
		</li>
	);
};

export default Tag;
