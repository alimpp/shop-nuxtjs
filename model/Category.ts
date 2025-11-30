import { BaseApp } from '../core/BaseApp';
import { ICategoryResponseServer } from '../types/Category';

export class CategoryDataModel extends BaseApp<any> {
  constructor() {
    super('category');
  }

  public formatter(apiResponse: ICategoryResponseServer[]) {
    if (!Array.isArray(apiResponse)) {
      throw new Error('Invalid list data format');
    }
    let list: ICategoryResponseServer[] = [];
    apiResponse.map((category) => {
      const obj = {
        ...category,
        preViewImage: `http://localhost:4000/files/${category.imageId}`,
        preViewIcon: `http://localhost:4000/files/${category.iconId}`,
        created_at: category.created_at.slice(0, 10),
      };
      list.push(obj);
    });
    return list;
  }
}
