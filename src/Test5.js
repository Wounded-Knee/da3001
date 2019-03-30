import AbstractTest from './AbstractTest.js';

const testData = {
	'tagEmoji': '🏆',
	'question': 'How do you like the app so far?',
	'answers': [
		{ text: '1', tag: '⭐' },
		{ text: '2', tag: '⭐⭐' },
		{ text: '3', tag: '⭐⭐⭐' },
		{ text: '4', tag: '⭐⭐⭐⭐' },
		{ text: '5', tag: '⭐⭐⭐⭐⭐' },
	]
}

class Test5 extends AbstractTest {
	constructor(props) {
		super({...props, testData: testData});
	}

	dependsOnTags() {
		return [0,1,2,3,4,5,6,7,8,9,10];
	}

	shouldTestRender(dependsOnTagsMatches) {
		return dependsOnTagsMatches.length > 1;
	}
};

export default Test5;

