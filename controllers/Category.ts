import { CategoryDataModel } from '../model/Category';

const { success, error } = useToast();

export class CategoryController extends CategoryDataModel {
  constructor() {
    super();
  }

  public getCacheData() {}

  public async list() {
    await this.Get('/api/category/all').then((res: any) => {
      const result = this.categoryParsed(res);
      console.log(result);
    });
  }

  public async createCategory(name: string) {
    await this.Post('/api/category/add', { name })
      .then((res) => {
        success(`Category ${name} added`);
      })
      .catch((err) => {
        error(`Add category failed`);
      });
  }
}

export const categoryController = new CategoryController();
