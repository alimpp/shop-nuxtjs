export interface ICategoryResponseServer {
  id: string;
  name: string;
  submiter: string;
  created_at: string;
  imageId: string;
  iconId: string;
  preViewImage: string;
  preViewIcon: string;
}

export interface ICategoryFromServer {
  name?: string;
  imageId?: string;
  iconId?: string;
}
