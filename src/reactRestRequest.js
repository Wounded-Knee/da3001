import { Fetch } from 'react-request';
import DefaultState from './data/DefaultState.js';

const MyFetch = (props) => {
	return (
		<Fetch { ...props }>
			{({ fetching, failed, data }) => {
				if (fetching) {
					return <div>Loading data...</div>;
				}

				if (failed) {
					return <div>The request did not succeed.</div>;
				}

				if (data) return props.children;

				return null;
			}}
		</Fetch>
	);
};

export default MyFetch;
