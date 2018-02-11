var restify = require('restify');

var server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.fullResponse());
server.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const sampleUsers = [];

server.opts(/\.*/, function (req, res, next) {
    res.send(200);
    next();
});
server.get('/users/', function(req, res) {
    res.send(sampleUsers);
});

server.post('/user/add', function(req, res) {
    sampleUsers.push(req.body);
    res.send("User has been added")
});



server.listen(8000, function() {
    console.log('%s listening at %s', server.name, server.url);
});