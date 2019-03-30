import AbstractTest from './AbstractTest.js';

const testData = {
	'question': 'Who is your favorite MLP?',
	'answers': [
		{ text: 'Twilight Sparkle', tag: 'Twilight Sparkle' },
		{ text: 'Applejack', tag: 'Applejack' },
		{ text: 'Fluttershy', tag: 'Fluttershy' },
		{ text: 'Rarity', tag: 'Rarity' },
		{ text: 'Pinkie Pie', tag: 'Pinkie Pie' },
		{ text: 'Rainbow Dash', tag: 'Rainbow Dash' },
	]
}

class Test2 extends AbstractTest {
	constructor(props) {
		super({...props, testData: testData});
	}
};

export default Test2;
