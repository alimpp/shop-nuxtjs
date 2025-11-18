import { ApplicationDataModel } from '../model/Application';

interface ApplicationStylesUpdate {
  theme?: string;
  title?: string;
  subTitle?: string;
  descrption?: string;
  text?: string;
  label?: string;
  date?: string;
}

const { success, error } = useToast();

export class ApplicationController extends ApplicationDataModel {
  constructor() {
    super();
  }

  private appStore = useApplicationStore();
  private userStore = useUserStore();
  private adminStore = useAdminStore();

  public getCacheData() {
    try {
      const cacheData = this.readObject();
      if (cacheData) {
        this.appStore._state.id = cacheData.id;
        this.appStore.setTheme(cacheData.theme);
        this.appStore.setTitleSize(cacheData.title);
        this.appStore.setSubTitleSize(cacheData.subTitle);
      }
    } catch (err) {
      const textError = 'Category data caching failed';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async getStyles(role: string): Promise<void> {
    this.getCacheData();
    if (role == 'admin') {
      if (!this.adminStore._state.admin?.id) return;
    } else {
      if (!this.userStore.getAuthenticated) return;
    }
    try {
      const requestResponse: IApplicationStyles =
        await this.Get(`/api/styles/all`);
      const format: IApplicationStyles = this.formater(requestResponse);
      this.appStore._state.id = format.id;
      this.appStore.setTheme(format.theme);
      this.appStore.setTitleSize(format.title);
      this.appStore.setSubTitleSize(format.subTitle);
      this.saveItem(this.appStore._state);
    } catch (err) {
      const textError = 'Styles data caching failed';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async updateStyle(param: ApplicationStylesUpdate): Promise<void> {
    await this.Patch(`/api/styles/${this.appStore._state.id}`, { ...param });
  }
}

export const applicationController = new ApplicationController();
