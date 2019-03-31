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
		<h3>Users who have this tag</h3>
		<UserList users={usersWhoHaveTag} />
	  </div>
	);
};

export default TagDetail;
