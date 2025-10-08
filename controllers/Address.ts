import { AddressDataModel } from '../model/Address';
const { success, error } = useToast();

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

  public async add(body: any) {
    await this.Post('/api/address/add', body)
      .then((res) => {
        success(`Your ${body.name} address successfully added`);
        this.list();
      })
      .catch((err) => {
        error(`Add new address failed`);
      });
  }
}

export const addressController = new AddressController();
