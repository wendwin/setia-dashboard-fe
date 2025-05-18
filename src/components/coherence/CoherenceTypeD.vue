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
      data: [0.489, 0.475, 0.468, 0.457, 0.448, 0.455, 0.439, 0.450, 0.437],
      borderColor: 'rgba(255, 99, 132, 1)',
      fill: false,
      tension: 0.1
    },
    {
      label: 'Negative',
      data: [0.282, 0.270, 0.289, 0.285, 0.312, 0.273, 0.286, 0.294, 0.277],
      borderColor: 'rgba(75, 192, 192, 1)',
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
