const jwt = require('jsonwebtoken');

const withAuth = function(req, res, next) {
  const token = req.body.accessToken || req.query.accessToken || req.headers["x-access-token"];  ;
  if (!token) {
    return res.status(401).send('Unauthorized: No token provided');
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.tokenUser = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}
module.exports = withAuth;