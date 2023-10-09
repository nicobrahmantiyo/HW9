const jwt = require('jsonwebtoken');

exports.authentication = (req, res, next) => {
  const beareHeader = req.headers['authorization'];
  const token = beareHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'invalid credential',
    });
  }

  const decodeToken = jwt.verify(token, 'fswd');

  //req.user.id = decodeToken.id;

  if (decodeToken.role === 'Construction Worker ') {
    return res.status(403).json({
      message: 'Unauthorized user',
    });
  }

  next();
};
