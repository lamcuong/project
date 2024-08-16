declare global {
  interface UserInterface {
    username?: string;
    name?: string;
    password?: string;
    email?: string;
    id?: string;
    type?: string;
    avatar?: string;
    social_id?: string;
  }
  interface Facebook {
    id?: ID;
    name?: string;

    email?: string;

    access_token?: string;

    avatar?: string;
  }

  interface Google {
    id?: ID;
    name?: string;

    email?: string;

    access_token?: string;

    avatar?: string;
  }
  type UserInput = Partial<UserInterface>;
}
export {};
