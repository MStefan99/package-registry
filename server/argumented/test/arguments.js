'use strict';

const argumented = require('../index');

argumented.description('Test script');
argumented.add('verbose', '-v', null, 'verbose');
argumented.add('single', ['-s', '--single-arg'], 'argValue', 'single argument');
argumented.add('double', ['-d', '--double-arg'], ['arg1', 'arg2'], 'double arg');
argumented.positionalDesc('pos', 'positional');
const args = argumented.parse();

console.log(args);
