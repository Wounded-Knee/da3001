import React from 'react';
import UserList from './UserList.js';
import TagList from './TagList.js';
import PrivacySelector from './PrivacySelector.js';
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

		<p>You have this tag. Set the privacy level here:</p>
		<PrivacySelector
			marks
			me={ props.me }
			user={ props.me }
			value={ props.me.tags.filter(thisTag => thisTag.id === tag.id)[0].privacyLevel_id }
			onChange={ props.helpers.setTagPrivacylevel.bind(this, tag.id) }
		/>

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
