import { BaseApp } from '../core/BaseApp';
import { IAddress } from '../types/Address';

export class AddressDataModel extends BaseApp<any> {
  constructor() {
    super('address');
  }

  public addressParsed(apiResponse: IAddress[]) {
    if (!Array.isArray(apiResponse)) {
      throw new Error('Invalid list data format');
    }
    console.log(apiResponse);
  }
}
