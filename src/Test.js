import React, { Component } from 'react';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const emptyChoice = {
	name: '',
	summary: '---',
	emoji: '🌍',
	choice: '',
};

const emptyTest = {
	name: 'Test',
	question: '',
	tags: [
		emptyChoice
	],
};

class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pickerIndex: undefined,
			data: props.data || emptyTest,
		}
	}

	getClassName() {
		return [
			'test',
			this.props.edit ? 'edit' : '',
			this.props.className || '',
		].join(' ');
	}

	onClick(choiceId) {
		const { onAnswer } = this.props.helpers;
		const { id: testId } = this.state.data;
		onAnswer(testId, choiceId);
	}

	updateChoice(index, prop, value, e) {
		var tags = [ ...this.state.data.tags ];
		tags.splice(index, 1, {
			...this.state.data.tags[index],
			[prop]: value,
		});

		// Create a new button
		if (tags.length === index + 1) {
			tags.push(emptyChoice);
		}

		if (e) e.preventDefault();

		this.setState({
			data: {
				...this.state.data,
				tags: tags,
			}
		});
	}

	updateQuestion(e) {
		const { value: questionText } = e.target;
		e.preventDefault();
		this.setState({
			data: {
				...this.state.data,
				question: questionText
			}
		});
	}

	saveTest() {
		var x = {
			...this.state.data,
			tags: undefined,
			choices: this.state.data.tags.filter(tag => JSON.stringify(tag) !== JSON.stringify(emptyChoice))
		};
		this.props.helpers.submitTest(x).then(() => {
			this.setState({ data: emptyTest });
		});
	}

	render() {
		const { edit } = this.props;
		const {
			question,
			tags,
		} = this.state.data;

		return (
			<div className={ this.getClassName() }>
				{/* --- Emoji Picker --- */}
				{ this.state.pickerIndex !== undefined ?
					<Picker
						onSelect={
							emojiObj => {
								this.updateChoice(
									this.state.pickerIndex,
									'emoji',
									emojiObj.native
								);
								this.setState({
									pickerIndex: undefined
								});
							}
						}
					/>
				: '' }

				{/* --- Question --- */}
				{ edit ?
					<input
						className="question"
						type="text"
						name="question"
						value={ question }
						placeholder="Enter your question here..."
						onChange={ this.updateQuestion.bind(this) }
					/>
				:
					<p className="question">{ question }</p>
				}

				{/* --- Answers --- */}
				{ tags ?
					tags.map(
						(tag, index) => (
							edit ?
								<div>
									<input
										className="choice"
										type="text"
										name="choice"
										value={ tag.choice }
										placeholder="Provide an answer"
										onChange={ e => this.updateChoice(index, 'choice', e.target.value) }
									/>

									<div className="tagInputs">
										<span
											onClick={ () => { this.setState({ pickerIndex: index }) } }
										>{ tag.emoji }</span>

										<input
											className="tagName"
											type="text"
											value={ tag.name }
											placeholder="Tag Name"
											onChange={ e => this.updateChoice(index, 'name', e.target.value) }
										/>
									</div>

									<div className="tagDisplay">
									</div>
								</div>
							:
								<button key={ index } onClick={ this.onClick.bind(this, tag.id) }>
									{ tag.choice }
								</button>
						)
					)
				: 'Add Choices'}

				{ edit ? <button onClick={ this.saveTest.bind(this) }>Save</button> : '' }
			</div>
		);
	};
};

export default Test;
