import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { tokens } from '../../theme'

export const useStyles = makeStyles((theme: Theme) => {
  const colors = tokens(theme.palette.mode)
  return {
    searchBlock: {
      display: 'flex',
      maxHeight: '45px',
      borderRadius: '8px',
      backgroundColor: `${colors.primary[600]}`,
    },
    searchIcon: {
      '&:hover': {
        backgroundColor: 'transparent !important',
      },
    },
    searchInput: {
      padding: '18px 12px',
    },
  }
})
