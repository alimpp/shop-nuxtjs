export interface IAddress {
  id: string;
  name: string;
  content: string;
  postalCode: string;
  userId: string;
  created_at: Date;
  default: boolean;
  pin: boolean;
}

export interface IUpdateAddress {
  id?: string;
  name?: string;
  content?: string;
  postalCode?: string;
  userId?: string;
  created_at?: Date;
  default?: boolean;
  pin?: boolean;
}

export interface IAddBody {
  name: string;
  content: string;
  postalCode: string;
  default: boolean;
  pin: boolean;
}
