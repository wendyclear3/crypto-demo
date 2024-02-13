import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
  useTheme,
} from '@mui/material'
import { useStyles } from './styles'
import { useAppDispatch, useAppSelector } from '../../utils/hook'
import { tokens } from '../../theme'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteUser } from '../../store/thunks/auth'

const DeleteUserComponent: FC = (): JSX.Element => {
  const [checked, setChecked] = useState(false)
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { user } = useAppSelector((state: any) => state.auth.user)
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    dispatch(deleteUser())
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('name')
    navigate('/login')
  }

  return (
    <Grid container>
      <Grid item className={classes.tabHeading}>
        <Typography variant="h2">Delete Profile</Typography>
      </Grid>
      <Grid item className={classes.alertMessage}>
        <Typography variant="body1">
          Dear {user ? `${user.firstName}` : 'User'}! By deleting your account
          you will delete all personal information. After this action, all the
          information you saved will be unaccessible!
        </Typography>
      </Grid>
      <Grid item className={classes.checkBoxBlock}>
        <FormGroup>
          <FormControlLabel
            sx={{ justifyContent: 'center' }}
            control={
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
                sx={{
                  color: `${colors.blue}`,
                  '&.Mui-checked': {
                    color: `${colors.blue}`,
                  },
                }}
              />
            }
            label="I agree"
          />
        </FormGroup>
      </Grid>
      <Grid item className={classes.buttonBlock}>
        <Button
          onClick={handleDelete}
          disabled={!checked}
          className={classes.button}
          variant="contained"
        >
          Delete Profile
        </Button>
      </Grid>
    </Grid>
  )
}

export default DeleteUserComponent
