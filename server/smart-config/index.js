'use strict';

const configurer = require('@mstefan99/configurer');


module.exports = function (filePath, readInterval = 30) {
	return new Promise(resolve => {
		configurer(filePath).load().then(config => {
			const proxy = {
				get(target, prop, receiver) {
					const obj = Reflect.get(target, prop, receiver);

					if (obj === null) {
						return obj;
					} else if ((typeof obj === 'object' || typeof obj === 'function')
						&& Object.getOwnPropertyDescriptor(target, prop)?.configurable) {
						return new Proxy(obj, proxy);
					} else {
						return obj;
					}
				},
				set(target, prop, value, receiver) {
					Reflect.set(target, prop, value, receiver);
					config.save();
					return true;
				}
			};

			const smartConfig = new Proxy(config, proxy);

			setInterval(() => {
				smartConfig.load();
			}, readInterval * 1000).unref();

			resolve(smartConfig);
		});
	});
};
