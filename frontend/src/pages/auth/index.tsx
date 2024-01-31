import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoginPage from './login'
import RegisterPage from './register'
import { Box } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../utils/hook'
import { AppErrors } from '../../common/errors'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchema, RegisterSchema } from '../../utils/yup'
import { useStyles } from './styles'
import { loginUser, registerUser } from '../../store/thunks/auth'

const AuthRootPage: React.FC = (): JSX.Element => {
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
  const loading = useAppSelector((state: any) => state.auth.isLoading)

  const handleSubmitForm = async (data: any) => {
    console.log(data)
    if (location.pathname === '/login') {
      try {
        await dispatch(loginUser(data))
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
          await dispatch(registerUser(userData))
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
              loading={loading}
            />
          ) : location.pathname === '/register' ? (
            <RegisterPage
              navigate={navigate}
              errors={errors}
              register={register}
              loading={loading}
            />
          ) : null}
        </Box>
      </form>
    </div>
  )
}

export default AuthRootPage
