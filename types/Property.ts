export interface IPropertyResponseServer {
  id: string;
  name: string;
  submiter: string;
  created_at: string;
  loading?: boolean;
}

export interface IPropertyFromServer {
  name: string;
}
