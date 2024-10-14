import { passwordValidationSchema } from '@/lib/constants/validationSchema';
import * as Yup from 'yup';

export const signupFormValidation = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: passwordValidationSchema,
});
