import { BaseStore } from "../../core/BaseStore";
import { StoreManager } from "../../core/StoreManager";
import { IPropertyResponseServer } from "../../types/Property";

interface IPropertyState {
  propertyList: IPropertyResponseServer[];
  trashList: IPropertyResponseServer[];
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
    super("propertyList", {
      propertyList: [],
      trashList: [],
      moduleState: "",
    });

    StoreManager.register(this);
  }

  public setModuleState(moduleState: string) {
    this._state.moduleState = moduleState;
  }

  get getModuleState(): string {
    return this._state.moduleState;
  }

  public setList(list: IPropertyResponseServer[]) {
    this._state.propertyList = list;
  }

  public get getList() {
    return this._state.propertyList;
  }

  public reset() {
    this._state.propertyList = [];
    this._state.moduleState = "";
  }
}
