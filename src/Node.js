import React, { Component } from 'react';

class Node extends Component {
	render() {
		const { node } = this.props;
		return node ? (
			<div className="node">
				<div>{ node.text || 'Empty Node' }</div>
				{ node.children.map(childNode => <button key={ childNode.id }>{ childNode.text }</button>) }
			</div>
		) : (
			<div>
				<h1>Error</h1>
				<p>Node not found</p>
			</div>
		);
	}
};

export default Node;
