import React from 'react';
import UserList from './UserList.js';

const TagDetail = (props) => {
	if (!props.tag) return '';

	const {
		tag,
		usersWhoHaveTag
	} = props;

	return (
	  <div>
		<h2>Tag Detail: { tag.name }</h2>
		<p>It is a cool tag.</p>
		<UserList title="Users who have this tag" users={usersWhoHaveTag}>
			<p>Nobody has this tag.</p>
		</UserList>
	  </div>
	);
};

export default TagDetail;
