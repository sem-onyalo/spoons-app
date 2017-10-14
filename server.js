var express = require('express'),
    app = express(),
    port = process.env.PORT || 8000;

require('./routes')(app);

app.listen(port);

console.log('Spoons web service started on: ' + port);
