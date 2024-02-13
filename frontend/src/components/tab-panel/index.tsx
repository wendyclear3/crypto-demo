import { FC } from 'react'
import { ITabPanelProps } from '../../common/types/tabs'
import { Box } from '@mui/material'

const TabPanel: FC<ITabPanelProps> = (props: ITabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default TabPanel
