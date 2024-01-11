import React from 'react'
import { Box, TextField, Typography } from '@mui/material'
import { IPropsLogin } from '../../../common/types/auth'
import AppButton from '../../../components/app-button'
import { useStyles } from './styles'

const LoginPage: React.FC<IPropsLogin> = (props: IPropsLogin): JSX.Element => {
  const { navigate, register, errors } = props
  const classes = useStyles()
  return (
    <>
      <Typography variant="h2" textAlign="center">
        Authorization
      </Typography>
      <Typography
        variant="body1"
        marginBottom={2}
        textAlign="center"
        fontSize={20}
      >
        Enter your Email and password
      </Typography>
      <Box marginBottom={2}>
        <TextField
          error={!!errors.email}
          fullWidth={true}
          margin="normal"
          label="Email"
          variant="outlined"
          placeholder="Enter your email"
          helperText={errors.email ? `${errors.email.message}` : ''}
          {...register('email')}
        />
        <TextField
          error={!!errors.password}
          fullWidth={true}
          margin="normal"
          label="Password"
          variant="outlined"
          type="password"
          placeholder="Enter your password"
          helperText={errors.password ? `${errors.password.message}` : ''}
          {...register('password')}
        />
      </Box>
      <AppButton type="submit" variant="contained">
        Login
      </AppButton>

      <Box margin="20px 0">
        <Typography variant="body1">
          Don't have an account?
          <span
            className={classes.incitingText}
            onClick={() => navigate('/register')}
          >
            Registration
          </span>
        </Typography>
      </Box>
    </>
  )
}

export default LoginPage
