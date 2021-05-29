# Express-flash

Express-flash is an Express middleware that helps you to show one-time banners on your Express pages.

### Usage

To use flash, just add a `flash()` middleware to pages you want to have flash banners and just call `res.flash()` 
whenever you feel like it's a good time to show a flash message.

```javascript
const app = express();
const flash = require('express-flash');

app.use(flash());  // Reads and shows flash messages on all pages

app.get('/example', (req, res) => {
	res
		.flash({  // Create a new flash to be shown on a next page with flash middleware
		type: 'warning',
		title: 'Too many attempts',
		info: 'We have detected too many sign in attempts for your IP. ' +
			'Please try again after some time.'
	})
		.send('Example webpage');
});
```

Flashes are stored as is in res.locals.flashes, so you can pass any data you want and have any design for flash banners.
Flashes are stored in cookies so please keep in mind its size limit.
