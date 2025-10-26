import { CategoryDataModel } from '../model/Category';
import { ICategory } from '../types/Category';

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
      const textError = 'Category data caching failed';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async list() {
    try {
      this.getCacheData();
      this.categoryStore.setModuleState('loading');
      const serverResponse: ICategory[] = await this.Get('/api/category/all');
      const parsedCategories = this.categoryParsed(serverResponse);
      this.categoryStore.setList(parsedCategories);
      this.saveAllItems(parsedCategories);
      if (this.categoryStore.getList.length === 0) {
        this.categoryStore.setModuleState('empty');
        return;
      }
      this.categoryStore.setModuleState('');
    } catch (err) {
      const textError = 'Failed to fetch categories';
      this.categoryStore.setModuleState(textError);
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async createCategory(name: string) {
    await this.Post('/api/category/add', { name })
      .then((res) => {
        success(`Category ${name} added`);
        this.list();
      })
      .catch((err) => {
        error(`Add category failed`);
      });
  }

  public async remove(id: string) {
    try {
      this.appStore.setLoading(
        true,
        'Remove category',
        'Proccess for remove category'
      );
      await this.Delete(`/api/category/${id}`);
      success('Category Removed');
      await this.list();
    } catch (err) {
      const textError = 'Category removing failed';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }
}

export const categoryController = new CategoryController();
