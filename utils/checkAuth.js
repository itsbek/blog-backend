import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').replace('Bearer ', '');

    if (token) {
      const decoded = jwt.verify(token, 'secret1234');

      req.userId = decoded._id;
      next();
    }
  } catch (error) {
    return res.status(403).json({
      message: 'Auth failed',
    });
  }
};
