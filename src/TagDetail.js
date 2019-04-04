import React from 'react';
import UserList from './UserList.js';
import TagList from './TagList.js';
import HDiv from './HDiv.js';

const TagDetail = (props) => {
	if (!props.tag) return 'Error. No tag found at TagDetail.js.';

	const {
		tag,
		usersWhoHaveTag,
		getSiblingTags,
	} = props;

	return (
	  <div>
		<HDiv classNames="tagDetail" title={ tag.name }>
			<p>{ tag.test.testInstance.getQuestion() }</p>
		</HDiv>

		<TagList tags={ getSiblingTags(tag.test) } />

		<UserList cardFan title="Users who have this tag" users={usersWhoHaveTag} {...props}>
			<p>Nobody has this tag.</p>
		</UserList>
	  </div>
	);
};

export default TagDetail;
