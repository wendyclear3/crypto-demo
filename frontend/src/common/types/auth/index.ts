export interface IPropsLogin {
  setPassword: (value: string) => void
  setEmail: (value: string) => void
  navigate: (to: string) => void
}

export interface IPropsRegister {
  setPassword: (value: string) => void
  setEmail: (value: string) => void
  setRepeatPassword: (value: string) => void
  setFirstName: (value: string) => void
  setUserName: (value: string) => void
  navigate: (to: string) => void
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
