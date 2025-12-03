import { PropertyValueDataModel } from '../model/PropertyValue';
import {
  IPropertyValueFromServer,
  IPropertyValueResponseServer,
} from '../types/PropertyValue';

const { success, error } = useToast();

export class PropertyValueController extends PropertyValueDataModel {
  constructor() {
    super();
  }

  private propertyValueStore = usePropertyValueStore();
  private appStore = useApplicationStore();

  public getCacheData() {
    try {
      const cacheData = this.readObject();
      if (cacheData) {
        this.propertyValueStore.setList(cacheData);
      }
    } catch (err) {
      const textError = 'PropertyValue data caching failed';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async list() {
    try {
      this.getCacheData();
      this.propertyValueStore.setModuleState('loading');
      const serverResponse: IPropertyValueResponseServer[] =
        await this.Get('/api/propertty-value/all');
      const parsedProperties = this.formatter(serverResponse);
      this.propertyValueStore.setList(parsedProperties);
      this.saveAllItems(parsedProperties);
      if (this.propertyValueStore.getList.length === 0) {
        this.propertyValueStore.setModuleState('empty');
        return;
      }
      this.propertyValueStore.setModuleState('');
    } catch (err) {
      const textError = 'Failed to fetch properties';
      this.propertyValueStore.setModuleState(textError);
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async createPropertyValue(body: IPropertyValueFromServer) {
    try {
      await this.Post('/api/propertty-value/add', body).then((res) => {
        success(`PropertyValue ${body.name} added`);
        this.list();
      });
    } catch (err) {
      const textError = 'add PropertyValue failed';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async editPropertyValue(PropertyValueId: string, body: IPropertyValueFromServer) {
    try {
      await this.Patch(`/api/propertty-value/${PropertyValueId}`, body);
      success(`PropertyValue update to ${body.name}`);
      this.list();
    } catch (err) {
      const textError = 'edit PropertyValue failed';
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
        'Remove PropertyValue',
        'Proccess for remove PropertyValue'
      );
      await this.Delete(`/api/propertty-value/${id}`);
      success('PropertyValue Removed');
      await this.list();
      this.appStore.resetLoading();
    } catch (err) {
      const textError = 'PropertyValue removing failed';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }
}

export const propertyValueController = new PropertyValueController();
