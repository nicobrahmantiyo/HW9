const jwt = require('jsonwebtoken');
require('dotenv').config;

exports.signToken = (data) => {
  return jwt.sign(data, 'fswd');
};
