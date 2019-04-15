import React from 'react';
import { Link } from 'react-router-dom';
import TagList from './TagList.js';
import TestList from './TestList.js';
import Tag from './Tag.js';
import Swiper from 'react-id-swiper';
import PrivacySelector from './PrivacySelector.js';
import consts from './constants.js';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const User = (props) => {
	const { user, style, me, tagName='li', UDM, helpers } = props;
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
		intro='';

	var privacySelector = <PrivacySelector
			marks
			value={ () => {
				const relation = props.me.relations.filter(relation => relation.id === props.user.id)[0];
				return relation ? relation.privacyLevel_id : undefined;
			} }
			onChange={ props.helpers.setUserPrivacyLevel.bind(this, props.user.id) }
		/>;

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
			friends = <ul className="relations">
				<h2>Publicity</h2>
				{ [5,4,3,2,1].map((privacyLevel, index) => (
					<li key={ index } className="clearfix">
						<h1>
							<FontAwesome
								name={ 'battery-' + ['full', 'three-quarters', 'half', 'quarter', 'empty'][privacyLevel-1] }
								size='lg'
							/>
						</h1>
						<Swiper containerClass="users">
							{ user.relations.filter(relation => relation.privacyLevel_id === privacyLevel).map(relation => (
								<div key={ relation.id }>
									<User user={ relation } tagName="div" UDM={ consts.userDisplayMode.FACE } />
								</div>
							))}
						</Swiper>
						<Swiper containerClass="tags">
							{ user.tags.filter(tag => tag.privacyLevel_id === privacyLevel).map(tag => (
								<div key={ tag.id }>
									<Tag tag={ tag } />
								</div>
							))}
						</Swiper>
					</li>
				))}
			</ul>;
			intro = <p className="intro">
					Perferendis animi est aspernatur quo et. Qui voluptas assumenda
					sit. Animi rerum quisquam ex beatae veniam. Non asperiores id
					dolores qui odio dicta. Dolores odio alias nihil voluptates.
					Nemo exercitationem perferendis et ut vel dolores similique.
				</p>;
		break;
		default:
		case consts.userDisplayMode.CARD:
			tags = [ ...userTags ].splice(0,5);
			className = 'card '+className;
		break;
	}
	className = 'user '+className;
	privacySelector = thisIsMe ? '' : privacySelector;

	const newProps = {
		...props,
		style: {
			...props.style,
			...style
		},
		className: props.className + ' ' + className,
	};
	delete newProps.UDM;

	return (
		<div {...newProps}>
			{ privacySelector }
			<Link to={ "/user/"+id } className="image">
				<img src={ "/"+avatar } alt={ name } />
			</Link>
			<p className="name">
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
};

User.propTypes = {
	user: PropTypes.object.isRequired,
	index: PropTypes.number,
	style: PropTypes.object,
	me: PropTypes.object,
};

export default User;
