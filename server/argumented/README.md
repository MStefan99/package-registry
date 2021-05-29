# Argumented

Argumented is a JavaScript library that simplifies parsing the command-line arguments. 

### Usage

Argumented can be included and initialized in just a few lines of code:

```javascript
const argumented = require('argumented');

argumented.description('A sample app that illustrates how to use Argumented');
argumented.add('verbose', '-v', null, 'verbose');
argumented.add('single', ['-s', '--single-arg'], 'argValue', 'single argument');
argumented.add('double', ['-d', '--double-arg'], ['arg1', 'arg2'], 'double argument');
const args = argumented.parse();

console.log(args);
```

When called as follows: `node example.js -v -s 1 -d 1 2 path.txt somethingElse` this script will produce the following
output: 
```json
{
  "positional": [ "path.txt", "somethingElse" ],
  "verbose": true,
  "single": "1",
  "double": { "arg1": "1", "arg2": "2" }
}
```
where `positional` property contains everything that is not recognized as an argument option, like in the case with 
`-s` and `-d` arguments.

Argumented will automatically create and show a help page when your application is started with `-h` or `--help` flags.
