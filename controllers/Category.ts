import { CategoryDataModel } from '../model/Category';

const { success, error } = useToast();

export class CategoryController extends CategoryDataModel {
  constructor() {
    super();
  }

  private categoryStore = useCategoryStore();
  private appStore = useApplicationStore();

  public getCacheData() {
    const cacheData = this.readObject();
    if (cacheData) {
      this.categoryStore.setList(cacheData);
    }
  }

  public async list() {
    this.getCacheData();
    await this.Get('/api/category/all').then((res: any) => {
      const result = this.categoryParsed(res);
      this.categoryStore.setList(result);
      this.saveAllItems(result);
    });
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
      const textError = 'Category removing field';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }
}

export const categoryController = new CategoryController();
