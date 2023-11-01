import React from 'react'
import { TextField, Button, Typography } from '@mui/material'

const RegisterPage = () => {
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
        fullWidth={true}
        margin="normal"
        label="Name"
        variant="outlined"
        placeholder="Enter your name"
      />
      <TextField
        fullWidth={true}
        margin="normal"
        label="Username"
        variant="outlined"
        placeholder="Enter your username"
      />
      <TextField
        fullWidth={true}
        margin="normal"
        label="Email"
        variant="outlined"
        placeholder="Enter your email"
      />
      <TextField
        fullWidth={true}
        margin="normal"
        label="Password"
        variant="outlined"
        type="password"
        placeholder="Enter your password"
      />
      <TextField
        fullWidth={true}
        margin="normal"
        label="Password"
        variant="outlined"
        type="password"
        placeholder="Repeat your password"
      />
      <Button
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
        <span className="incitingText">Authorization</span>
      </Typography>
    </>
  )
}

export default RegisterPage
