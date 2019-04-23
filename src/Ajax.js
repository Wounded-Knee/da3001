import { Component } from 'react';
import axios from 'axios';
import DefaultState from './data/DefaultState.js';

class Ajax extends Component {
	componentWillMount() {
		this.props.fetch(...(this.props.args || []));
	}

	componentWillReceiveProps(nextProps) { // or componentDidUpdate
		if (JSON.stringify(nextProps.args) !== JSON.stringify(this.props.args)) {
			this.props.fetch(...(nextProps.args || []));
		}
	}

	render() {
		return this.props.children || null;
	};
};

export default Ajax;
