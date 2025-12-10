export interface IPropertyResponseServer {
  id: string;
  name: string;
  submiter: string;
  created_at: string;
  trash?: boolean;
}

export interface IPropertyFromServer {
  name: string;
  trash?: boolean;
}
