import { BaseApp } from '../core/BaseApp';

export class CustomersDataModel extends BaseApp<any> {
  constructor() {
    super('customers');
  }

  async customersParser(apiResponse: any) {
    if (!Array.isArray(apiResponse)) {
      throw new Error('Invalid list data format');
    }
    let list = apiResponse.map((item) => {
      return {
        ...item,
      };
    });
    return list;
  }

  async parseUserData(apiResponse: any) {
    return {
      os: JSON.parse(apiResponse.os),
    };
  }
}
