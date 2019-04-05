import React, { Component } from 'react';

class AbstractTest extends Component {
	render() {
		const helpers = this.props.helpers;
		const {
			id,
			data,
		} = this.props.data;

		return (
			<li>
				<p className="question">{ data.question.text }</p>
				{
					data.answer.options.map(
						(answerOption, index) => (
							<button key={ index } onClick={ () => helpers.onAnswer(id, answerOption.id) }>{ answerOption.text }</button>
						)
					)
				}
			</li>
		);
	};
};

export default AbstractTest;
