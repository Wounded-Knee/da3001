import React from 'react';
import AbstractTest from './AbstractTest.js';
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
						{
							tests.map(
								test => <AbstractTest key={ test.id } data={ test } helpers={ props.helpers } />
							)
						}
					</ul>
				: children
			}
		</HDiv>
	);
};

export default TestList;
