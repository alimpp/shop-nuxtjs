import { PropertyDataModel } from '../model/Property';
import {
  IPropertyFromServer,
  IPropertyResponseServer,
} from '../types/Property';

const { success, error } = useToast();

export class PropertyController extends PropertyDataModel {
  constructor() {
    super();
  }

  private propertyStore = usePropertyStore();
  private appStore = useApplicationStore();

  public getCacheData() {
    try {
      const cacheData = this.readObject();
      if (cacheData) {
        this.propertyStore.setList(cacheData);
      }
    } catch (err) {
      const textError = 'Property data caching failed';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async list() {
    try {
      this.getCacheData();
      this.propertyStore.setModuleState('loading');
      const serverResponse: IPropertyResponseServer[] =
        await this.Get('/api/propertty/all');
      const parsedProperties = this.formatter(serverResponse);
      this.propertyStore.setList(parsedProperties);
      this.saveAllItems(parsedProperties);
      if (this.propertyStore.getList.length === 0) {
        this.propertyStore.setModuleState('empty');
        return;
      }
      this.propertyStore.setModuleState('');
    } catch (err) {
      const textError = 'Failed to fetch properties';
      this.propertyStore.setModuleState(textError);
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async createProperty(body: IPropertyFromServer) {
    try {
      await this.Post('/api/propertty/add', body).then((res) => {
        success(`Property ${body.name} added`);
        this.list();
      });
    } catch (err) {
      const textError = 'add Property failed';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async editProperty(PropertyId: string, body: IPropertyFromServer) {
    try {
      await this.Patch(`/api/propertty/${PropertyId}`, body);
      success(`Property update to ${body.name}`);
      this.list();
    } catch (err) {
      const textError = 'edit Property failed';
      error(textError);
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async remove(id: string) {
    try {
      this.appStore.setLoading(
        true,
        'Remove Property',
        'Proccess for remove Property'
      );
      await this.Delete(`/api/propertty/${id}`);
      success('Property Removed');
      await this.list();
      this.appStore.resetLoading();
    } catch (err) {
      const textError = 'Property removing failed';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }
}

export const propertyController = new PropertyController();
