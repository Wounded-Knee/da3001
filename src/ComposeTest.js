import React, { Component } from 'react';
import HDiv from './HDiv.js';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import TagList from './TagList.js';
import Test from './Test.js';

class ComposeTest extends Component {
	constructor(props) {
		super(props);
		this.state = this.getDefaultState();
	}

	getDefaultState() {
		return {
			name: '',
			question: '',
			choices: [],
		};
	}

	getInputElement({caption, name, value, onChange}) {
		return (
			<fieldset>
				<legend>{ caption }</legend>
				{
					name === 'emoji' ?
						<Picker onSelect={ (emojiObj) => onChange(name, undefined, emojiObj.native) } />
					:
						<input type="text" name={ name } value={ value } onChange={ (e) => onChange(name, e) } />
				}
			</fieldset>
		);
	}

	addChoice(e) {
		e.preventDefault();
		this.setState({
			choices: [
				...this.state.choices,
				{
					name: '',
					summary: '',
					emoji: '',
					choice: '',
				}
			]
		})
	}

	updateTest(name, e) {
		e.preventDefault();
		this.setState({
			[name]: e.target.value
		});
	}

	updateChoice(index, name, e, value) {
		if (e) e.preventDefault();
		this.setState({
			choices: [
				...(this.state.choices.map(
					(choice, stateIndex) =>
						stateIndex === index ? {
							...choice,
							[name]: value ? value : e.target.value
						} : choice
				))
			]
		});
	}

	save(e) {
		e.preventDefault();
		this.props.helpers.submitTest(this.state).then(res => {
			this.setState(this.getDefaultState());
			this.forceUpdate(); // This should not be necessary!
		}).catch(e => {
			alert('Something went wrong, dawg.\n\n'+e);
		});
	}

	render() {
		const onChange = this.updateTest.bind(this);
		return (
			<HDiv title="Ask a Question" classNames="layout composeTest">
				<Test data={ this.state } helpers={ this.props.helpers } />
				<form>
					{ this.getInputElement({
						caption: 'Question',
						name: 'question',
						value: this.props.question,
						onChange: onChange,
					}) }

					{
						this.state.choices.map((choice, index) => {
							const onChange = this.updateChoice.bind(this, index);
							return (
								<fieldset>
									<legend>{ choice.name ? <TagList tags={ [choice] } /> : "Choice #"+index }</legend>
									{ this.getInputElement({
										caption: 'Option Name',
										name: 'choice',
										value: choice.choice,
										onChange: onChange
									}) }
									{ this.getInputElement({
										caption: 'Tag Name',
										name: 'name',
										value: choice.name,
										onChange: onChange
									}) }
									{ this.getInputElement({
										caption: 'Tag Emoji',
										name: 'emoji',
										value: choice.emoji,
										onChange: onChange
									}) }
									{ this.getInputElement({
										caption: 'Tag Summary',
										name: 'summary',
										value: choice.summary,
										onChange: onChange
									}) }
								</fieldset>
							);
						})
					}

					{ this.getInputElement({
						caption: 'Test Name',
						name: 'name',
						value: this.props.name,
						onChange: onChange,
					}) }

					<button onClick={ this.addChoice.bind(this) }>Add Choice</button>
					<button onClick={ this.save.bind(this) }>Share Question</button>
				</form>
			</HDiv>
		)
	};
};

export default ComposeTest;
