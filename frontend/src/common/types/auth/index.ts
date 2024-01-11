import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

export interface IPropsLogin<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
> {
  navigate: (to: string) => void
  register: UseFormRegister<any>
  errors: FieldErrors<TFieldValues>
}

export interface IPropsRegister<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
> {
  navigate: (to: string) => void
  register: UseFormRegister<any>
  errors: FieldErrors<TFieldValues>
}

export interface IAuthState {
  user: iPublicUser
  isLogged: boolean
}

export interface iPublicUser {
  id: number | null
  firstName: string
  userName: string
  email: string
  createdAt: string
  updatedAt: string
  watchList: [IWatchList]
}

export interface IWatchList {
  id: number | null
  name: string
  assetId: string
  createdAt: string
  updatedAt: string
  user: number | null
}
