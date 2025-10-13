export interface ICustomers {
  id: string;
  fristname: string;
  lastname: string;
  email: string;
  avatarUrl: string;
  phone: string;
  created_at: Date;
}

export interface IUserData {
  id: string;
  userId: string;
  os: string;
  created_at: Date;
}
