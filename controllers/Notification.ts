import { NotificationDataModel } from '~/model/Notification';
import type { INotification } from '~/types/Notification';

const { success, error } = useToast();

class NotificationController extends NotificationDataModel {
  private intervalId: NodeJS.Timeout | null = null;
  private isPolling: boolean = false;

  constructor() {
    super();
  }

  private notificationStore = useNotificationStore();
  private userStore = useUserStore();

  private getCacheData() {
    try {
      const cacheData = this.readObject();
      if (cacheData) {
        this.notificationStore.setNotification(cacheData);
      }
    } catch (err) {
      const textError = 'notification data caching field';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async getNotification() {
    this.getCacheData();
    try {
      const serverResponse = await this.Get('/api/notification/list');
      const parseList: INotification[] =
        await this.notificationParsed(serverResponse);
      this.saveAllItems(parseList);
      this.notificationStore.setNotification(parseList);
      const count = parseList.filter((item: INotification) => {
        return item.seen == false;
      });
      this.notificationStore.setNotificationCount(count.length);
    } catch (err) {
      const textError = 'notification data fetching field';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  startPolling(intervalTime: number = 30000) {
    if (this.userStore.getAuthenticated) {
      if (this.isPolling) return;

      this.isPolling = true;
      this.getNotification();

      this.intervalId = setInterval(async () => {
        await this.getNotification();
      }, intervalTime);
    }
  }

  stopPolling() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isPolling = false;
    }
  }

  restartPolling(intervalTime: number = 30000) {
    this.stopPolling();
    this.startPolling(intervalTime);
  }

  isPollingActive(): boolean {
    return this.isPolling;
  }

  getPollingInterval(): number | null {
    if (!this.intervalId) return null;
    return 30000;
  }

  public async seen(id: string) {
    try {
      await this.Patch(`/api/notification/${id}`, { seen: true });
      this.getNotification();
    } catch (err) {
      const textError = 'seen field';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  destroy() {
    this.stopPolling();
  }
}

export const notificationController = new NotificationController();
