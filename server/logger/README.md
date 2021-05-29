# Logger

This library provides a simple way to write logs to your file system.

### Usage

Logger has a simple API and words similarly to `console` API in JavaScript.

```javascript
const logger = require('logger')('./path_to_log.txt');

const err = {desc: 'Something happened!'};

logger.log('This is a normal info message');
logger.error('This is an error', err);
```

There are a few methods available for different log types:

* `debug(data)` for verbose output
* `info(data)` for information
* `log(data)` for normal logs
* `warn(data)` for warnings
* `error(data)` for critical errors
* `print(tag, ...data)` for custom log levels
