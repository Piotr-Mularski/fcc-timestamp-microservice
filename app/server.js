const express = require('express');

const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');

app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/:datestring', (req, res) => {
	const datestring = req.params.datestring;
	const regex = /^\d{4}-\d{2}-\d{2}$/g;

	if(datestring.match(regex)) {
		const date = new Date(datestring);
		res.json({
			unix: date.getTime(),
			utc: date.toUTCString()
		});
	} else if(datestring.match(/^\d+$/g)) {
		const date = new Date(parseInt(datestring));
		res.json({
			unix: date.getTime(),
			utc: date.toUTCString()
		});
	} else {
		res.json({ error: 'Ivalid Date' })
	}
});

app.get('*', (req, res) => {
	res.send('<h1>Nothing here</h1><p><a href="/">Go Home</a></p>')
})

const listener = app.listen(process.env.PORT, () => {
	console.log(`Your app is listening on port ${listener.address().port}`);
});
