import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const marks = {
  1: <strong>Private</strong>,
  2: 'Close',
  3: 'Near',
  4: 'Far',
  5: {
    style: { color: 'red' },
    label: <strong>Public</strong>,
  },
};

const PrivacySelector = (props) => {
	return (
		<div className="privacySelector">
			<Slider
				min={ 1 }
				max={ 5 }
				value={ props.value }
				marks={ props.marks ? marks : {} }
				onChange={ privacyLevel_id => props.onChange(privacyLevel_id) }
				vertical
				dots
			/>
		</div>
	);
};

export default PrivacySelector;
