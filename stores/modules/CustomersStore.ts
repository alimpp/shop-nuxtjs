import { BaseStore } from '../../core/BaseStore';
import { StoreManager } from '../../core/StoreManager';
import { ICustomers } from '../../types/Customers';

interface IState {
  cutomersList: ICustomers[];
  moduleState: string;
}

export class CustomersStore extends BaseStore<IState> {
  private static _instance: CustomersStore;

  public static getInstance(): CustomersStore {
    if (!CustomersStore._instance) {
      CustomersStore._instance = new CustomersStore();
    }
    return CustomersStore._instance;
  }

  private constructor() {
    super('cutomersList', {
      cutomersList: [],
      moduleState: '',
    });

    StoreManager.register(this);
  }

  public setModuleState(moduleState: string) {
    this._state.moduleState = moduleState;
  }

  get getModuleState(): string {
    return this._state.moduleState;
  }

  public async setCustomersList(list: ICustomers[]) {
    this._state.cutomersList = list;
  }

  public get getCustomersList(): ICustomers[] {
    return this._state.cutomersList;
  }

  public reset() {
    this._state.cutomersList = [];
    this._state.moduleState = '';
  }
}
