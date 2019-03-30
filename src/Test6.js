import AbstractTest from './AbstractTest.js';

const testData = {
	'tagEmoji': '📚',
	'question': 'Which would you recommend to someone who could only read one?',
	'answers': [
		{ text: 'Don Quixote', tag: 'Windmill Hater' },
		{ text: 'Moby Dick', tag: 'Whale Hater' },
		{ text: 'The Great Gatsby', tag: 'Poverty Hater' },
		{ text: 'Mein Kampf', tag: 'Dirty Fucking Nazi' },
		{ text: 'Peter Pan', tag: 'Adulthood Hater' },
	]
}

class Test6 extends AbstractTest {
	constructor(props) {
		super({...props, testData: testData});
	}

	dependsOnTags() {
		return [4];
	}

	shouldTestRender(dependsOnTagsMatches) {
		return dependsOnTagsMatches.length;
	}
};

export default Test6;
