import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoginPage from './login'
import RegisterPage from './register'
import { Box } from '@mui/material'
import { instance } from '../../components/utils/axios'
import { useAppDispatch } from '../../components/utils/hook'
import { login } from '../../store/slice/auth'
import { AppErrors } from '../../common/errors'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchema, RegisterSchema } from '../../components/utils/yup'
import { useStyles } from './styles'

const AuthRootComponent: React.FC = (): JSX.Element => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const classes = useStyles()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(
      location.pathname === '/login' ? LoginSchema : RegisterSchema
    ),
  })

  const handleSubmitForm = async (data: any) => {
    console.log(data)
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
      if (data.password === data.confirmPassword) {
        try {
          const userData = {
            firstName: data.firstName,
            userName: data.userName,
            email: data.email,
            password: data.password,
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
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit(handleSubmitForm)}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          maxWidth={640}
          margin="auto"
          padding={5}
          borderRadius={5}
          boxShadow={'0px 0px 20px 0px #1900D5'}
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
              errors={errors}
              register={register}
            />
          ) : null}
        </Box>
      </form>
    </div>
  )
}

export default AuthRootComponent
