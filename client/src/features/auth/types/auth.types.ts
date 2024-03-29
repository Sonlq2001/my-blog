export interface User {
  email: string;
  password: string;
}

export interface UserItem extends User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}
