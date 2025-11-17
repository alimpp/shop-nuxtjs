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

  public async getStyles(role: string): Promise<void> {
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
      console.log(this.appStore._state.id);

      this.appStore.setTheme(format.theme);
      this.appStore.setTitleSize(format.title);
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
