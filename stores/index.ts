import { ApplicationStore } from "./modules/ApplicationStore";
import { UserStore } from "./modules/UserStore";
import { AdminStore } from "./modules/AdminStore";

export const initializeStores = () => {
  ApplicationStore.getInstance();
  UserStore.getInstance();
  AdminStore.getInstance();
};

initializeStores();

export const useApplicationStore = () => ApplicationStore.getInstance();
export const useUserStore = () => UserStore.getInstance();
export const useAdminStore = () => AdminStore.getInstance();
