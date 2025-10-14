import { AddressDataModel } from '../model/Address';
const { success, error } = useToast();

import { IAddBody, IAddress } from '../types/Address';

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
    this.getCacheData();
    this.addressStore.setModuleState('loading');
    await this.Get('/api/address/all/user').then((res: any) => {
      const result = this.addressParsed(res);
      this.addressStore.setList(result);
      this.saveAllItems(result);
      this.addressStore.setModuleState('');
    });
  }

  public async add(body: IAddBody) {
    await this.Post('/api/address/add', body)
      .then((res) => {
        success(`Your ${body.name} address successfully added`);
        this.list();
      })
      .catch((err) => {
        error(`Add new address failed`);
      });
  }

  public async getAddressByUserId(userId: string) {
    try {
      const serverResponse: IAddress[] = await this.Get(
        `/api/address/${userId}`
      );
      const parseList = this.addressParsed(serverResponse);
      if (parseList.length != 0) return parseList;
      error('User no address data');
      return null;
    } catch (err) {
      const textError = 'address by user id fetching field';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }
}

export const addressController = new AddressController();
