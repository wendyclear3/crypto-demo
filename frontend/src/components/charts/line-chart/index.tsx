import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'
import { ILineChartProps } from '../../../common/types/assets'
import moment from 'moment'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const LineChart = (props: ILineChartProps) => {
  const { data } = props

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

  const values = {
    labels: data[0].price_chart_data.map((element: any) =>
      moment(element[0]).format('DD.MM.YY')
    ),
    datasets: [
      {
        label: data[0].name.charAt(0).toUpperCase() + data[0].name.slice(1),
        data: data[0].price_chart_data.map((element: any) => element[1]),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return <Line options={options} data={values} width="100%" height="20%" />
}

export default LineChart
