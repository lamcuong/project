import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import UserModel from '@expense-management/backend/mongo/schemas/user';
import { UserService } from '@expense-management/backend/services/user';
import { removeIfNotExist } from '@expense-management/backend/utils/lodash';
@injectable()
export class UserController {
  @inject(UserService)
  private userService!: UserService;

  public signUp = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });
      if (user) return res.badreq({ message: "Tài khoản đã tồn tại" });
      const newUser = await this.userService.signUp(
        removeIfNotExist({
          username,
          password,
        })
      );
      return res.success({ data: newUser });
    } catch (error) {
      console.log(error);
      return res.internal({ errors: error });
    }
  };
  public signIn = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const data = await this.userService.signIn(
        removeIfNotExist({
          username,
          password,
        })
      );
      if (!data) {
        return res.unauth({ message: 'Username or pas123sword is wrong' });
      }
      // @ts-ignore
      return res.success({ data });
    } catch (error) {
      return res.internal();
    }
  };
  public me = async (req: Request, res: Response) => {
    try {
      if (!req.user.id) return res.unauth();
      const data = await this.userService.me(req.user.id);
      return res.success({ data });
    } catch (error) {
      return res.error({ errors: error });
    }
  };
  public googleSignIn = async (req: Request, res: Response) => {
    try {
      const { name, email, id, avatar } = req.body;
      const data = await this.userService.googleSignIn({
        name,
        email,
        id,
        avatar,
      });
      if (!data) {
        return res.unauth({ message: "Login Failed" });
      }
      // @ts-ignore
      return res.success({ token: data });
    } catch (error) {
      console.log(error);
      return res.internal();
    }
  };
}
