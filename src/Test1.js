import AbstractTest from './AbstractTest.js';

const testData = {
	'question': 'When people look at you, how do they react?',
	'answers': [
		{ text: 'They smile.', tag: 'Pretty' },
		{ text: 'They get scared.', tag: 'Ugly' },
	]
}

class Test1 extends AbstractTest {
	constructor(props) {
		super({...props, testData: testData});
	}
};

export default Test1;
