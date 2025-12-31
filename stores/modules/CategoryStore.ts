import { BaseStore } from "../../core/BaseStore";
import { StoreManager } from "../../core/StoreManager";
import { ICategoryResponseServer } from "../../types/Category";

interface ICategoryState {
  categoryList: ICategoryResponseServer[];
  moduleState: string;
  trashList: ICategoryResponseServer[];
}

export class CategoryStore extends BaseStore<ICategoryState> {
  private static _instance: CategoryStore;

  public static getInstance(): CategoryStore {
    if (!CategoryStore._instance) {
      CategoryStore._instance = new CategoryStore();
    }
    return CategoryStore._instance;
  }

  private constructor() {
    super("categoryList", {
      categoryList: [],
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

  public setList(list: ICategoryResponseServer[]) {
    this._state.categoryList = list;
  }

  public get getList() {
    return this._state.categoryList;
  }

  public reset() {
    this._state.categoryList = [];
    this._state.moduleState = "";
  }
}
