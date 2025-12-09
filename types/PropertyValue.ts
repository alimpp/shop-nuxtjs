import { IPropertyResponseServer } from './Property';
export interface IPropertyValueResponseServer {
  id: string;
  name: string;
  submiter: string;
  created_at: string;
  properttyId: IPropertyResponseServer;
  loading?: boolean;
}

export interface IPropertyValueFromServer {
  name: string;
  propertyId: string;
}
