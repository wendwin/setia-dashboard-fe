<template>
  <div>
    <template v-if="route.path === '/topic-analysis'">
      <div class="grid gap-6 mb-8 md:grid-cols-2 items-start">
        <div class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <Line :data="chartData[0].data" :options="chartData[0].options" />
        </div>
        <div class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <Line :data="chartData[1].data" :options="chartData[1].options" />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
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
  positive: [0.489, 0.475, 0.468, 0.457, 0.448, 0.455, 0.439, 0.450, 0.437],
  negative: [0.282, 0.270, 0.289, 0.285, 0.312, 0.273, 0.286, 0.294, 0.277]
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
          datasets: [makeDataset('Coherence Score - Positive', scores.positive, 'rgba(255, 99, 132, 1)')]
        },
        options: chartOptions('Coherence Score - Positive', 0.43, 0.5)
      },
      {
        data: {
          labels,
          datasets: [makeDataset('Coherence Score - Negative', scores.negative, 'rgba(75, 192, 192, 1)')]
        },
        options: chartOptions('Coherence Score - Negative', 0.26, 0.32)
      }
    ]
  } else {
    return [
      {
        data: {
          labels,
          datasets: [
            makeDataset('Coherence Score - Positive', scores.positive, 'rgba(255, 99, 132, 1)'),
            makeDataset('Coherence Score - Negative', scores.negative, 'rgba(75, 192, 192, 1)')
          ]
        },
        options: chartOptions('Coherence Score Comparison', 0, 1)
      }
    ]
  }
})
</script>
