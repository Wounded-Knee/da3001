import React from 'react';

const Tag = ({tag}) => {
	return (
	  <li className={ 'tag_' + tag.id }>
	  	{ tag.name }
	  </li>
	);
};

export default Tag;
