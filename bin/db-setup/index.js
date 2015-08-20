'use strict';

let app = require('koa')();
let db = require('./db');

const port = process.env.PORT || 3005;

app.use(db.init());

app.listen(port, function() {
	console.log(`localhost:${port} started`);
});
