import jwt from 'jsonwebtoken';

export const verifyUserTokenMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const publicKey = await fetch(process.env.AUTH_USER_API_KEY)
    .then((res) => res.json())
    .then((json) => json.data.publicKey);

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, publicKey, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }

      req.sub = decoded.sub;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export const verifyAdminTokenMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const publicKey = await fetch(process.env.AUTH_ADMIN_API_KEY)
    .then((res) => res.json())
    .then((json) => json.data.publicKey);

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, publicKey, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }

      req.sub = decoded.sub;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
