import { NotificationDataModel } from "~/model/Notification";
import type { INotification } from "~/types/Notification";

class NotificationController extends NotificationDataModel {
  private intervalId: NodeJS.Timeout | null = null;
  private isPolling: boolean = false;
  
  constructor() {
    super()
  }

  private notificationStore = useNotificationStore()

  private getCacheData() {
    const cacheData = this.readObject();
    if (cacheData) {
      this.notificationStore.setNotification(cacheData);
    }
  }

  public async getNotification() {
    this.getCacheData()
    await this.Get('/api/notification/list')
    .then( async (res: any)=> {
      const parsedList: INotification[] = await this.notificationParsed(res)
      this.saveAllItems(parsedList)
      this.notificationStore.setNotification(parsedList)
      const count = parsedList.filter((item: INotification) => {
        return item.seen == false
      })
      this.notificationStore.setNotificationCount(count.length)
    })
    .catch((err) => { 
      console.error('Error fetching notifications:', err);
      this.stopPolling();
    })
  }

  startPolling(intervalTime: number = 30000) {
    if (this.isPolling) return;
    
    this.isPolling = true;
    this.getNotification();
    
    this.intervalId = setInterval(async () => {
      await this.getNotification();
    }, intervalTime);
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
    await this.Patch(`/api/notification/${id}`, { seen: true })
    .then(() => {
      this.getNotification();
    })
    .catch((err) => { 
      console.error('Error marking notification as seen:', err);
    })
  }

  destroy() {
    this.stopPolling();
  }
}

export const notificationController = new NotificationController()
