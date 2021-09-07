function auth(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(403).json({
      message: 'Unauthenticated: Missing authorization header',
    });
  }
  if (authorization !== process.env.STATUS_PASSWORD) {
    return res.status(403).json({
      message: 'Unauthenticated: Invalid authorization code',
    });
  }
  next();
}

module.exports = { auth };
