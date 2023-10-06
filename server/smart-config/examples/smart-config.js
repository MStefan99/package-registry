'use strict';

const SmartConfig = require('../index');


// Solution for linking different configs together
let promise = new Promise(resolve => {
	const config = new SmartConfig();
	config.defaults = {
		arr: [],
		null: null
	}

	config.then(c => {
		console.log('config', config);

		resolve(c);
	})
});



promise.then(config => {
	config.something = 'data';
	if (!config.data) {
		config.data = {array: []};
		config.data.array = [1, 2, 3];
	}

	if (config.test === undefined) {
		config.test = {
			number: 0,
			string: 'test',
			bool: true,
			obj: {a: 'b'}
		};
	}

	console.log(config);
	++config.test.number;
	console.log(config);
	promise.then(c => console.log(config === c));
	// Configs are all updated at the same time!
});


promise.then(config => {
	setTimeout(() => {
		console.log(config);
	}, 1000);
});


promise.then(config => {
	setTimeout(() => {
		console.log(config);
		config.data.array.push(4);
		console.log(config);
	}, 3000);
});
