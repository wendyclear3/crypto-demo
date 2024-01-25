import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hook'
import { getFavoriteAssets } from '../../store/thunks/assets'
import { Box, Grid } from '@mui/material'
import { useStyles } from './styles'
import AreaChart from '../../components/charts/area-chart'
import TrendUp from '../../assets/images/chart/trend-up.svg'
import TrendDown from '../../assets/images/chart/trend-down.svg'
import LineChart from '../../components/charts/line-chart'
import { IChartData, ISingleAsset } from '../../common/types/assets'

const Home: FC = (): JSX.Element => {
  const classes = useStyles()
  const favoriteAssets: IChartData[] = useAppSelector(
    //массив с данными из стора, который запрашивается с коингеко
    (state) => state.assets.favoriteAssets
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

  const renderFavoriteBlock = filteredArray.map((element: IChartData) => {
    //размапили фльтрованный массив, достали цену и капитализацию
    console.log('element', element)
    let currentPrice = 0
    let changePrice = 0
    element.singleAsset.forEach((element: ISingleAsset) => {
      currentPrice = element.current_price
      changePrice = element.price_change_percentage_24h
    })
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
            <AreaChart data={element.price_chart_data} />
          </Grid>
        </Grid>
      </Grid>
    )
  })

  return (
    <Box className={classes.root}>
      <Grid container spacing={2} className={classes.areaChart}>
        {renderFavoriteBlock}
      </Grid>
      <Grid container className={classes.lineChartBlock}>
        <Grid item xs={12} sm={12} lg={12}>
          {filteredArray.length && <LineChart data={filteredArray} />}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home
