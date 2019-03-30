import AbstractTest from './AbstractTest.js';

const testData = {
	'tagEmoji': '🐎',
	'question': 'Do you like My Little Pony?',
	'answers': [
		{ text: 'Yes', tag: 'MLP' },
		{ text: 'No' },
		{ text: 'Fuck no'},
	]
}

class Test4 extends AbstractTest {
	constructor(props) {
		super({...props, testData: testData});
	}
};

export default Test4;
