import { BaseApp } from '../core/BaseApp';
import { IAddress } from '../types/Address';

const { formatDateTime, parseDate } = useDate();

export class AddressDataModel extends BaseApp<any> {
  constructor() {
    super('address');
  }

  public addressParsed(apiResponse: IAddress[]) {
    if (!Array.isArray(apiResponse)) {
      throw new Error('Invalid list data format');
    }
    let list = [];

    const existDefault = apiResponse.find((item) => item?.default === true);

    if (existDefault) {
      list.push(existDefault);
    }

    for (let item of apiResponse) {
      if (item.default == false) {
        const isoString = item.created_at;
        const date = parseDate(isoString);
        const dateFormt = formatDateTime(date);
        const obj = {
          ...item,
          created_at: `${item.created_at?.split('T')[0]} - ${dateFormt}`,
        };
        list.push(obj);
      }
    }
    return list;
  }
}
