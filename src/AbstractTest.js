import React, { Component } from 'react';

class AbstractTest extends Component {
	render() {
		const helpers = this.props.helpers;
		const {
			id,
			question,
		} = this.props.data;

		const tags = this.props.data.choices ? this.props.data.choices : this.props.data.tags;

		return (
			<li>
				<p className="question">{ question }</p>
				{ tags ?
					tags.map(
						(tag, index) => (
							<button key={ index } onClick={ () => helpers.onAnswer(id, tag.id) }>{ tag.choice }</button>
						)
					)
				: 'Add Choices'}
			</li>
		);
	};
};

export default AbstractTest;
