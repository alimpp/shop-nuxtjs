import { CategoryDataModel } from "../model/Category";
import {
  ICategoryFromServer,
  ICategoryResponseServer,
} from "../types/Category";

const { success, error } = useToast();

export class CategoryController extends CategoryDataModel {
  constructor() {
    super();
  }

  private categoryStore = useCategoryStore();
  private appStore = useApplicationStore();

  public getCacheData() {
    try {
      const cacheData = this.readObject();
      if (cacheData) {
        this.categoryStore.setList(cacheData);
      }
    } catch (err) {
      const textError = "Category data caching failed";
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async list() {
    try {
      this.getCacheData();
      this.categoryStore.setModuleState("loading");
      const serverResponse: ICategoryResponseServer[] = await this.Get(
        "/api/category/all"
      );
      const parsedCategories = this.formatter(serverResponse);
      this.categoryStore.setList(parsedCategories);
      this.saveAllItems(parsedCategories);
      if (this.categoryStore.getList.length === 0) {
        this.categoryStore.setModuleState("empty");
        return;
      }
      this.categoryStore.setModuleState("");
    } catch (err) {
      const textError = "Failed to fetch categories";
      this.categoryStore.setModuleState(textError);
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async trashList() {
    try {
      const serverResponse: ICategoryResponseServer[] = await this.Get(
        "/api/category/trash"
      );
      const parsedCategory = this.formatter(serverResponse);
      this.categoryStore._state.trashList = parsedCategory;
    } catch (err) {
      const textError = "Failed to fetch trash Category";
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async createCategory(body: ICategoryFromServer) {
    try {
      await this.Post("/api/category/add", body).then((res) => {
        success(`Category ${body.name} added`);
        this.list();
      });
    } catch (err) {
      const textError = "add category failed";
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async editCategory(categoryId: string, body: ICategoryFromServer) {
    try {
      await this.Patch(`/api/category/${categoryId}`, body);
      this.list();
    } catch (err) {
      const textError = "edit category failed";
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async remove(id: string) {
    try {
      this.appStore.setLoading(
        true,
        "Remove category",
        "Proccess for remove category"
      );
      await this.Delete(`/api/category/${id}`);
      success("Category Removed");
      await this.list();
      this.appStore.resetLoading();
    } catch (err) {
      const textError = "Category removing failed";
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async trashCategory(categoryId: string, trash: boolean) {
    try {
      const result = this.categoryStore._state.categoryList.find(
        (item: ICategoryResponseServer) => {
          return item.id == categoryId;
        }
      );
      result.loading = true;
      const response: { success: boolean; message: string } = await this.Patch(
        `/api/category/trash/${categoryId}`,
        { trash }
      );
      if (response?.success)
        this.categoryStore._state.categoryList =
          this.categoryStore._state.categoryList.filter(
            (item: ICategoryResponseServer) => {
              return item?.id != categoryId;
            }
          );
      success(`Category moved to trash`);
      result.loading = false;
    } catch (err) {
      const textError = "trash Category failed";
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async restoreCategory(categoryId: string, trash: boolean) {
    try {
      const result = this.categoryStore._state.trashList.find(
        (item: ICategoryResponseServer) => {
          return item.id == categoryId;
        }
      );
      result.loading = true;
      result.trash = false;
      const response: { success: boolean; message: string } = await this.Patch(
        `/api/category/trash/${categoryId}`,
        { trash }
      );
      if (response?.success)
        this.categoryStore._state.trashList =
          this.categoryStore._state.trashList.filter(
            (item: ICategoryResponseServer) => {
              return item?.id != categoryId;
            }
          );
      this.categoryStore._state.categoryList.push(result);
      success(`Category Restored`);
      result.loading = false;
    } catch (err) {
      const textError = "restore category failed";
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }
}

export const categoryController = new CategoryController();
