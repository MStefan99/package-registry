'use strict';

const smartConfig = require('../index');


smartConfig().then(config => {
	config.something = 'data';
	config.data = {array: []};
	config.data.array = [1, 2, 3];

	if (config.test === undefined) {
		config.test = {
			number: 0,
			string: 'test',
			bool: true,
			obj: {a: 'b'}
		};
	}

	console.log(config);

	setTimeout(() => {
		++config.test.number;
		console.log('config updated');
	}, 3000);
});


smartConfig().then(config => {
	setTimeout(() => {
		console.log(config);
	}, 7000);
});
