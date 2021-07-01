'use strict';

const configurer = require('@mstefan99/configurer');


module.exports = function (filePath, readInterval = 30) {
	return new Promise(resolve => {
		configurer(filePath).load().then(config => {
			function getProxy(rootObj) {
				return {
					get: function (target, prop, receiver) {
						if (typeof target[prop] === 'object') {
							return new Proxy(Reflect.get(target, prop, receiver),
								getProxy(rootObj));
						} else {
							return Reflect.get(target, prop, receiver);
						}
					},
					set: function (target, prop, value, receiver) {
						Reflect.set(target, prop, value, receiver);
						rootObj.save();
						return true;
					}
				};
			}

			const autoConfig = new Proxy(config, getProxy(config));

			setInterval(() => {
				autoConfig.load();
			}, readInterval * 1000).unref();

			resolve(autoConfig);
		});
	});
};
