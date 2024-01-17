import { faker } from '@faker-js/faker'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ScriptableContext,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)
const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

const data = {
  labels,
  datasets: [
    {
      label: 'Pidor',
      data: labels.map(() => faker.datatype.number({})),
      borderColor: 'rgb(25, 0, 213)',
      fill: 'start',
      backGroundColor: (context: ScriptableContext<'line'>) => {
        const ctx = context.chart.ctx
        const gradient = ctx.createLinearGradient(0, 0, 0, 180)
        gradient.addColorStop(0, '#C1EF00')
        gradient.addColorStop(1, '#232323')
        return gradient
      },
    },
  ],
}

const AreaChart = () => {
  return <Line options={options} data={data} />
}

export default AreaChart
