import auth from "basic-auth";

/**
 * @param {string} username
 * @param {string} password
 */
export function basicAuth(username, password) {
  return function(req, res, next) {
    var user = auth(req);

    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401);
    }
    else {
      next();
    }
  };
};
