import { makeStyles } from '@mui/styles'
import { tokens } from '../../theme'
import { Theme } from '@mui/material'

export const useStyles = makeStyles((theme: Theme) => {
  const colors = tokens(theme.palette.mode)
  return {
    tabHeading: {
      width: '100%',
      textAlign: 'center',
      marginBottom: '20px !important',
    },
    alertMessage: {
      width: '100%',
      textAlign: 'center',
      marginBottom: '20px !important',
    },
    checkBoxBlock: {
      width: '100%',
    },
    buttonBlock: {
      width: '100%',
      textAlign: 'center',
    },
    button: {
      marginTop: '20px !important',
      border: `1px solid ${colors.borderColor} !important`,
      borderRadius: '4px !important',
      padding: `15px !important`,
      backgroundColor: `${
        theme.palette.mode === 'light'
          ? colors.primary.DEFAULT
          : colors.primary[600]
      } !important`,
      '&:hover': {
        backgroundColor: `${colors.blue} !important`,
      },
    },
  }
})
