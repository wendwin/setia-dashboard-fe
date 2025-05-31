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
  positive: [0.493, 0.474, 0.454, 0.466, 0.429, 0.458, 0.438, 0.461, 0.436],
  negative: [0.279, 0.260, 0.291, 0.288, 0.314, 0.269, 0.288, 0.298, 0.281]
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
          datasets: [makeDataset('Coherence Score - Positive', scores.positive, 'rgba(75, 192, 192, 1)')]
        },
        options: chartOptions('Coherence Score - Positive', 0.42, 0.5)
      },
      {
        data: {
          labels,
          datasets: [makeDataset('Coherence Score - Negative', scores.negative, 'rgba(255, 99, 132, 1)')]
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
            makeDataset('Coherence Score - Positive', scores.positive, 'rgba(75, 192, 192, 1)'),
            makeDataset('Coherence Score - Negative', scores.negative, 'rgba(255, 99, 132, 1)')
          ]
        },
        options: chartOptions('Coherence Score Comparison (Yogyakarta)', 0, 1)
      }
    ]
  }
})

</script>