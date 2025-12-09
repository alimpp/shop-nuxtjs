import { BaseApp } from "../core/BaseApp";
import { IPropertyResponseServer } from "../types/Property";

export class PropertyDataModel extends BaseApp<any> {
  constructor() {
    super("property");
  }

  public formatter(apiResponse: IPropertyResponseServer[]) {
    if (!Array.isArray(apiResponse)) {
      throw new Error("Invalid list data format");
    }
    let list: IPropertyResponseServer[] = [];
    apiResponse.map((property) => {
      const obj = {
        ...property,
        created_at: property.created_at.slice(0, 10),
        loading: false,
      };
      list.push(obj);
    });
    return list;
  }
}
