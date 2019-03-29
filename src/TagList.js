import React from 'react';

const TagList = (props) => {
	return (
	  <div>
	    <h2>master tag list</h2>
	    <ul>
	    	{
	    		props.tags.map((tag) => (
	    			<li key={ tag.id }>
	    				{ tag.name }
	    			</li>
	    		))
	    	}
	    </ul>
	  </div>
	);
};

export default TagList;
