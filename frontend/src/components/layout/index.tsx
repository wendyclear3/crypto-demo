import React, { useEffect, useState } from 'react'
import TopBarComponent from '../top-bar'
import { Outlet, useLocation } from 'react-router-dom'
import { Box, useMediaQuery } from '@mui/material'
import SidebarComponent from '../sidebar'
import { useStyles } from './styles'
import { useAppDispatch } from '../../utils/hook'
import { getPublicUser } from '../../store/thunks/auth'

const LayoutComponent: React.FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const isNoneMobile = useMediaQuery('(min-width: 760px)')
  const classes = useStyles()

  useEffect(() => {
    dispatch(getPublicUser())
  }, [dispatch])

  return location.pathname === '/login' || location.pathname === '/register' ? (
    <>
      <Outlet />
    </>
  ) : (
    <Box
      display={isNoneMobile ? 'flex' : 'block'}
      justifyContent="space-between"
      width="100%"
      height="100%"
    >
      <SidebarComponent
        isNoneMobile={isNoneMobile}
        drawerWidth="250px"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Box className={classes.mainSection}>
        <TopBarComponent
          isNoneMobile={isNoneMobile}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <Outlet />
      </Box>
    </Box>
  )
}

export default LayoutComponent
