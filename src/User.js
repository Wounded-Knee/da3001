import React from 'react';
import { Link } from 'react-router-dom';
import TagList from './TagList.js';
import UserList from './UserList.js';
import TestList from './TestList.js';
import PrivacySelector from './PrivacySelector.js';
import consts from './constants.js';
import PropTypes from 'prop-types';

const User = ({ user, index, style, me, tagName='li', UDM, helpers }) => {
	const {
		id,
		name,
	} = user;

	const thisIsMe = me && id === me.id;

	var
		avatar = user.avatar || 'userAvatar',
		userTags = user.tags || [],
		tags,
		TDM=consts.tagDisplayMode.EMOJI,
		className='grayscale ' + (thisIsMe ? 'me' : ''),
		friends='',
		intro='',
		privacySelector='';

	if (user.id === undefined) return "";

	switch (UDM) {
		case consts.userDisplayMode.FACE:
			tags = [ ...userTags ].splice(0,3);
			className = 'face '+className;
			privacySelector = '';
		break;
		case consts.userDisplayMode.FULL:
			tags = userTags;
			TDM = consts.tagDisplayMode.FULL;
			className = 'full '+className;
			friends = <UserList users={ user.relations } title="Friends" UDM={ consts.userDisplayMode.FACE } />;
			intro = <p className="intro">
					Perferendis animi est aspernatur quo et. Qui voluptas assumenda
					sit. Animi rerum quisquam ex beatae veniam. Non asperiores id
					dolores qui odio dicta. Dolores odio alias nihil voluptates.
					Nemo exercitationem perferendis et ut vel dolores similique.
				</p>;
			privacySelector = <PrivacySelector marks me={ me } user={ user } onChange={ helpers.setUserPrivacyLevel } />
		break;
		default:
		case consts.userDisplayMode.CARD:
			tags = [ ...userTags ].splice(0,5);
			className = 'card '+className;
			privacySelector = <PrivacySelector me={ me } user={ user } onChange={ helpers.setUserPrivacyLevel } />
		break;
	}
	className = 'user '+className;
	privacySelector = thisIsMe ? '' : privacySelector;

	const getTheActualStuff = () => (
		<div>
			{ privacySelector }
			<Link to={ "/user/"+id }>
				<img src={ "/"+avatar } alt={ name } />
			</Link>
			<p class="name">
				<Link to={ "/user/"+id }>
					{ name }
				</Link>
			</p>
			<TagList tags={ tags } displayMode={ TDM }>
				<span role="img" aria-label="No tags">❓</span>
			</TagList>
			{ intro }
			{ friends }
			<TestList title="" tests={ [] } />
		</div>
	);

	return (
			(tags === 'li') ?
				<li style={ style } className={ className }>
					{ getTheActualStuff() }
				</li>
			:
				<div style={ style } className={ className }>
					{ getTheActualStuff() }
				</div>
	);
};

User.propTypes = {
	user: PropTypes.object.isRequired,
	index: PropTypes.number,
	style: PropTypes.object,
	me: PropTypes.object,
};

export default User;
