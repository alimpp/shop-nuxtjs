export interface IHeroResponseServer {
  id: string;
  imageId: string;
  title: string;
  subTitle: string;
  descrption: string;
  redirect: string;
  active: boolean;
  created_at: string | Date;
}

export interface IHeroFromServer {
  imageId?: string;
  title?: string;
  subTitle?: string;
  descrption?: string;
  redirect?: string;
  active?: boolean;
}
