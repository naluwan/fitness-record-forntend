export type Record = {
  id: number;
  date: string;
  weight: number;
  waistline: number;
  description: string;
  User: User;
  SportCategory: SportCategory;
};

export type SportCategory = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};
