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
      data: [0.493, 0.474, 0.454, 0.466, 0.429, 0.458, 0.438, 0.461, 0.436],
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false,
      tension: 0.1
    },
    {
      label: 'Negative',
      data: [0.279, 0.260, 0.291, 0.288, 0.314, 0.269, 0.288, 0.298, 0.281],
      borderColor: 'rgba(255, 99, 132, 1)',
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
  }
}
</script>
