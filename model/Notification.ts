import { BaseApp } from "../core/BaseApp";
import type { INotification } from "~/types/Notification";

const { formatDateTime, parseDate } = useDate()

export class NotificationDataModel extends BaseApp<any> {
  constructor() {
    super("notification");
  }

  async notificationParsed(apiResponse: INotification[]) {
    if (!Array.isArray(apiResponse)) {
      throw new Error("Invalid list data format");
    }

    const sortedList = [...apiResponse].sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    
    let list = []

    for(let key of sortedList) {
      const isoString = key.created_at
      const date = parseDate(isoString)
      const dateFormt = formatDateTime(date)

      const obj = {
        ...key,
        created_at: dateFormt
      }

      list.push(obj)
    }
    
    this.saveItem(list);
    return list;
  }
}
