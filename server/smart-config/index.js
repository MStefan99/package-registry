'use strict';

const configurer = require('@mstefan99/configurer');


module.exports = function (filePath, readInterval = 30) {
	return new Promise(resolve => {
		configurer(filePath).load().then(config => {
			const proxy = {
				get: function (target, prop, receiver) {
					if (typeof target[prop] === 'object' && !target instanceof Proxy) {
						return new Proxy(Reflect.get(target, prop, receiver),
							proxy);
					} else {
						return Reflect.get(target, prop, receiver);
					}
				},
				set: function (target, prop, value, receiver) {
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
