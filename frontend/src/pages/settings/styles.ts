import { makeStyles } from '@mui/styles'
import { tokens } from '../../theme'
import { Theme } from '@mui/material'

export const useStyles = makeStyles((theme: Theme) => {
  const colors = tokens(theme.palette.mode)
  return {
    root: {
      padding: 32,
    },
    tabsWrapper: {
      borderBottom: `1px solid ${colors.borderColor}`,
    },
  }
})
