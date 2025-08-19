import { ApplicationStore } from "./modules/ApplicationStore";
import { UserStore } from "./modules/UserStore";
import { AdminStore } from "./modules/AdminStore";
import { SupportStore } from "./modules/SupportStore"
import { NotificationStore } from "./modules/NotificationStore"

export const initializeStores = () => {
  ApplicationStore.getInstance();
  UserStore.getInstance();
  AdminStore.getInstance();
  SupportStore.getInstance();
  NotificationStore.getInstance();
};

initializeStores();

export const useApplicationStore = () => ApplicationStore.getInstance();
export const useUserStore = () => UserStore.getInstance();
export const useAdminStore = () => AdminStore.getInstance();
export const useSupportStore = () => SupportStore.getInstance();
export const useNotificationStore = () => NotificationStore.getInstance();
