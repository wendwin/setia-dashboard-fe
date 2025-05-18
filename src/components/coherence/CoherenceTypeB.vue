<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const chartData = {
  labels: [2, 3, 4, 5, 6, 7, 8, 9, 10],
  datasets: [
    {
      label: 'Positive',
      data: [0.485, 0.478, 0.460, 0.470, 0.445, 0.452, 0.440, 0.448, 0.432],
      borderColor: '#17a2b8',
      fill: false,
      tension: 0.1
    },
    {
      label: 'Negative',
      data: [0.290, 0.275, 0.300, 0.282, 0.310, 0.268, 0.289, 0.295, 0.276],
      borderColor: '#6610f2',
      fill: false,
      tension: 0.1
    }
  ]
}

const chartOptions = {
  responsive: true,
  scales: {
    x: {
      title: { 
        display: true, 
        text: 'Number of Topics' 
      }
    },
    y: { 
      beginAtZero: true, 
      suggestedMax: 1.0, 
      title: { 
        display: true, 
        text: 'Coherence Score' 
      } 
    }
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function(tooltipItem) {
          return `${tooltipItem.dataset.label}: Score ${tooltipItem.raw.toFixed(3)}`
        }
      }
    },
    legend: { 
      position: 'top' 
    },
    title: {
      display: true,
      text: 'Coherence Score per Number of Topics'
    }
  },
}
</script>
