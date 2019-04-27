function IsImmutableSet = immutable => JSON.stringify(immutable.toJSON()) !== JSON.stringify(immutable._defaultValues);

export default IsImmutableSet;
