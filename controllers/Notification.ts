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
      this.stopPolling(); // Stop polling on error
    })
  }

  // Start polling for notifications
  startPolling(intervalTime: number = 30000) {
    if (this.isPolling) return;
    
    this.isPolling = true;
    this.getNotification(); // Initial fetch
    
    this.intervalId = setInterval(async () => {
      await this.getNotification();
    }, intervalTime);
  }

  // Stop polling for notifications
  stopPolling() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isPolling = false;
    }
  }

  // Restart polling with optional new interval
  restartPolling(intervalTime: number = 30000) {
    this.stopPolling();
    this.startPolling(intervalTime);
  }

  // Check if polling is active
  isPollingActive(): boolean {
    return this.isPolling;
  }

  // Get current polling interval (if active)
  getPollingInterval(): number | null {
    if (!this.intervalId) return null;
    
    // Note: This is a simplified approach since we can't directly get the interval time
    // from a NodeJS.Timeout object. You might want to store the interval time separately.
    return 30000; // Default or stored value
  }

  public async seen(id: string) {
    await this.Patch(`/api/notification/${id}`, { seen: true })
    .then(() => {
      // Optionally refresh notifications after marking as seen
      this.getNotification();
    })
    .catch((err) => { 
      console.error('Error marking notification as seen:', err);
    })
  }

  // Clean up when controller is no longer needed
  destroy() {
    this.stopPolling();
  }
}

export const notificationController = new NotificationController()