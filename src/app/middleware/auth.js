import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

export default async function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Token not provided!' });
  }

  const [, token] = authorization.split(' ');

  try {
    const { id } = jwt.verify(token, authConfig.secrete);
    req.userId = id;
    return next();
  } catch (error) {
    return res.status(500).json({ error: 'Invalid token!' });
  }
}
