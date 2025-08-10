export const useValidations = () => {

  const validEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const validEmpty = (input: string): boolean => {
    const length = input.length;
    return length == 0 ? false : true
  }

  const validLength = (
    input: string,
    minLength: number,
    maxLength: number
  ): { isValid: boolean; message?: string } => {
    const length = input.length;
    if (length < minLength) {
      return {
        isValid: false,
        message: `The length must be at least ${minLength} characters.`,
      };
    }
    if (length > maxLength) {
      return {
        isValid: false,
        message: `The length cannot exceed ${maxLength} characters.`,
      };
    }
    return { isValid: true, message: '' };
  }

  return { validEmail, validEmpty, validLength }

}