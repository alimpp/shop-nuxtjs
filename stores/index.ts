import { ApplicationStore } from "./modules/ApplicationStore";
import { UserStore } from "./modules/UserStore";

export const initializeStores = () => {
  ApplicationStore.getInstance();
  UserStore.getInstance();
};

initializeStores();

export const useApplicationStore = () => ApplicationStore.getInstance();
export const useUserStore = () => UserStore.getInstance();