import React from 'react';
import Tag from './Tag.js';
import HDiv from './HDiv.js';

const TagList = ({ title, tags, children, displayMode }) => {
	const visibleTags = tags.filter(tag => tag.name.indexOf('undefined') === -1);
	return (
		<HDiv classNames="tagList grayscale" title={ title }>
			{
				visibleTags.length ?
					<ul className="clearfix">
						{ visibleTags.map(tag => <Tag key={ tag.id } tag={ tag } displayMode={ displayMode } />) }
					</ul>
				: children
			}
		</HDiv>
	);
};

export default TagList;
