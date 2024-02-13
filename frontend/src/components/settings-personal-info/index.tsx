import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hook'
import { Box, Grid, TextField } from '@mui/material'
import { useStyles } from './styles'
import AppLoadingButton from '../loading-button'
import { getPublicUser, updateUserInfo } from '../../store/thunks/auth'

const SettingsPersonalInfoComponent: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const { user } = useAppSelector((state: any) => state.auth.user)
  // console.log('payload: ', user)

  useEffect(() => {
    if (user) {
      setName(user.firstName)
      setUserName(user.userName)
      setEmail(user.email)
    }
  }, [user])

  const classes = useStyles()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const data = {
      firstName: name,
      userName: userName,
      email: email,
    }
    await dispatch(updateUserInfo(data))
    await dispatch(getPublicUser())
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
