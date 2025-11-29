import { BaseApp } from '../core/BaseApp';
import { IHeroResponseServer } from '../types/Hero';

export class HeroDataModel extends BaseApp<any> {
  constructor() {
    super('hero');
  }

  public formater(apiResponse: IHeroResponseServer[]) {
    if (!Array.isArray(apiResponse)) {
      throw new Error('Invalid list data format');
    }

    let list = [];

    for (let item of apiResponse) {
      const obj = {
        ...item,
      };
      list.push(obj);
    }
    return list;
  }
}
