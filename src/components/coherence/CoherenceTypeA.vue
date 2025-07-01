<template>
  <div>
    <template v-if="route.path === '/topic-analysis'">
      <div class="grid gap-6 mb-8 md:grid-cols-2 grid-cols-1 items-start">
        <div class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 w-full overflow-x-auto min-h-[200px] shadow-md border border-gray-200 dark:border-none">
          <Line :data="chartData[0].data" :options="chartData[0].options" />
        </div>
        <div class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 w-full overflow-x-auto min-h-[200px] shadow-md border border-gray-200 dark:border-none">
          <Line :data="chartData[1].data" :options="chartData[1].options" />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 w-full overflow-x-auto min-h-[200px] shadow-md border border-gray-200 dark:border-none">
        <Line :data="chartData[0].data" :options="chartData[0].options" />
      </div>
    </template>
  </div>
</template>


<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Line } from 'vue-chartjs'
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

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)
const route = useRoute()

const labels = [2, 3, 4, 5, 6, 7, 8, 9, 10]

const scores = {
  positive: [0.536, 0.554, 0.546, 0.543, 0.513, 0.517, 0.535, 0.514, 0.518],
  negative: [0.354, 0.321, 0.333, 0.342, 0.381, 0.357, 0.379, 0.362, 0.376]
}

const makeDataset = (label, data, color) => ({
  label,
  data,
  borderColor: color,
  backgroundColor: color.replace('1)', '0.3)'),
  fill: false,
  tension: 0.1
})

const chartOptions = (title, minY = null, maxY = null) => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Number of Topics'
      }
    },
    y: {
      beginAtZero: minY === null,
      ...(minY !== null && { suggestedMin: minY }),
      ...(maxY !== null && { suggestedMax: maxY }),
      title: {
        display: true,
        text: 'Coherence Score'
      }
    }
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: tooltipItem =>
          `${tooltipItem.dataset.label}: Score ${tooltipItem.raw.toFixed(3)}`
      }
    },
    legend: { position: 'top' },
    title: {
      display: true,
      text: title
    }
  }
})


const chartData = computed(() => {
  if (route.path === '/topic-analysis') {
    return [
      {
        data: {
          labels,
          datasets: [makeDataset('Positif', scores.positive, '#4bc0c0')]
        },
        options: chartOptions('Positif', 0.42, 0.5)
      },
      {
        data: {
          labels,
          datasets: [makeDataset('Negatif', scores.negative, '#ff6384')]
        },
        options: chartOptions('Negatif', 0.26, 0.32)
      }
    ]
  } else {
    return [
      {
        data: {
          labels,
          datasets: [
            makeDataset('Positif', scores.positive, '#4bc0c0'),
            makeDataset('Negatif', scores.negative, '#ff6384')
          ]
        },
        options: chartOptions('Coherence Score per Number of Topics', 0, 1)
      }
    ]
  }
})

</script>

<style scoped>
canvas {
  width: 100% !important;
  height: auto !important;
}
</style>