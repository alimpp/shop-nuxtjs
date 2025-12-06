import { BaseApp } from '../core/BaseApp';
import { IPropertyValueResponseServer } from '../types/PropertyValue';

export class PropertyValueDataModel extends BaseApp<any> {
  constructor() {
    super('propertyValue');
  }

  public formatter(apiResponse: IPropertyValueResponseServer[]) {
    if (!Array.isArray(apiResponse)) {
      throw new Error('Invalid list data format');
    }
    let list: IPropertyValueResponseServer[] = [];
    apiResponse.map((propertyValue) => {
      const obj: IPropertyValueResponseServer = {
        ...propertyValue,
        created_at: propertyValue.created_at.slice(0, 10),
        loading: false,
      };
      list.push(obj);
    });
    return list;
  }
}
