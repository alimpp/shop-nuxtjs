import { navigateTo } from '#app';

export const useNavigate = () => {
  const goTo = (path: string) => {
    return navigateTo(path);
  };

  return {
    goTo,
  };
};
