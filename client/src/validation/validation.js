import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .required('Required')
});

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required')
});

export const contactValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  phone: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  avatar: Yup.number(),
  gender: Yup.string()
    .required('Required'),
  status: Yup.string()
    .required('Required'),
  favorite: Yup.boolean()
});

export const statusValidationSchema = Yup.object().shape({
  statusName: Yup.string()
    .min(2, 'Status name must be at least 2 characters')
    .max(20, 'Status name must be less than 20 characters')
    .required('Status name is required'),
  bg: Yup.string()
    .required('Color is required')
});
