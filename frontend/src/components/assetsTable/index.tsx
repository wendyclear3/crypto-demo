import React, { FC } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useStyles } from './styles'
import { ISingleAsset, ITablePriceData } from '../../common/types/assets'

const AssetsTableComponent: FC<ITablePriceData> = (
  props: ITablePriceData
): JSX.Element => {
  const { assets } = props
  const classes = useStyles()
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Changes (%)</TableCell>
            <TableCell align="right">Changes (€)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.map((element: ISingleAsset) => (
            <TableRow
              key={element.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {element.name}
              </TableCell>
              <TableCell align="right">{element.current_price}</TableCell>
              <TableCell
                align="right"
                className={
                  element.price_change_percentage_24h > 0
                    ? `${classes.priceUp}`
                    : `${classes.priceDown}`
                }
              >
                {element.price_change_percentage_24h.toFixed(2)}
              </TableCell>
              <TableCell
                align="right"
                className={
                  element.price_change_24h > 0
                    ? `${classes.priceUp}`
                    : `${classes.priceDown}`
                }
              >
                {element.price_change_24h.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AssetsTableComponent
