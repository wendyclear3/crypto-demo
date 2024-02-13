import { makeStyles } from '@mui/styles'
import { tokens } from '../../theme'
import { Theme } from '@mui/material'

export const useStyles = makeStyles((theme: Theme) => {
  const colors = tokens(theme.palette.mode)
  return {
    root: {
      backgroundColor: `${
        theme.palette.mode === 'light'
          ? colors.primary.DEFAULT
          : colors.primary[600]
      }`,
      padding: '20px 16px',
      marginBottom: 32,
      minHeight: 270,
      border: `1px solid ${colors.borderColor}`,
      borderRadius: 12,
      '& .MuiPaper-root': {
        backgroundColor: 'transparent !important',
        boxShadow: 'none !important',
        backgroundImage: 'none !important',
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: colors.blue,
        },
      },
      '& label.Mui-focused': {
        color: `${
          theme.palette.mode === 'dark'
            ? colors.white.DEFAULT
            : colors.black.DEFAULT
        }`,
      },
    },
    formWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px 0',
    },
    inputField: {
      width: '30%',
      marginBottom: '15px !important',
    },
    buttonBlock: {
      marginTop: 32,
      minWidth: '250px',
      marginLeft: '110px',
    },
  }
})
