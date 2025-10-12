import { CustomersDataModel } from '../model/Customers';
const { success, error } = useToast();

export class CustomersController extends CustomersDataModel {
  constructor() {
    super();
  }

  private customersStore = useCustomersStore();

  public getCacheData() {
    const cacheData = this.readObject();
    if (cacheData) {
      this.customersStore.setCustomersList(cacheData);
    }
  }

  public async customersList() {
    this.getCacheData();
    this.customersStore.setModuleState('loading');
    await this.Get('/api/users/all').then(async (res: any) => {
      const result = await this.customersParser(res);
      this.customersStore.setCustomersList(result);
      this.customersStore.setModuleState('loading');
    });
  }

  public async getUserData(id: string) {
    let result;
    await this.Post('/api/users-data/user/data', { userId: id }).then(
      async (res) => {
        if (res?.data) {
          result = await this.parseUserData(res.data);
        }
      }
    );
    if (result?.os) {
      return result?.os;
    } else {
      error('Os system data no found');
    }
  }
}

export const customersController = new CustomersController();
