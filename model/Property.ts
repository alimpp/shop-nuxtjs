import { BaseApp } from "../core/BaseApp";
import { IProperty } from "../types/Property";

export class PropertyDataModel extends BaseApp<any> {
  constructor() {
    super("property");
  }

  public PropertyParsed(apiResponse: IProperty[]) {
    if (!Array.isArray(apiResponse)) {
      throw new Error("Invalid list data format");
    }
    let list: IProperty[] = [];
    apiResponse.map((property) => {
      const obj = {
        ...property,
        created_at: property.created_at.slice(0, 10),
      };
      list.push(obj);
    });
    return list;
  }
}
