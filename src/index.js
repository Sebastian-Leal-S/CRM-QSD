const express = require('express');
const morgan = require('morgan');
const {create} = require('express-handlebars');
const path = require('path');

const app = express();

const hbs = create({
  extname: '.hbs',
  partialsDir: [path.resolve(__dirname, 'views/components')],
});

// variables de entorno
require('dotenv').config();

// database
require('./database/database');

// settigs
app.set('port', process.env.PORT || 3000);
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.resolve(__dirname, 'views'));

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use('/', require('./routes/index.routes'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
