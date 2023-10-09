const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const pool = require('./config.js');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./documentation/swagger.json-OpenApi3Json (1).json');

app.use(morgan('common'));
pool.connect((err, res) => {
  console.log(err);
  console.log('connected');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const movies = require('./routes/movies.js');
const users = require('./routes/users.js');
require('dotenv').config();

app.use(movies);
app.use(users);

app.listen(3000);
