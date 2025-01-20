import UserModel from '@expense-management/backend/mongo/schemas/user';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
interface DecodedToken {
  _id: string;
}
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer', '').trim();

    const decoded = jwt.verify(
      token ?? '',
      process.env.SECRET_KEY ?? '',
    ) as DecodedToken;

    const user: UserInterface = await UserModel.findById(decoded._id);

    if (!user) {
      return res.unauth();
    }
    req.user = user;
    next();
  } catch (error) {
    return res.unauth({ errors: error });
  }
};
