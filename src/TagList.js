import React from 'react';
import Tag from './Tag.js';

const TagList = ({ title, tags, children }) => {
	const visibleTags = tags.filter(tag => tag.name.indexOf('undefined') === -1);
	return (
	  <div className='tagList'>
		{ title ? <h2>{ title }</h2> : '' }
		{
			visibleTags.length ?
				<ul className="clearfix">
					{ visibleTags.map(tag => tag.name !== undefined ? <Tag key={tag.id} tag={tag} /> : '') }
				</ul>
			: children
		}
	  </div>
	);
};

export default TagList;
