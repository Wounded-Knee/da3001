import React from 'react';
import Tag from './Tag.js';

const TagList = ({ title, tags }) => {
	return (
	  <div>
		<h2>{ title }</h2>
		<ul className="tagList clearfix">
			{ tags.map(tag => <Tag key={tag.id} tag={tag} />) }
		</ul>
	  </div>
	);
};

export default TagList;
