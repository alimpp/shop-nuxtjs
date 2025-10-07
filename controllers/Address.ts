import { AddressDataModel } from '../model/Address';

export class AddressController extends AddressDataModel {
  constructor() {
    super();
  }
  private addressStore = useAddressStore();
  public getCacheData() {
    const cacheData = this.readObject();
    if (cacheData) {
      this.addressStore.setList(cacheData);
    }
  }

  public async list() {
    await this.Get('/api/address/all/user').then((res: any) => {
      const result = this.addressParsed(res);
      this.addressStore.setList(result);
    });
  }
}

export const addressController = new AddressController();
