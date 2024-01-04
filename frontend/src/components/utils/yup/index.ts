import * as yup from 'yup'
import { AppErrors } from '../../../common/errors'

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email(AppErrors.InvalidEmail)
    .required(AppErrors.RequiredFiled),
  password: yup
    .string()
    .min(4, AppErrors.MinLength)
    .required(AppErrors.RequiredFiled)
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!@#$%&?]{4,20}$/,
      AppErrors.InvalidPassword
    ),
})
