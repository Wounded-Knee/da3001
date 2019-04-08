import AbstractTest from './AbstractTest.js';

const testData = {
	'tagEmoji': '🤪',
	'question': 'What do you play?',
	'answers': [
		{ text: 'Playgrounds', tag: 'Playgrounds' },
		{ text: 'Swingsets', tag: 'Swingsets' },
		{ text: 'X-Box', tag: 'X-Box' },
		{ text: 'Poker', tag: 'Poker' },
		{ text: 'Chess', tag: 'Chess' },
		{ text: 'Soccer', tag: 'Soccer' },
	]
}

class Test9 extends AbstractTest {
	constructor(props) {
		super({...props, testData: testData});
	}
};

export default Test9;
