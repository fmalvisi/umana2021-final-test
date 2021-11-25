// var myArgs = process.argv.slice(2);
// console.log(myArgs);
var http = require('http');
var path = require('path');
var session = require('express-session');
var Keycloak = require('keycloak-connect');
var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router(path.join(__dirname, 'db.json'));
var middlewares = jsonServer.defaults();
server.use(middlewares);

var memoryStore = new session.MemoryStore();

server.use(session({
  secret: 'service-nodejs-secret-token',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

var keycloak = new Keycloak({
  store: memoryStore
});

server.use(keycloak.middleware({
  logout: '/logout',
  admin: '/'
}));

server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  })
);


server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running updated!',keycloak.getConfig());
})
