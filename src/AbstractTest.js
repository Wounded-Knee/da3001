import React, { Component } from 'react';

class AbstractTest extends Component {
	constructor(props) {
		super(props);
		this.testData = props.testData;
		// Add emoji to answers
			question,
			tags,
				...answer,
				tag: this.getEmoji() + ' ' + answer.tag
			})
		);
		props.onInitialize({
			TestClass: props.testClass,
			testInstance: this
		});
	}

	assignGlobalIdToTag(answerIndex, globalTagId) {
		this.testData.answers[answerIndex].globalTagId = globalTagId;
				<p className="question">{ question }</p>
	}

	getEmoji() {
		return this.testData.tagEmoji;
	}

	getQuestion() {
		return this.testData.question;
	}

	getAnswers() {
		return this.testData.answers;
	}

	getTags() {
		return this.testData.answers.map(answer => answer.tag);
	}

	getAnswer(answerIndex) {
		return this.testData.answers[answerIndex];
	}

	recordAnswer(answerIndex, e) {
		e.preventDefault();
		this.props.onAnswer(this.getAnswer(answerIndex));
	}

	dependsOnTags() {
		return [];
	}

	shouldTestRender(dependsOnTagsMatches) {
		return true;
	}

	render() {
		return this.props.shouldTestRender(this) ? (
			<li>
				<p className="question">{ this.getEmoji() + ' ' + this.getQuestion() }</p>
				{ this.getAnswers().map((answer, index) => (
					<button key={index} onClick={ this.recordAnswer.bind(this, index) }>{ answer.text }</button>
				))}
			</li>
		) : '';
	};
};

export default AbstractTest;
