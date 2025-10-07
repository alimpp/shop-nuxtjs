import { BaseApp } from '../core/BaseApp';
import { ICategory } from '../types/Category';

const { formatDateTime, parseDate } = useDate();

export class CategoryDataModel extends BaseApp<any> {
  constructor() {
    super('category');
  }

  public categoryParsed(apiResponse: ICategory[]) {
    if (!Array.isArray(apiResponse)) {
      throw new Error('Invalid list data format');
    }
    let list: ICategory[] = [];
    apiResponse.map((category) => {
      const obj = {
        ...category,
        created_at: category.created_at.slice(0, 10),
      };
      list.push(obj);
    });
    return list;
  }
}
