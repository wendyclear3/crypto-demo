import React, { FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../utils/hook'
import { ISingleAsset } from '../../common/types/assets'
import {
  Alert,
  AlertColor,
  Avatar,
  Button,
  Grid,
  Snackbar,
  Typography,
} from '@mui/material'
import FlexBetween from '../../components/flex-between'
import { useStyles } from './styles'
import { createWatchListRecord } from '../../store/thunks/assets'

const SingleAssetPage: FC = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)
  const [severity, setSeverity] = useState<AlertColor>('success')
  const navigate = useNavigate()
  const classes = useStyles()
  const { id } = useParams() //получаем данные из url //достаем сущность id
  const dispatch = useAppDispatch()
  const assetsArray: ISingleAsset[] = useAppSelector(
    (state) => state.assets.assets
  )

  const asset = assetsArray.find(
    (element: ISingleAsset) => element.name === (id as string)
  )

  const handleCreateRecord = () => {
    try {
      const data = {
        name: '',
        assetId: '',
      }
      if (asset) {
        data.name = asset.name
        data.assetId = asset.id
      }
      dispatch(createWatchListRecord(data))
      setError(false)
      setSeverity('success')
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 2000)
    } catch (error) {
      setError(true)
      setSeverity('error')
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 2000)
    }
  }

  return (
    <>
      {asset && (
        <Grid container className={classes.root}>
          <Grid item xs={12} className={classes.assetName}>
            <Typography variant="h3">{asset.name}</Typography>
          </Grid>
          <Grid item sm={6} xs={12} className={classes.card}>
            <Grid className={classes.cardItem}>
              <FlexBetween>
                <Avatar src={asset.image} className={classes.assetIcon} />
                <Typography variant="h3" className={classes.assetSymbol}>
                  {asset.symbol.toUpperCase()}
                </Typography>
              </FlexBetween>
            </Grid>
          </Grid>
          <Grid item sm={6} xs={12} className={classes.card}>
            <Grid className={classes.cardItem}>
              <FlexBetween>
                <Typography variant="h3" className={classes.cardTitle}>
                  Price:
                </Typography>
                <Typography variant="h3" className={classes.assetPrice}>
                  €{asset.current_price}
                </Typography>
              </FlexBetween>
            </Grid>
          </Grid>
          <Grid item sm={6} xs={12} className={classes.card}>
            <Grid container className={classes.cardItem}>
              <Typography variant="h3" className={classes.cardTitle}>
                Price change (%):
              </Typography>
              <Typography
                variant="h3"
                className={
                  asset.price_change_percentage_24h >= 0
                    ? `${classes.assetPriceDetail} ${classes.trendUp}`
                    : `${classes.assetPriceDetail} ${classes.trendDown}`
                }
              >
                {asset.price_change_percentage_24h.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
          <Grid item sm={6} xs={12} className={classes.card}>
            <Grid className={classes.cardItem}>
              <Typography variant="h3" className={classes.cardTitle}>
                Price change (€):
              </Typography>
              <Typography
                variant="h3"
                className={
                  asset.price_change_24h >= 0
                    ? `${classes.assetPriceDetail} ${classes.trendUp}`
                    : `${classes.assetPriceDetail} ${classes.trendDown}`
                }
              >
                {asset.price_change_24h.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            className={classes.cardButtonBlock}
          >
            <Button
              variant="contained"
              className={classes.cardButton}
              onClick={() => navigate(-1)}
            >
              Go back
            </Button>
            <Button
              variant="contained"
              className={classes.cardButton}
              onClick={handleCreateRecord}
            >
              Add to Watchlist
            </Button>
          </Grid>
          <Snackbar open={open} autoHideDuration={6000}>
            <Alert severity={severity} sx={{ width: '100%' }}>
              {!error ? 'Success!' : 'Ooops'}
            </Alert>
          </Snackbar>
        </Grid>
      )}
    </>
  )
}

export default SingleAssetPage
