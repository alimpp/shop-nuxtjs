export interface IPropertyResponseServer {
  id: string;
  name: string;
  submiter: string;
  created_at: string;
  trash?: boolean;
  loading?: boolean;
}

export interface IPropertyFromServer {
  name: string;
  trash?: boolean;
}
