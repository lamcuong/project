import { id, injectable } from 'inversify';
import bcrypt, { genSalt } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '@/mongo/schemas/user';
@injectable()
export class UserService {
  private bcryptPassword = async (password: string) => {
    return bcrypt.hash(password, await genSalt(10));
  };
  private comparePassword = async (password: string, passwordHash: string) => {
    if (!password || !passwordHash) return false;

    const match = await bcrypt.compare(password, passwordHash);
    return match;
  };
  public signUp = async (input: UserInput) => {
    const user = await UserModel.create(input);
    user.password = await this.bcryptPassword(input.password!);
    await user.save();
    return user;
  };
  public signIn = async (input: UserInput) => {
    const user = await UserModel.findOne({ username: input.username });
    if (!user) return undefined;
    if (!(await this.comparePassword(input.password!, user.password!))) {
      return undefined;
    }
    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY ?? '');
    return {
      token
    }
  };
  public me = async (id: string) => {
    const user = await UserModel.findById(id);
    console.log({ user });
    return user?.toObject();
  };
  public googleSignIn = async (input: Google) => {
    const existedUser = await UserModel.findOne({ social_id: input.id });
    if (existedUser) {
      return jwt.sign({ _id: existedUser._id?.toString() }, process.env.SECRET_KEY ?? '');
    }
    const newUser = await UserModel.create({
      email: input.email,
      name: input.name,
      avatar: input.avatar,
      social_id: input.id,
    });
    if (!newUser) throw new Error('error');
    return jwt.sign({ _id: newUser._id?.toString() }, process.env.SECRET_KEY ?? '');
  };
}
