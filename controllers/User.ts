import { UserDataModel } from '~/model/User';

const { success, error } = useToast();
interface IUpdateProfile {
  fristname: string;
  lastname: string;
  email: string;
}

const { goTo } = useNavigate();

class UserController extends UserDataModel {
  constructor() {
    super();
  }

  private userStore = useUserStore();

  private getCacheData() {
    const cacheUser = this.readObject();
    if (cacheUser) {
      this.userStore.setUser(cacheUser);
    }
  }

  public async requestOtp(phoneNumber: string) {
    await this.Post('/api/auth/request-otp', { phoneNumber })
      .then((res: unknown) => {
        success(`Send otp code to ${phoneNumber}`);
        this.userStore.setUserPhone(phoneNumber);
        goTo('/auth/verify-otp');
      })
      .catch((err) => {
        error(`Send otp has error please try again`);
      });
  }

  public async verifyOtp(payload: { phoneNumber: string; otp: string }) {
    await this.Post('/api/auth/verify-otp', payload)
      .then((res: unknown) => {
        const response = res as { accessToken: string };
        const tokenCookie = useCookie('token', { maxAge: 60 * 60 * 24 });
        tokenCookie.value = response.accessToken;
        success('Authenticated Success');
        goTo('/');
      })
      .catch((err) => {
        error('Otp code is invalid!');
      });
  }

  public async profile(): Promise<void> {
    this.getCacheData();
    const token = useCookie('token');
    this.userStore.setJwt(token.value ? token.value : '');
    const requestResponse = await this.Get('/api/users/profile');
    if (requestResponse) this.userStore.setAuthenticated(true);
    const user = await this.profileParsed(requestResponse);
    this.userStore.setUser(user);
  }

  async updateProfile(body: IUpdateProfile) {
    this.Patch('/api/users/update', body).then(() => {
      success('Profile Updated');
      this.profile();
    });
  }

  public logout() {
    const token = useCookie('token');
    token.value = '';
    this.clearStorage();
    goTo('/auth/login');
  }
}

export const userController = new UserController();
