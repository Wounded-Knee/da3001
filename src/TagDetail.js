import React from 'react';
import UserList from './UserList.js';
import TagList from './TagList.js';
import HDiv from './HDiv.js';

const TagDetail = (props) => {
	if (!props.tag) return '';

	const {
		tag,
		usersWhoHaveTag,
	} = props;

	return (
	  <div>
		<HDiv classNames="tagDetail" title={ <TagList tags={ [tag] } /> }>
			<p>{ tag.summary }</p>
		</HDiv>

		<TagList tags={ [] } />

		<HDiv title="Subtags">
			<p>...</p>
		</HDiv>

		<UserList cardFan title="Users who have this tag" users={usersWhoHaveTag} {...props}>
			<p>The system does not yet understand who else has this tag.</p>
		</UserList>
	  </div>
	);
};

export default TagDetail;
