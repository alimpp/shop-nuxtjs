import { HeroDataModel } from '../model/Hero';

const { success, error, warning } = useToast();

export class HeroController extends HeroDataModel {
  constructor() {
    super();
  }
}

export const heroController = new HeroController();
