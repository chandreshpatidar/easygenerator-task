import * as Yup from 'yup';

export const passwordValidationSchema = Yup.string()
  .min(8, 'Password must be at least 8 characters long')
  .matches(/[a-zA-Z]/, 'Password must contain at least 1 letter')
  .matches(/[0-9]/, 'Password must contain at least 1 number')
  .matches(/[^a-zA-Z0-9]/, 'Password must contain at least 1 special character')
  .required('Password is required');
