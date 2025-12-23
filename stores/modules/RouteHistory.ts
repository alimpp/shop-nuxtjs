import { BaseStore } from '../../core/BaseStore';
import { StoreManager } from '../../core/StoreManager';
import type { IRouteHistory } from '../../types/RouteHistory';

import { routes } from '../../consts/Routes';

interface IRouteHistoryState {
  routeHistory: IRouteHistory[];
  moduleState: string;
}

export class RouteHistoryStore extends BaseStore<IRouteHistoryState> {
  private static _instance: RouteHistoryStore;

  public static getInstance(): RouteHistoryStore {
    if (!RouteHistoryStore._instance) {
      RouteHistoryStore._instance = new RouteHistoryStore();
    }
    return RouteHistoryStore._instance;
  }

  private constructor() {
    super('routeHistory', {
      routeHistory: [],
      moduleState: '',
    });

    StoreManager.register(this);
  }

  get getModuleState(): string {
    return this._state.moduleState;
  }

  public setModuleState(moduleState: string) {
    this._state.moduleState = moduleState;
  }

  get history(): IRouteHistory[] {
    return this._state.routeHistory;
  }

  addHistory(path: string) {
    const history: IRouteHistory | any = routes.find((item) => {
      return item.path == path;
    });
    const target = this._state.routeHistory.find((item) => {
      return item.path == history?.path;
    });
    if (target) return;
    else this._state.routeHistory.push(history);
  }

  removeHistory(path: string) {
    this._state.routeHistory = this._state.routeHistory.filter((item) => {
      return item.path != path;
    });
  }

  public reset() {
    this._state.routeHistory = [];
    this._state.moduleState = '';
  }
}
