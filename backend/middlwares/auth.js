const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const extractJwtToken = (header) => header.replace('jwt=', '');

const auth = (req, res, next) => {
  const { cookie } = req.headers;

  if (!cookie || !(cookie.startsWith('jwt='))) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = extractJwtToken(cookie);
  let payload;

  try {
    payload = jwt.verify(token, 'SUPER_PASSWORD');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};

module.exports = { auth };
