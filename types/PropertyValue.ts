export interface IPropertyValueResponseServer {
  id: string;
  name: string;
  submiter: string;
  created_at: string;
  propertyId: string;
}

export interface IPropertyValueFromServer {
  name: string;
  propertyId: string;
}
