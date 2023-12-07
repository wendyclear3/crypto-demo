export interface IPropsLogin {
  setPassword: (value: string) => void
  setEmail: (value: string) => void
}

export interface IPropsRegister {
  setPassword: (value: string) => void
  setEmail: (value: string) => void
  setRepeatPassword: (value: string) => void
  setFirstName: (value: string) => void
  setUserName: (value: string) => void
}
