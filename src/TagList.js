import React from 'react';
import Tag from './Tag.js';

const TagList = (props) => {
	return (
	  <div>
	    <h2>master tag list</h2>
	    <ul className="tagList clearfix">
	    	{ props.tags.map(tag => <Tag tag={tag} />) }
	    </ul>
	  </div>
	);
};

export default TagList;
