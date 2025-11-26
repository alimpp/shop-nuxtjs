import { BaseStore } from '../../core/BaseStore';
import { StoreManager } from '../../core/StoreManager';
import { IProperty } from '../../types/Property';

interface IPropertyState {
  PropertyList: IProperty[];
  moduleState: string;
}

export class PropertyStore extends BaseStore<IPropertyState> {
  private static _instance: PropertyStore;

  public static getInstance(): PropertyStore {
    if (!PropertyStore._instance) {
      PropertyStore._instance = new PropertyStore();
    }
    return PropertyStore._instance;
  }

  private constructor() {
    super('PropertyList', {
      PropertyList: [],
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

  public setList(list: IProperty[]) {
    this._state.PropertyList = list;
  }

  public get getList() {
    return this._state.PropertyList;
  }

  public reset() {
    this._state.PropertyList = [];
    this._state.moduleState = '';
  }
}
