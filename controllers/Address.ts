import { AddressDataModel } from '../model/Address';
const { success, error, warning } = useToast();

import { IAddBody, IAddress, IUpdateAddress } from '../types/Address';

export class AddressController extends AddressDataModel {
  constructor() {
    super();
  }

  private addressStore = useAddressStore();

  public getCacheData() {
    try {
      const cacheData = this.readObject();
      if (cacheData) {
        this.addressStore.setList(cacheData);
      }
    } catch (err) {
      const textError = 'address data caching failed';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async list() {
    this.getCacheData();
    try {
      this.addressStore.setModuleState('loading');
      await this.Get('/api/address/all/user').then((res: any) => {
        const result = this.addressParsed(res);
        this.addressStore.setList(result);
        this.saveAllItems(result);
        this.addressStore.setModuleState('');
      });
    } catch (err) {
      const textError = 'address data caching failed';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async add(body: IAddBody) {
    try {
      await this.Post('/api/address/add', {
        ...body,
        default: false,
        pin: false,
      });
      success(`Your ${body.name} address successfully added`);
      await this.list();
    } catch (err) {
      const textError = 'add address failed';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async setDefault(id: string, newDefault: boolean) {
    try {
      await this.Patch(`/api/address/set-default/${id}`, {
        default: newDefault,
      });
      success(`New Address Set Default`);
      await this.list();
    } catch (err) {
      const textError = 'set default address failed';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async remove(id: string) {
    try {
      await this.Delete(`/api/address/${id}`);
      success(`Address removed successfully`);
      await this.list();
    } catch (err) {
      const textError = 'Address does not removed';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async edit(body: IUpdateAddress) {
    try {
      await this.Patch(`/api/address/${body.id}`, body);
      success(`Your address successfully edited`);
      await this.list();
    } catch (err) {
      const textError = 'edit address failed';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async getAddressByUserId(userId: string) {
    try {
      const serverResponse: IAddress[] = await this.Get(
        `/api/address/${userId}`
      );
      const parseList = this.addressParsed(serverResponse);
      if (parseList.length != 0) return parseList;
      warning('User no address data');
      return null;
    } catch (err) {
      const textError = 'address by user id fetching failed';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }
}

export const addressController = new AddressController();
