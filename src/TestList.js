import React from 'react';

const TestList = (props) => {
	const { title, tests, children } = props;
	return (
	  <div className='testList'>
		{ title ? <h2>{ title }</h2> : '' }
		{
			tests.length ?
				<ul className="clearfix">
					{ tests.map((Test, index) => <Test key={ index } {...props} />) }
				</ul>
			: children
		}
	  </div>
	);
};

export default TestList;
