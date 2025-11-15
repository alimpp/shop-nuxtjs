export interface ICategory {
  id: string;
  name: string;
  submiter: string;
  created_at: string;
  imageId: string;
  iconId: string;
  preViewImage: string;
  preViewIcon: string;
}

export interface IAddBody {
  name: string;
  imageId: string;
  iconId: string;
}
