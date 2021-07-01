# Rate Limiter

Rate limiter is an express middleware that keeps your users from abusing your web server by introducing a limit on the
number of requests they can make in a minute. This middleware uses a **Token Bucket** strategy, rejecting any request
if the token count in a corresponding bucket is less than zero instead of forwarding it to your app which may include
some time-consuming computations.

### Usage

```javascript
const express = require('express');
const rateLimiter = require('rate-limiter');

router.post('/login', rateLimiter({
	scheme: 'user.id',
	tag: 'auth',
	price: 5,
	redirect: true,
	action: (req, res) => console.log('Rate exceeded for user' + req.user.id)
}), async (req, res) => {
	res.send('Example webpage');
});
```

#### Available options

* `price` - How many tokens are spent per request (default: 1)
* `rate` - How many new tokens are added per minute (default: 10)
* `initial` - How many tokens each bucket has when created, can exceed maximum number (default: 10)
* `max` - Maximum amount of tokens (default: 30)
* `min` - Minimum amount of tokens (default: -10)
* `scheme` - Field of the request to be used as a bucket id, supports nesting (default: 'ip' for the `res.ip` field
	which limits based upon user IP)
* `tag` - A tag to separate different actions (default: null)
* `redirect` - Indicates whether to end the request or redirect back (default: false)
* `action` - A callback to be run when rate exceeded (default: null).
Has the following signature: `(req, res) => {}`;
