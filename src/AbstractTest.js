import React, { Component } from 'react';

class AbstractTest extends Component {
	constructor(props) {
		super(props);
		this.testData = props.testData;
		// Add emoji to answers
		this.testData.answers = this.testData.answers.map(
			answer => ({
				...answer,
				tag: this.getEmoji() + ' ' + answer.tag
			})
		);
		props.onInitialize(this);
	}

	assignGlobalIdToTag(answerIndex, globalTagId) {
		this.testData.answers[answerIndex].globalTagId = globalTagId;
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
			<div>
				{ this.getEmoji() + ' ' + this.getQuestion() }
				{ this.getAnswers().map((answer, index) => (
					<button key={index} onClick={ this.recordAnswer.bind(this, index) }>{ answer.text }</button>
				))}
			</div>
		) : '';
	};
};

export default AbstractTest;
