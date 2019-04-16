import React from 'react';
import { Link } from 'react-router-dom';
import List from './List.js';
import TagList from './TagList.js';
import TestList from './TestList.js';
import Tag from './Tag.js';
import PrivacySelector from './PrivacySelector.js';
import consts from './constants.js';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { DragDropContext } from 'react-beautiful-dnd';

const User = (props) => {
	const { user, style, me, UDM } = props;
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
		privacyLevel,
		privacySelector,
		relation;

	if (me.relations) {
		relation = me.relations.filter(relation => relation.id === user.id)[0];
	}
	privacyLevel = relation ? relation.privacyLevel_id : undefined;

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
			privacySelector = <PrivacySelector
				marks
				value={ privacyLevel }
				onChange={ props.helpers.setUserPrivacyLevel.bind(this, props.user.id) }
			/>;
			const onDragEnd = function(result) {
				const { source, destination, draggableId } = result;

				// dropped outside the list
				if (!destination) {
					return;
				}

				if (source.droppableId !== destination.droppableId) {
					const [ itemType, itemId ] = draggableId.split('_');
					const [ , privacyLevel_id ] = destination.droppableId.split('_');
					const method = {
						tag: props.helpers.setTagPrivacylevel,
						user: props.helpers.setUserPrivacyLevel,
					}[ itemType ];
					method(itemId, privacyLevel_id);
				}
			};

			const getListOptions = (type, privacyLevel) => {
				return thisIsMe ? {
					draggable: true,
					droppableId: type + 'privacyLevel_' + privacyLevel,
				} : {};
			};

			friends = (
				<DragDropContext onDragEnd={ onDragEnd }>
					<h2>Publicity</h2>
					<ul className="relations">
						{ [5,4,3,2,1].map((privacyLevel, index) => (
							<li key={ index } className="clearfix">
								<FontAwesome
									name={ ['heart', 'user', 'user-friends', 'users', 'globe-africa'][privacyLevel-1] }
									size='lg'
								/>

								<List orientation="HORIZONTAL" { ...getListOptions('tag', privacyLevel) }>
									{ user.tags.filter(tag => tag.privacyLevel_id === privacyLevel).map(tag => <Tag key={ tag.id } tag={ tag } />) }
								</List>

								<List orientation="HORIZONTAL" { ...getListOptions('user', privacyLevel) }>
									{
										user.relations ?
											user.relations.filter(relation => relation.privacyLevel_id === privacyLevel).map(relation => (
												<User key={ relation.id } user={ relation } me={ me } UDM={ consts.userDisplayMode.FACE } helpers={ props.helpers } />
											))
										: ''
									}
								</List>

								{/*
								<Swiper containerClass="users">
								</Swiper>
								<Swiper containerClass="tags">
									{ user.tags.filter(tag => tag.privacyLevel_id === privacyLevel).map(tag => (
										<div key={ tag.id }>
											<Tag tag={ tag } />
										</div>
									))}
								</Swiper>
								*/}
							</li>
						))}
					</ul>
				</DragDropContext>
			);
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
			privacySelector = <PrivacySelector
				value={ privacyLevel }
				onChange={ props.helpers.setUserPrivacyLevel.bind(this, props.user.id) }
			/>;
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
			<TagList tags={ tags } displayMode={ TDM } />
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
