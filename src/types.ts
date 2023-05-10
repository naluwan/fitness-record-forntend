export type Record = {
  id: number;
  date: string;
  weight: number;
  waistline: number;
  description: string;
  User?: User;
  SportCategory?: SportCategory;
  userId: number;
  sportCategoryId: number;
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
  weight?: number;
  waistline?: number;
  nowWeight?: number;
  nowWaistline?: number;
  weightDiff?: number;
  waistlineDiff?: number;
};
