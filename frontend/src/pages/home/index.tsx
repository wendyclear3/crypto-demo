import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hook'
import { getFavoriteAssets } from '../../store/thunks/assets'
import { Box, Grid } from '@mui/material'
import { useStyles } from './styles'
import AreaChart from '../../components/charts/area-chart'
import TrendUp from '../../assets/images/chart/trend-up.svg'
import TrendDown from '../../assets/images/chart/trend-down.svg'

const Home: FC = (): JSX.Element => {
  const classes = useStyles()
  const favoriteAssets: any[] = useAppSelector(
    //массив с данными из стора, который запрашивается с коингеко
    (state: any) => state.assets.favoriteAssets
  )
  const dispatch = useAppDispatch()
  const fetchDataRef = useRef(false)
  const favoriteAssetName = useMemo(() => ['bitcoin', 'ethereum'], [])
  const filteredArray = favoriteAssets.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.name === value.name) //фильтруется и отсеиваются повторяющиеся элементы
  )

  const fetchData = useCallback(
    (data: string[]) => {
      data.forEach((element: string) => {
        dispatch(getFavoriteAssets(element))
      })
    },
    [dispatch]
  )

  useEffect(() => {
    if (fetchDataRef.current) return
    fetchDataRef.current = true
    fetchData(favoriteAssetName)
  }, [favoriteAssetName, fetchData])

  const renderFavoriteBlock = filteredArray.map((element: any) => {
    //размапили фльтрованный массив, достали цену и капитализацию
    console.log('element', element)
    const currentPrice = element.singleAsset.map(
      (element: any) => element.current_price
    )
    const currentCap = element.singleAsset.map(
      (element: any) => element.market_cap
    )
    const changePrice = element.singleAsset.map(
      (element: any) => element.price_change_percentage_24h
    )
    return (
      <Grid item lg={6} sm={6} xs={12} key={element.name}>
        <Grid container className={classes.topCardItem}>
          <Grid item lg={6} sm={6} xs={12}>
            <h3 className={classes.assetName}>{element.name}</h3>
            <div className={classes.itemDetails}>
              <h3 className={classes.cardPrice}>€{currentPrice}</h3>
              <Box
                className={
                  changePrice > 0
                    ? `${classes.priceTrend} ${classes.trendUp}`
                    : `${classes.priceTrend} ${classes.trendDown}`
                }
              >
                {changePrice > 0 ? (
                  <img src={TrendUp} alt="TrendUp" />
                ) : (
                  <img src={TrendDown} alt="TrendDown" />
                )}
                ⠀<span>{Number(changePrice).toFixed(2)}%</span>
              </Box>
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <AreaChart data={element.data} />
          </Grid>
        </Grid>
      </Grid>
    )
  })

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        {renderFavoriteBlock}
      </Grid>
    </Box>
  )
}

export default Home
