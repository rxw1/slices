'use strict';

let app = require('koa')();
let setup = require('./setup');

const port = process.env.PORT || 3005;

app.use(setup.run());

app.listen(port, function() {
	console.log(`localhost:${port} started`);
});
