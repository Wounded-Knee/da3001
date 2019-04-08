import AbstractTest from './AbstractTest.js';

const testData = {
	'tagEmoji': '👪',
	'question': 'Do you have children?',
	'answers': [
		{ text: 'Yes', tag: 'Parent' },
		{ text: 'No' },
		{ text: 'I used to' },
		{ text: 'I\'m not sure' },
		{ text: 'By adoption', tag: 'Parent' },
		{ text: 'They\'re not mine, but yes' },
		{ text: 'I do take care of some' },
	]
}

class Test8 extends AbstractTest {
	constructor(props) {
		super({...props, testData: testData});
	}
};

export default Test8;
