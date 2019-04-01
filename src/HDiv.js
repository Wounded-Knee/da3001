import React from 'react';

const HDiv = (props) => {
	const {
		classNames,
		title,
		children,
	} = props;

	return (
		<div className={ classNames + ' hdiv' }>
			{ title ? <h2>{ title }</h2> : '' }
			{ children }
		</div>
	);
};

export default HDiv;
