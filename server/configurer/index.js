'use strict';

const path = require('path');
const fs = require('fs');


module.exports = function (filePath = './config.json') {
	let configReadable = null;
	let configWritable = null;
	let directoryWritable = null;
	let writePromise = Promise.resolve();

	let configObject = {};
	Object.defineProperty(configObject, 'defaults', {
		writable: true,
		value: {}
	});
	Object.defineProperty(configObject, 'filePath', {
		writable: true,
		value: filePath
	});
	Object.defineProperty(configObject, 'load', {
		value: load
	});
	Object.defineProperty(configObject, 'save', {
		value: queue
	});


	function isReadable() {
		return new Promise(resolve => {
			if (configReadable === null) {
				fs.access(path.resolve(configObject.filePath),
					fs.constants.R_OK, err => {
						resolve(configReadable = !err);
					});
			} else {
				resolve(configReadable);
			}
		});
	}


	function isWritable() {
		return new Promise(resolve => {
			if (configWritable === null) {
				fs.access(path.resolve(configObject.filePath),
					fs.constants.W_OK, err => {
						resolve(configWritable = !err);
					});
			} else {
				resolve(configWritable);
			}
		});
	}


	function isDirectoryWritable() {
		return new Promise(resolve => {
			if (directoryWritable === null) {
				fs.access(path.dirname(path.resolve(configObject.filePath)),
					fs.constants.W_OK, err => {
						resolve(directoryWritable = !err);
					});
			} else {
				resolve(directoryWritable);
			}
		});
	}


	function load() {
		return new Promise((resolve, reject) => {
			isReadable().then(readable => {
				if (readable) {
					fs.readFile(path.resolve(configObject.filePath), 'utf8', (err, data) => {
						resolve(Object.assign(configObject, configObject.defaults, JSON.parse(data)));
					});
				} else {
					queue()
						.then(() => resolve(configObject))
						.catch(err => reject(err));
				}
			});
		});
	}


	function queue() {
		writePromise = writePromise.then(() => write());
		return writePromise;
	}


	function write() {
		return new Promise((resolve, reject) => {
			isWritable().then(writable => {
				if (writable) {
					fs.writeFile(path.resolve(configObject.filePath),
						JSON.stringify(configObject, null, '\t'), 'utf8', err => {
							if (err) {
								reject('Failed to write config');
							} else {
								resolve();
							}
						});
				} else {
					isDirectoryWritable().then(writable => {
						if (writable) {
							fs.writeFile(path.resolve(configObject.filePath),
								JSON.stringify(configObject, null, '\t'), 'utf8', err => {
									if (err) {
										reject('Failed to create config');
									} else {
										resolve();
									}
								});
						} else {
							reject('Config directory not writable');
						}
					});
				}
			});
		});
	}

	return configObject;
};
