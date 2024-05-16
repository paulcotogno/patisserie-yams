import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface PayLoadType {
  customerId: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const JWTSecret = process.env.JWT_SECRET as string;

  if(!JWTSecret) {
    return res.status(403).json({ message: 'Server Error' });
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No Identification Token provided' });
  }

  jwt.verify(token, JWTSecret, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token' });
    }
    req.body.customerId = (payload as PayLoadType).customerId;
    next();
  });
};
