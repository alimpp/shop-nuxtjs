import { PropertyValueDataModel } from "../model/PropertyValue";
import {
  IPropertyValueFromServer,
  IPropertyValueResponseServer,
} from "../types/PropertyValue";

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
      const textError = "PropertyValue data caching failed";
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async list() {
    try {
      this.getCacheData();
      this.propertyValueStore.setModuleState("loading");
      const serverResponse: IPropertyValueResponseServer[] = await this.Get(
        "/api/propertty-value/all"
      );
      const parsedProperties = this.formatter(serverResponse);
      this.propertyValueStore.setList(parsedProperties);
      this.saveAllItems(parsedProperties);
      if (this.propertyValueStore.getList.length === 0) {
        this.propertyValueStore.setModuleState("empty");
        return;
      }
      this.propertyValueStore.setModuleState("");
    } catch (err) {
      const textError = "Failed to fetch Property Value";
      this.propertyValueStore.setModuleState(textError);
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async trashList() {
    try {
      const serverResponse: IPropertyValueResponseServer[] = await this.Get(
        "/api/propertty-value/trash"
      );
      const parsedProperties = this.formatter(serverResponse);
      this.propertyValueStore._state.trashList = parsedProperties;
    } catch (err) {
      const textError = "Failed to fetch trash property values";
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async createPropertyValue(body: IPropertyValueFromServer) {
    try {
      await this.Post("/api/propertty-value/add", body).then((res) => {
        success(`PropertyValue ${body.name} added`);
        this.list();
      });
    } catch (err) {
      const textError = "add Property Value failed";
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async editPropertyValue(
    PropertyValueId: string,
    body: IPropertyValueFromServer
  ) {
    try {
      const result = this.propertyValueStore._state.PropertyValueList.find(
        (item: IPropertyValueResponseServer) => {
          return item.id == PropertyValueId;
        }
      );
      result.loading = true;
      const response: { success: boolean; message: string } = await this.Patch(
        `/api/propertty-value/${PropertyValueId}`,
        body
      );
      success(`PropertyValue updated to ${body.name}`);
      this.list();
    } catch (err) {
      const textError = "edit Property Value failed";
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
        "Remove PropertyValue",
        "Proccess for remove Property Value"
      );
      const result = this.propertyValueStore._state.PropertyValueList.find(
        (item: IPropertyValueResponseServer) => {
          return item.id == id;
        }
      );
      result.loading = true;
      const response: { success: boolean; message: string } = await this.Delete(
        `/api/propertty-value/${id}`
      );
      if (response?.success)
        this.propertyValueStore._state.PropertyValueList =
          this.propertyValueStore._state.PropertyValueList.filter(
            (item: IPropertyValueResponseServer) => {
              return item.id != id;
            }
          );
      success("PropertyValue Removed");
      this.appStore.resetLoading();
    } catch (err) {
      const textError = "Property Value removing failed";
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async trashPropertyValue(PropertyValueId: string, trash: boolean) {
    try {
      const result = this.propertyValueStore._state.PropertyValueList.find(
        (item: IPropertyValueResponseServer) => {
          return item.id == PropertyValueId;
        }
      );
      result.loading = true;
      const response: { success: boolean; message: string } = await this.Patch(
        `/api/propertty-value/trash/${PropertyValueId}`,
        { trash }
      );

      if (response?.success)
        this.propertyValueStore._state.PropertyValueList =
          this.propertyValueStore._state.PropertyValueList.filter(
            (item: IPropertyValueResponseServer) => {
              return item?.id != PropertyValueId;
            }
          );
      success(`Property value move to trash`);
      result.loading = false;
    } catch (err) {
      const textError = "trash Property value failed";
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async restorePropertyValue(PropertyValueId: string, trash: boolean) {
    try {
      const result = this.propertyValueStore._state.trashList.find(
        (item: IPropertyValueResponseServer) => {
          return item.id == PropertyValueId;
        }
      );
      result.loading = true;
      result.trash = false;
      const response: { success: boolean; message: string } = await this.Patch(
        `/api/propertty-value/trash/${PropertyValueId}`,
        { trash }
      );
      if (response?.success)
        this.propertyValueStore._state.trashList =
          this.propertyValueStore._state.trashList.filter(
            (item: IPropertyValueResponseServer) => {
              return item?.id != PropertyValueId;
            }
          );
      this.propertyValueStore._state.propertyValueList.push(result);

      success(`Property value Restored`);
      result.loading = false;
    } catch (err) {
      const textError = "restore Property value failed";
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }
}

export const propertyValueController = new PropertyValueController();
