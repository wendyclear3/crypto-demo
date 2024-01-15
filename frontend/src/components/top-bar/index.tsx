import { useStyles } from './styles'
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'
import {
  LightMode,
  DarkMode,
  Search,
  NotificationsNone,
  MenuOutlined,
} from '@mui/icons-material'
import { ColorModeContext } from '../../theme'
import React, { useContext } from 'react'
import FlexBetween from '../flex-between'
import { ITopBarProps } from '../../common/types/top-bar'

const TopBarComponent: React.FC<ITopBarProps> = (
  props: ITopBarProps
): JSX.Element => {
  const theme = useTheme()
  const colorMode: any = useContext(ColorModeContext)
  const classes = useStyles()
  const { isOpen, setIsOpen } = props

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar className={classes.toolbar}>
        <FlexBetween>
          <MenuOutlined
            className={classes.menuIcon}
            onClick={() => setIsOpen(!isOpen)}
          />
          <Typography variant="h4">
            Welcome, {sessionStorage.getItem('name')}
          </Typography>
        </FlexBetween>
        <Box display="flex">
          <Grid className={classes.iconBlock}>
            <IconButton
              onClick={colorMode.toggleColorMode}
              className={classes.themeIcon}
            >
              {theme.palette.mode === 'dark' ? <DarkMode /> : <LightMode />}
            </IconButton>
            <IconButton>
              <NotificationsNone />
            </IconButton>
          </Grid>
          <Grid className={classes.searchBlock}>
            <IconButton className={classes.searchIcon}>
              <Search />
            </IconButton>
            <InputBase className={classes.searchInput} placeholder="Search" />
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopBarComponent
