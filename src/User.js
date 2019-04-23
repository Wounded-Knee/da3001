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

var className = 'user';

const UserCard = (props) => <p>User Card</p>;

const UserFace = (props) => <p>User Face</p>;

const UserProfile = (props) => {
	const thisIsMe = props.me && id === me.id;
	return (
		<div {...props} className={ props.className + ' ' + className + ' full' }>
			{ !thisIsMe ?
				<Link to={ "/become/"+id } className="masquerade">
					<FontAwesome
						name={ 'mask' }
						size='lg'
					/>
				</Link>
			: null }
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
}

UserCard.propTypes = UserFace.propTypes = UserProfile.propTypes = {
	user: PropTypes.object.isRequired,
	index: PropTypes.number,
	style: PropTypes.object,
	me: PropTypes.object,
};

export {
	UserCard,
	UserFace,
	UserProfile,
}
