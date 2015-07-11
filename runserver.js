var app = require('./app.js');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
		var host = server.address().address;
		console.log("Basic application listening on", host, ":", app.get('port'));
		});