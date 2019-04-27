import Immutable from 'immutable';
import httpStatus from './httpStatus';

const CustomImmutable = schema => Immutable.Record({
	...schema,
	HTTP_STATUS: httpStatus.DORMANT,
});

export default CustomImmutable;
