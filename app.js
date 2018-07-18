var builder = require('botbuilder')
var restify = require('restify')

// get the samuel l jackson quotes
var quotes = require('./quotes.json').quotes;

// setup restify
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function serverListenCallback() {
  console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector();

server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function Reply(session) {
  var random_quote = Math.floor(Math.random() * quotes.length);
  var quote = quotes[random_quote];
  session.send("Here's a quote bitch:\n%s\n", quote);
});
