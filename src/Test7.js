import AbstractTest from './AbstractTest.js';

const testData = {
	'tagEmoji': '🇪🇪',
	'question': 'When is the National Flag Day held in your country?',
	'answers': [
		{ text: 'June 4', tag: 'Estonian' },
		{ text: 'January 6' },
		{ text: 'October 12' },
		{ text: 'September 11' },
		{ text: 'November 17' },
		{ text: 'Febuary 1' },
		{ text: 'July 4' },
		{ text: 'It Varies' },
	]
}

class Test7 extends AbstractTest {
	constructor(props) {
		super({...props, testData: testData});
	}
};

export default Test7;
