import { BaseStore } from "../../core/BaseStore";
import { StoreManager } from "../../core/StoreManager";
import type { INotification } from "~/types/Notification";

interface INotificationState {
  notification: INotification[];
  notificationCount: number;
  moduleState: string;
}

export class NotificationStore extends BaseStore<INotificationState> {
  private static _instance: NotificationStore;

  public static getInstance(): NotificationStore {
    if (!NotificationStore._instance) {
      NotificationStore._instance = new NotificationStore();
    }
    return NotificationStore._instance;
  }

  private constructor() {
    super("notification", {
      notification: [],
      notificationCount: 0,
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

  public setNotification(list: INotification[]) {
    this._state.notification = list
  }

  public get getNotification() {
    return this._state.notification
  }

  public setNotificationCount(count: number) {
    this._state.notificationCount = count
  }

  public get getNotificationCount() {
    return this._state.notificationCount
  }

  public reset() {
    this._state.notification = []
    this._state.notificationCount = 0
    this._state.moduleState = ""
  }

}
