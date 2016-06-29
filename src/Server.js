// requires
// requires modules
var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
// requires logger module
var log4js = require('log4js');
// requires localization module
var i18n = require("i18n");
// requires config
var config = require("config");
// requires js sources
var rest = require("./Rest.js");
// requires ORM
var Sequelize = require('sequelize');
// Authentication module.
var auth = require('http-auth');


// Authentication parameters
var basic = auth.basic({
      realm: "JD_API"
    }, function (username, password, callback) {
      // Custom authentication
      // Use callback(error) if you want to throw async error.
      callback(username === "fmorante" && password === "fmorante");
    }
);

var app  = express();
app.use(auth.connect(basic));

// localization
i18n.configure({
  locales: ['en', 'es'],
  fallbacks: {'de': 'en'},
  directory: __dirname + '/locales'
});
app.use(i18n.init);
i18n.setLocale('es');

//logger init
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file(config.get('logger.file')), 'logger');
var logger = log4js.getLogger('logger');
logger.setLevel(config.get('logger.mode'));

function REST(){
  var self = this;
  self.connectMysql();
};


REST.prototype.connectMysql = function() {
  var self = this;
  var Sequelize = require('sequelize')
      , sequelize = new Sequelize(config.get('database.db'), config.get('database.user'), config.get('database.password'), {
        dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
        port:    config.get('database.port')
      });

  sequelize
      .authenticate()
      .then(function(err, connection) {
        logger.info(i18n.__('Connection has been established successfully.'));
        self.configureExpress(sequelize);
      }, function (err) {
        logger.fatal(i18n.__('Unable to connect to the database: ') + err);
        self.stop(err);
      });
}

REST.prototype.configureExpress = function(connection) {
  var self = this;
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  var router = express.Router();
  app.use(config.get('api.uri') + config.get('api.version'), router);
  var rest_router = new rest(router,connection,md5);
  self.startServer();
}

REST.prototype.startServer = function() {
  app.listen(3000,function(){
    logger.info(i18n.__("Server running at port 3000."));
  });
}

REST.prototype.stop = function(err) {
  logger.fatal(i18n.__("Issue with MySQL: ") + err);
  process.exit(1);
}

new REST();