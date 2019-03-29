import AbstractTest from './AbstractTest.js';

const testData = {
	'question': 'Which US presidential candidate did you vote for?',
	'answers': [
		{ text: 'Hillary Clinton', tag: 'HillaryVoter' },
		{ text: 'Donald Trump', tag: 'TrumpVoter' },
		{ text: 'Other', tag: 'SmartVoter' },
	]
}

class Test2 extends AbstractTest {
	constructor(props) {
		super({...props, testData: testData});
	}
};

export default Test2;
