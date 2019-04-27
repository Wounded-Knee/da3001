import React, { Component } from 'react';
import NodeActions from './data/NodeActions';

class Node extends Component {
	componentWillMount() {
		setTimeout(() => {
			NodeActions.getNode(parseInt(this.props.nodeId));
		}, 1);
	}

	render() {
		const { nodes, nodeId } = this.props;
		const node = nodes.filter(node => node.id === parseInt(nodeId))[0];
		return node ? (
			<div className="node">
				<div>{ node.text || 'Empty Node' }</div>
				{ node.children.map(childNode => <button key={ childNode.id }>{ childNode.text }</button>) }
			</div>
		) : (
			<div>
				<h1>Error</h1>
				<p>Node #{ nodeId } not found</p>
				<p>{ nodes.length } entries in NodeStore.</p>
				<p>{ nodes.length === 1 ? '#' + nodes[0].id + ' ' + nodes[0].text : null }</p>
			</div>
		);
	}
};

export default Node;
