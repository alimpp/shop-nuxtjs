import { AddressStore } from './modules/AddressStore';
import { AdminStore } from './modules/AdminStore';
import { ApplicationStore } from './modules/ApplicationStore';
import { CategoryStore } from './modules/CategoryStore';
import { PropertyStore } from './modules/PropertyStore';
import { PropertyValueStore } from './modules/PropertyValueStore';
import { CustomersStore } from './modules/CustomersStore';
import { NotificationStore } from './modules/NotificationStore';
import { SupportStore } from './modules/SupportStore';
import { UserStore } from './modules/UserStore';

export const initializeStores = () => {
  ApplicationStore.getInstance();
  UserStore.getInstance();
  AdminStore.getInstance();
  SupportStore.getInstance();
  NotificationStore.getInstance();
  AddressStore.getInstance();
  CustomersStore.getInstance();
};

initializeStores();

export const useApplicationStore = () => ApplicationStore.getInstance();
export const useUserStore = () => UserStore.getInstance();
export const useAdminStore = () => AdminStore.getInstance();
export const useSupportStore = () => SupportStore.getInstance();
export const useNotificationStore = () => NotificationStore.getInstance();
export const useCategoryStore = () => CategoryStore.getInstance();
export const usePropertyStore = () => PropertyStore.getInstance();
export const usePropertyValueStore = () => PropertyValueStore.getInstance();
export const useAddressStore = () => AddressStore.getInstance();
export const useCustomersStore = () => CustomersStore.getInstance();
