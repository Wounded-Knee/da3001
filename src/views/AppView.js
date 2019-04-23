import React from 'react';
import App from '../App';

function AppView(props) {
	var props = {
		todos: [...props.todos.values()]
	};
	console.log('PROPS ', props);
  return <App { ...props } />;
}

export default AppView;
