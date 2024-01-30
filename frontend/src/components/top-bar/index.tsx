import { useStyles } from './styles'
import { AppBar, Grid, Toolbar, Typography } from '@mui/material'
import { MenuOutlined } from '@mui/icons-material'
import React from 'react'
import FlexBetween from '../flex-between'
import { ITopBarProps } from '../../common/types/top-bar'
import ThemeSwitcherComponent from '../theme-switcher'
import SearchBarComponent from '../search-bar'

const TopBarComponent: React.FC<ITopBarProps> = (
  props: ITopBarProps
): JSX.Element => {
  const classes = useStyles()
  const { isOpen, setIsOpen, isNoneMobile } = props

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar className={classes.toolbar}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item sm={3} lg={3}>
            <FlexBetween>
              <MenuOutlined
                className={classes.menuIcon}
                onClick={() => setIsOpen(!isOpen)}
              />
              <Typography variant="h4">
                Welcome, {sessionStorage.getItem('name')}
              </Typography>
            </FlexBetween>
          </Grid>
          {isNoneMobile && (
            <Grid display="flex" justifyContent="flex-end" item sm={9} lg={9}>
              <ThemeSwitcherComponent />
              <SearchBarComponent />
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default TopBarComponent
