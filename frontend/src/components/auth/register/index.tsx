import React from 'react'
import { TextField, Button, Typography } from '@mui/material'
import { IPropsRegister } from '../../../common/types/auth'

const RegisterPage: React.FC<IPropsRegister> = (
  props: IPropsRegister
): JSX.Element => {
  const { navigate, register, errors } = props
  return (
    <>
      <Typography variant="h2" fontFamily="Poppins" textAlign="center">
        Registration
      </Typography>
      <Typography
        variant="body1"
        marginBottom={2}
        fontFamily="Poppins"
        textAlign="center"
      >
        Enter registration details
      </Typography>
      <TextField
        error={!!errors.firstName}
        fullWidth={true}
        margin="normal"
        label="Name"
        variant="outlined"
        placeholder="Enter your name"
        helperText={errors.firstName ? `${errors.firstName.message}` : ''}
        {...register('firstName')}
      />
      <TextField
        error={!!errors.userName}
        fullWidth={true}
        margin="normal"
        label="Username"
        variant="outlined"
        placeholder="Enter your username"
        helperText={errors.userName ? `${errors.userName.message}` : ''}
        {...register('userName')}
      />
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
      <TextField
        error={!!errors.confirmPassword}
        fullWidth={true}
        margin="normal"
        label="Password"
        variant="outlined"
        type="password"
        placeholder="Repeat your password"
        helperText={
          errors.confirmPassword ? `${errors.confirmPassword.message}` : ''
        }
        {...register('confirmPassword')}
      />
      <Button
        type="submit"
        sx={{
          fontFamily: 'Poppins',
          marginTop: 2,
          marginBottom: 2,
          width: '60%',
        }}
        variant="contained"
      >
        Register
      </Button>
      <Typography variant="body1" sx={{ fontFamily: 'Poppins' }}>
        Already have an account?
        <span className="incitingText" onClick={() => navigate('/login')}>
          Authorization
        </span>
      </Typography>
    </>
  )
}

export default RegisterPage
