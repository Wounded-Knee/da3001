const TestPromises = [
	'Test1.js',
	'Test2.js',
	'Test3.js',
	'Test4.js',
	'Test5.js',
	'Test6.js',
	'Test7.js',
].map(module => import('./' + module));

export default TestPromises;
