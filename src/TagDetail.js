import React from 'react';
import UserList from './UserList.js';
import HDiv from './HDiv.js';

const TagDetail = (props) => {
	if (!props.tag) return '';

	const {
		tag,
		usersWhoHaveTag
	} = props;

	return (
	  <div>
		<HDiv classNames="tagDetail" title={ "Tag Detail for " + tag.name }>
			<p>It is a cool tag.</p>
		</HDiv>

		<UserList cardFan title="Users who have this tag" users={usersWhoHaveTag} {...props}>
			<p>Nobody has this tag.</p>
		</UserList>
	  </div>
	);
};

export default TagDetail;
