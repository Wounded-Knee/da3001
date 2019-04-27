import React from 'react';
import App from '../App';

function AppView(props) {
	var newProps = {
		users: [...props.users],
		nodes: [...props.nodes.values()],
	};
	return <App { ...newProps } />;
}

export default AppView;
