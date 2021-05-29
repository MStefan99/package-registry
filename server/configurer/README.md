# Configurer

Configurer is a Node.js library that allows you to store and load your configs from a file with a single line of code!

### Usage

Configurer is extremely simple to use, here is a full example of the library usage in just 4 lines:

```javascript
const configurer = require('configurer');

let config = configurer('./your_config_file.json');  // Initialize the library

config = await config.load();  // Load the config from the file
await config.save();  // Save the config to the specified file
```

You can change the default options as follows:

```javascript
config.filePath = './other_file.json1';  // Change the config file location
config.defaults = {};  // Change default options
```

If the property is not present in the object during save, its default value will be taken from the defaults.
You can use the config object just like any other object: you can read and write all others properties as usual.
