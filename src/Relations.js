import React from 'react';
import FontAwesome from 'react-fontawesome';
import List from './List';
import { UserFace } from './User';
import { DragDropContext } from 'react-beautiful-dnd';

const Relations = (props) => {
	const { me, user } = props;
	const { id } = user;
	const thisIsMe = me && id === me.id;

	if (me.relations) {
		const { privacyLevel_id } = me.relations.filter(relation => relation.id === user.id)[0];
	}

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
				tag: () => {},
				user: () => {},
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

	return (
		<DragDropContext onDragEnd={ onDragEnd }>
			<h2>Publicity</h2>
			<ul className="relations">
				{ [5,4,3,2,1].map((privacyLevel, index) => (
					<li key={ index } className="clearfix">
						<FontAwesome
							name={ ['heart', 'user', 'user-friends', 'users', 'globe-africa'][privacyLevel-1] }
							size='lg'
						/>

						<List orientation="HORIZONTAL" { ...getListOptions('user', privacyLevel) }>
							{
								user.relations ?
									user.relations.filter(relation => relation.privacyLevel_id === privacyLevel).map(relation => (
										<UserFace key={ relation.id } user={ relation } me={ me } helpers={ props.helpers } />
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
};

export default Relations;
