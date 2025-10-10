import { AddressDataModel } from "../model/Address";
const { success, error } = useToast();

import { IAddBody } from "../types/Address";

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
    this.addressStore.setModuleState("loading");
    await this.Get("/api/address/all/user").then((res: any) => {
      const result = this.addressParsed(res);
      this.addressStore.setList(result);
      this.saveAllItems(result);
      this.addressStore.setModuleState("");
    });
  }

  public async add(body: IAddBody) {
    await this.Post("/api/address/add", body)
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
