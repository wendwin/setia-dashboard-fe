<template>
  <div class="w-64 h-64 mx-auto">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const chartData = {
  labels: ['Positif', 'Negatif'],
  datasets: [
    {
      data: [3054, 944],
      backgroundColor: ['#fd7e14', '#ffe5d0'],
      borderColor: ['#fd7e14', '#ffe5d0'],
      borderWidth: 1
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          const value = tooltipItem.raw
          const total = tooltipItem.dataset.data.reduce((acc, cur) => acc + cur, 0)
          const percentage = ((value / total) * 100).toFixed(2)
          return `${tooltipItem.label}: ${value} (${percentage}%)`
        }
      }
    }
  }
}
</script>
