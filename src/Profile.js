import React from 'react';

const Profile = (props) => {
	return (
	  <div>
	    <h2>Profile</h2>
	    { props.me.name }
	    <ul>
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
