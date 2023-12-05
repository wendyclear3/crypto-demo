import React from 'react'
import { TextField, Button, Typography } from '@mui/material'

const LoginPage = (props: any) => {
  const { setPassword, setEmail } = props
  return (
    <>
      <Typography variant="h2" fontFamily="Poppins" textAlign="center">
        Authorization
      </Typography>
      <Typography
        variant="body1"
        marginBottom={2}
        fontFamily="Poppins"
        textAlign="center"
      >
        Enter your Email and password
      </Typography>
      <TextField
        fullWidth={true}
        margin="normal"
        label="Email"
        variant="outlined"
        placeholder="Enter your email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        fullWidth={true}
        margin="normal"
        label="Password"
        variant="outlined"
        type="password"
        placeholder="Enter your password"
        onChange={(event) => setPassword(event.target.value)}
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
        Login
      </Button>
      <Typography variant="body1" sx={{ fontFamily: 'Poppins' }}>
        Don't have an account?<span className="incitingText">Registration</span>
      </Typography>
    </>
  )
}

export default LoginPage
