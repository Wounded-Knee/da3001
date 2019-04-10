import React, { Component } from 'react';

class AbstractTest extends Component {
	render() {
		const helpers = this.props.helpers;
		const {
			id,
			question,
			tags,
		} = this.props.data;

		return (
			<li>
				<p className="question">{ question }</p>
				{
					tags.map(
						(tag, index) => (
							<button key={ index } onClick={ () => helpers.onAnswer(id, tag.id) }>{ tag.choice }</button>
						)
					)
				}
			</li>
		);
	};
};

export default AbstractTest;
