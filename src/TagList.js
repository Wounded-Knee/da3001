import React from 'react';
import Tag from './Tag.js';
import HDiv from './HDiv.js';

const TagList = ({ title, tags, children, displayMode }) => {
	return (
		<HDiv classNames="tagList grayscale" title={ title }>
			{
				tags.length ?
					<ul className="clearfix">
						{ tags.map(tag => <Tag key={ tag.id } tag={ tag } displayMode={ displayMode } />) }
					</ul>
				: children
			}
		</HDiv>
	);
};

export default TagList;
