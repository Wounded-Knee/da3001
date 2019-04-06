import React from 'react';
import TagList from './TagList.js';
import HDiv from './HDiv.js';

const TagsLayout = ({tags}) => (
	<div>
		<HDiv classNames="tagsLayout" title="All Tags">
			<TagList tags={ tags } />
		</HDiv>
	</div>
);

export default TagsLayout;
