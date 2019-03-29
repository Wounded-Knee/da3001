import React, { Component } from 'react';
const pluck = require('utils-pluck');

class AbstractTest extends Component {
	constructor(props) {
		super(props);
		this.testData = props.testData;
		props.onInitialize(this);
	}

	assignGlobalIdToTag(answerIndex, globalTagId) {
		this.testData.answers[answerIndex].globalTagId = globalTagId;
	}

	getAllTags() {
		return pluck(this.testData.answers, 'tag');
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

	render() {
		return this.props.shouldTestRender(this) ? (
		  	<div>
			  	{ this.getQuestion() }
	  			{ this.getAnswers().map((answer, index) => (
	  				<button key={index} onClick={ this.recordAnswer.bind(this, index) }>{ answer.text } GID: { answer.globalId }</button>
	  			))}
  			</div>
		) : '';
	};
};

export default AbstractTest;
