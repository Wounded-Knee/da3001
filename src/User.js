import React from 'react';
import { Link } from 'react-router-dom';
import PrivacySelector from './PrivacySelector.js';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import Relations from './Relations';

var className = 'user';
const UserCard = (props) => {
	return <User {...props} className="card no-tags" />;
}
const UserFace = (props) => {
	return <User {...props} className="face" />;
}
const UserProfile = (props) => {
	return <User {...props} className="full" privacySelector relations />;
}
const User = (props) => {
	const { me, user, privacySelector, relations } = props;
	const { id, avatar, name, privacyLevel } = user;
	const thisIsMe = me && id === me.id;
	return (
		<div {...props} className={ props.className + ' ' + className }>

			{ !thisIsMe && privacySelector ?
				<PrivacySelector
					marks
					value={ privacyLevel }
					onChange={ () => {} }
				/>
			: null }
	}

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

			{ relations ?
				<Relations {...props} />
			: null }
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
