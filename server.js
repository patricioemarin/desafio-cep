const cnshttp = require('http');
const cnsApp = require('./app');
const cnsPort = process.env.PORT || 3000;
const cnsServer = cnshttp.createServer(cnsApp);

cnsServer.listen(cnsPort);
