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
    return apiResponse.map((item) => {
      const isoString = item.created_at;
      const date = parseDate(isoString);
      const dateFormt = formatDateTime(date);
      return {
        ...item,
        created_at: `${item.created_at?.split('T')[0]} - ${dateFormt}`,
      };
    });
  }
}
