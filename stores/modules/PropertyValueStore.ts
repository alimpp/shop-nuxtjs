import { BaseStore } from "../../core/BaseStore";
import { StoreManager } from "../../core/StoreManager";
import { IPropertyValueResponseServer } from "../../types/PropertyValue";

interface IPropertyValueState {
  PropertyValueList: IPropertyValueResponseServer[];
  moduleState: string;
  trashList: IPropertyValueResponseServer[];
}

export class PropertyValueStore extends BaseStore<IPropertyValueState> {
  private static _instance: PropertyValueStore;

  public static getInstance(): PropertyValueStore {
    if (!PropertyValueStore._instance) {
      PropertyValueStore._instance = new PropertyValueStore();
    }
    return PropertyValueStore._instance;
  }

  private constructor() {
    super("PropertyValueList", {
      PropertyValueList: [],
      moduleState: "",
      trashList: [],
    });

    StoreManager.register(this);
  }

  public setModuleState(moduleState: string) {
    this._state.moduleState = moduleState;
  }

  get getModuleState(): string {
    return this._state.moduleState;
  }

  public setList(list: IPropertyValueResponseServer[]) {
    this._state.PropertyValueList = list;
  }

  public get getList() {
    return this._state.PropertyValueList;
  }

  public reset() {
    this._state.PropertyValueList = [];
    this._state.moduleState = "";
  }
}
