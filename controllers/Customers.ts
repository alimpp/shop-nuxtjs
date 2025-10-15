import { CustomersDataModel } from '../model/Customers';

import { ICustomers, IUserData } from '../types/Customers';

const { success, error, warning } = useToast();

export class CustomersController extends CustomersDataModel {
  constructor() {
    super();
  }

  private customersStore = useCustomersStore();

  public getCacheData() {
    try {
      const cacheData = this.readObject();
      if (cacheData) {
        this.customersStore.setCustomersList(cacheData);
      }
    } catch (err) {
      const textError = 'customer data caching field';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async customersList() {
    this.getCacheData();
    try {
      this.customersStore.setModuleState('loading');
      const serverResponse: ICustomers[] = await this.Get('/api/users/all');
      const parseResult = await this.customersParser(serverResponse);
      this.customersStore.setCustomersList(parseResult);
      this.customersStore.setModuleState('');
    } catch (err) {
      const textError = 'customer data fetching field';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async getUserData(id: string) {
    try {
      const response: IUserData = await this.Post('/api/users-data/user/data', {
        userId: id,
      });
      if (!response?.data) {
        warning('No user data found in response');
        throw new Error('No user data found in response');
      }
      const result = await this.parseUserData(response.data);
      if (result?.os) {
        return result.os;
      } else {
        warning('OS system data not found for user');
        return undefined;
      }
    } catch (err) {
      const textError = `Error fetching user data for ID ${id}`;
      error(textError);
      console.error(err);
      return undefined;
    }
  }
}

export const customersController = new CustomersController();
