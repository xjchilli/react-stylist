let express = require('express');
let port = process.env.PORT || 8000;
let app = express();
let proxy = require('http-proxy-middleware');
let winston = require('winston');

app.use(express.static(__dirname));
app.listen(port);

console.log('started on port ' + port);


app.use('/wx', proxy({
	target: 'http://wxapi.dapeis.com',
	changeOrigin: true,
	logProvider: function (provider) {
		let logger = new (winston.Logger)({
			transports: [
				new winston.transports.File({ filename: __dirname + '/all-logs.log' })
			],
			exceptionHandlers: [
				new winston.transports.File({ filename: __dirname + '/exceptions.log' })
			]
		});

		let myCustomProvider = {
			log: logger.log,
			debug: logger.debug,
			info: logger.info,
			warn: logger.warn,
			error: logger.error
		}
		return myCustomProvider;
	}
}
));

//首页
app.get('*', function (req, res) {
	res.sendFile(__dirname + '/assets/index.html');
});

