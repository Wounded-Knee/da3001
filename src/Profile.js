import React from 'react';

const Profile = (props) => {
	return (
	  <div>
	    <h2>Profile</h2>
	    { props.me.name }

	    <h3>Your Tags:</h3>
	    <ul>
	    	{ !props.me.tags.length ? 'None yet... Answer some questions, below.' : '' }
	    	{
	    		props.me.tags.map((tag) => (
	    			<li key={ tag.id }>
	    				{ tag.name }
	    			</li>
	    		))
	    	}
	    </ul>
	  </div>
	);
};

export default Profile;
