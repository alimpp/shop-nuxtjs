import { BaseApp } from '../core/BaseApp';
import { IAddress } from '../types/Address';

const { formatDateTime, parseDate } = useDate();

export class AddressDataModel extends BaseApp<any> {
  constructor() {
    super('address');
  }

  public addressParsed(apiResponse: IAddress[]): IAddress[] {
    if (!Array.isArray(apiResponse)) {
      throw new Error('Invalid list data format');
    }
    const defaultAddresses: IAddress[] = [];
    const nonDefaultAddresses: IAddress[] = [];
  
    for (const item of apiResponse) {
      if (item?.default === true) {
        defaultAddresses.push(item);
      } else {
        nonDefaultAddresses.push(item);
      }
    }
    
    const processedNonDefault = nonDefaultAddresses.map(item => {
      const isoString = item.created_at;
      if (!isoString) return item;
      
      const date = parseDate(isoString);
      const dateFormat = formatDateTime(date);
      
      return {
        ...item,
        created_at: `${isoString.split('T')[0]} - ${dateFormat}`
      };
    });
  
    return [...defaultAddresses, ...processedNonDefault];
  }
}
