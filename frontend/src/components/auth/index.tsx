import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoginPage from './login'
import RegisterPage from './register'
import './style.scss'
import { Box } from '@mui/material'
import { instance } from '../utils/axios'
import { useAppDispatch } from '../utils/hook'
import { login } from '../../store/slice/auth'
import { AppErrors } from '../../common/errors'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchema } from '../utils/yup'
import * as yup from 'yup'

const AuthRootComponent: React.FC = (): JSX.Element => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [repeatPassword, setRepeatPassword] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [userName, setUserName] = React.useState('')
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<yup.InferType<typeof LoginSchema>>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: email,
      password: password,
    },
  })

  const handleSubmitForm = async (data: any) => {
    if (location.pathname === '/login') {
      try {
        const userData = {
          email: data.email,
          password: data.password,
        }
        const user = await instance.post('auth/login', userData)
        await dispatch(login(user.data))
        navigate('/')
      } catch (error) {
        return error
      }
    } else {
      if (password === repeatPassword) {
        try {
          const userData = {
            email,
            password,
            userName,
            firstName,
          }
          const newUser = await instance.post('auth/register', userData)
          await dispatch(login(newUser.data))
          navigate('/')
        } catch (error) {
          console.log(error)
          return error
        }
      } else {
        throw new Error(AppErrors.PasswordsDoNotMatch)
      }
    }
  }

  return (
    <div className="root">
      <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          maxWidth={640}
          margin="auto"
          padding={5}
          borderRadius={5}
          boxShadow={'5px 5px 10px #ccc'}
        >
          {location.pathname === '/login' ? (
            <LoginPage
              errors={errors}
              navigate={navigate}
              register={register}
            />
          ) : location.pathname === '/register' ? (
            <RegisterPage
              navigate={navigate}
              setEmail={setEmail}
              setPassword={setPassword}
              setRepeatPassword={setRepeatPassword}
              setFirstName={setFirstName}
              setUserName={setUserName}
            />
          ) : null}
        </Box>
      </form>
    </div>
  )
}

export default AuthRootComponent
