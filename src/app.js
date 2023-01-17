'use strict';
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors')
const bodyParser = require('body-parser')

const resolvePath = require('path').resolve;

const chalk = require('chalk');
const figlet = require('figlet');

const loggers = require('./config').loggers;
const appConfigurations = require('./config').appConfigurations;
const databaseConfigurations = require('./config').databaseConfigurations;

// Express app initialization
var app = express();

// Middleware
if (process.env.NODE_ENV == 'development') app.use(cors())
app.use(helmet());
app.use(morgan(loggers));
app.use(bodyParser.json())
app.use(require('./api/router'));

app.listen(appConfigurations.port, appConfigurations.ip, () => {

  console.log(chalk.yellow(figlet.textSync(appConfigurations.backend_name, { font: 'Slant' })));
  console.log(chalk.yellow(figlet.textSync(appConfigurations.version, { font: 'Slant' })));
  
  console.log(chalk.cyanBright('  Server Info'));
  console.log(chalk.cyanBright('  -----------'));
  console.log(chalk.cyanBright('> IP address: ' + appConfigurations.ip));
  console.log(chalk.cyanBright('> Port: ' + appConfigurations.port));
  console.log(chalk.cyanBright('> DB url: ' + databaseConfigurations.database));
  console.log('\n');
});

