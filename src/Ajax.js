import { Component } from 'react';

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
