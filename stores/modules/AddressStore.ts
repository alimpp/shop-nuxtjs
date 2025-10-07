import { BaseStore } from '../../core/BaseStore';
import { IAddress } from '../../types/Address';
import { StoreManager } from '../../core/StoreManager';

interface IAddressState {
  addressList: IAddress[];
  moduleState: string;
}

export class AddressStore extends BaseStore<IAddressState> {
  private static _instance: AddressStore;

  public static getInstance(): AddressStore {
    if (!AddressStore._instance) {
      AddressStore._instance = new AddressStore();
    }
    return AddressStore._instance;
  }

  private constructor() {
    super('address', {
      addressList: [],
      moduleState: '',
    });

    StoreManager.register(this);
  }

  public setModuleState(moduleState: string) {
    this._state.moduleState = moduleState;
  }

  public setList(list: IAddress[]) {
    this._state.addressList = list;
  }

  get getModuleState(): string {
    return this._state.moduleState;
  }

  public reset() {
    this._state.addressList = [];
    this._state.moduleState = '';
  }
}
