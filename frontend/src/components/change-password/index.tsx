import { Grid, Box, TextField } from '@mui/material'
import React, { FC, useState } from 'react'
import AppLoadingButton from '../loading-button'
import { useStyles } from './styles'
import { useAppDispatch } from '../../utils/hook'
import { updateUserPassword } from '../../store/thunks/auth'

const ChangePasswordComponent: FC = (): JSX.Element => {
  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const classes = useStyles()
  const dispatch = useAppDispatch()

  const handleChangePassword = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const data = {
      oldPassword,
      newPassword,
    }
    dispatch(updateUserPassword(data))
  }

  return (
    <Grid
      component="form"
      noValidate
      autoComplete="off"
      className={classes.root}
      onSubmit={handleChangePassword}
    >
      <Box className={classes.formWrapper}>
        <TextField
          className={classes.inputField}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          type="text"
          label="Old Password"
          variant="outlined"
        />
        <TextField
          className={classes.inputField}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type="text"
          label="New Password"
          variant="outlined"
        />
        <Box className={classes.buttonBlock}>
          <AppLoadingButton type="submit">Change Password</AppLoadingButton>
        </Box>
      </Box>
    </Grid>
  )
}

export default ChangePasswordComponent
