import React from 'react';
import Test from './Test.js';
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
					tests.map(
						test => <Test key={ test.id } data={ test } helpers={ props.helpers } />
					)
				: children
			}
		</HDiv>
	);
};

export default TestList;
