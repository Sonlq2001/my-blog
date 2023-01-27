import { SocialLink } from 'features/profile/profile';

export type UserInfoType = {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  savePost: string[];
  description: string;
  coverPhoto: string;
  socials: SocialLink[];
  following: string[];
  followers: string[];
};
