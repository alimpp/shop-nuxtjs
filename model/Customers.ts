import { BaseApp } from '../core/BaseApp';

import { ICustomers } from '../types/Customers';

const { formatDateTime, parseDate } = useDate();

export class CustomersDataModel extends BaseApp<any> {
  constructor() {
    super('customers');
  }

  async customersParser(apiResponse: ICustomers[]) {
    if (!Array.isArray(apiResponse)) {
      throw new Error('Invalid list data format');
    }
    let list = apiResponse.map((item) => {
      const isoString = item.created_at;
      const date = parseDate(isoString);
      const dateFormt = formatDateTime(date);
      return {
        ...item,
        created_at: dateFormt,
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
