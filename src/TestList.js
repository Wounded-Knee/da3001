import React from 'react';
import HDiv from './HDiv.js';

const TestList = (props) => {
	const {
		title,
		tests,
		children
	} = props;

	return (
		<HDiv classNames="testList" title={ title }>
			{
				tests.length ?
					<ul className="clearfix">
						{ tests.map(({ id, TestClass }) => <TestClass key={ id } testClass={ TestClass } {...props} />) }
					</ul>
				: children
			}
		</HDiv>
	);
};

export default TestList;
