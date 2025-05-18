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
      data: [0.502, 0.489, 0.472, 0.460, 0.449, 0.453, 0.445, 0.455, 0.443],
      borderColor: 'rgba(153, 102, 255, 1)',
      fill: false,
      tension: 0.1
    },
    {
      label: 'Negative',
      data: [0.295, 0.280, 0.302, 0.290, 0.317, 0.272, 0.284, 0.293, 0.279],
      borderColor: 'rgba(255, 205, 86, 1)',
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
