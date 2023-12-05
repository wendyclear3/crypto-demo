import React from 'react'
import { useLocation } from 'react-router-dom'
import LoginPage from './login'
import RegisterPage from './register'
import './style.scss'
import { Box } from '@mui/material'

const AuthRootComponent = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const location = useLocation()

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
  }

  return (
    <div className="root">
      <form className="form" onSubmit={handleSubmit}>
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
            <LoginPage setEmail={setEmail} setPassword={setPassword} />
          ) : location.pathname === '/register' ? (
            <RegisterPage />
          ) : null}
        </Box>
      </form>
    </div>
  )
}

export default AuthRootComponent
