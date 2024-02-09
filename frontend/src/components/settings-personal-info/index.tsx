import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hook'
import { Box, Grid, TextField } from '@mui/material'
import { useStyles } from './styles'
import AppLoadingButton from '../loading-button'
import { updateUserInfo } from '../../store/thunks/auth'

const SettingsPersonalInfoComponent = () => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const { user } = useAppSelector((state: any) => state.auth.user)

  useEffect(() => {
    user && setName(user.firstName)
    console.log(user)
    setUserName(user.userName)
    setEmail(user.email)
  }, [user])

  const classes = useStyles()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const data = {
      firstName: name,
      userName: userName,
      email: email,
    }
    dispatch(updateUserInfo(data))
  }

  return (
    <Grid
      component="form"
      noValidate
      autoComplete="off"
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <Box className={classes.formWrapper}>
        <TextField
          className={classes.inputField}
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          label="Name"
          variant="outlined"
        />
        <TextField
          className={classes.inputField}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          label="Username"
          variant="outlined"
        />
        <TextField
          className={classes.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          label="Email"
          variant="outlined"
        />
        <Box className={classes.buttonBlock}>
          <AppLoadingButton type="submit">Save</AppLoadingButton>
        </Box>
      </Box>
    </Grid>
  )
}

export default SettingsPersonalInfoComponent
