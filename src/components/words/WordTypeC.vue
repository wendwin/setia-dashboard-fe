<template>
    <div class="grid gap-6 mb-8 md:grid-cols-2 items-stretch rounded-lg">
        <div
            class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 h-full flex flex-col shadow-md focus:outline-none border border-gray-100">
            <div class="flex-grow flex flex-col">
                <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                    Positive Words Topic
                </h4>

                <div v-for="(chartData, index) in chartDataPositiveList" :key="index" class="mb-5">
                    <Bar :data="chartData" :options="generateChartOptions(`Topik Positif C - ${index + 1}`)" />
                </div>
            </div>
        </div>

        <div
            class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 h-full flex flex-col shadow-md focus:outline-none border border-gray-100">
            <div class="flex-grow flex flex-col">
                <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                    Negative Words Topic
                </h4>

                <div v-for="(chartData, index) in chartDataNegativeList" :key="index" class="mb-5">
                    <Bar :data="chartData" :options="generateChartOptions(`Topik Negative C - ${index + 1}`)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


const lda_topics_positive_C = [
  [
    ["rumah_sakit", 0.070], ["layanan", 0.041], ["bantul", 0.029], ["pku", 0.028], ["dkt", 0.024],
    ["soetarto", 0.016], ["baik", 0.015], ["selalu", 0.011], ["terima_kasih", 0.009], ["lengkap", 0.008]
  ],
  [
    ["layanan", 0.035], ["terima_kasih", 0.027], ["rumah_sakitud", 0.023], ["prambanan", 0.021], ["dokter", 0.015],
    ["rawat", 0.014], ["selalu", 0.013], ["ramah", 0.013], ["bidan", 0.012], ["ibu", 0.011]
  ],
  [
    ["layanan", 0.032], ["pasien", 0.025], ["dokter", 0.021], ["daftar", 0.017], ["ramah", 0.016],
    ["baik", 0.014], ["antre", 0.013], ["tugas", 0.012], ["poliklinik", 0.011], ["obat", 0.010]
  ],
  [
    ["layanan", 0.116], ["ramah", 0.097], ["baik", 0.043], ["bagus", 0.041], ["cepat", 0.034],
    ["bersih", 0.034], ["rumah_sakit", 0.025], ["nyaman", 0.022], ["rawat", 0.019], ["tempat", 0.018]
  ]
];

const lda_topics_negative_C = [
  [
    ["jam", 0.025], ["layanan", 0.019], ["dokter", 0.018], ["antre", 0.017], ["tunggu", 0.014],
    ["datang", 0.013], ["lama", 0.012], ["pasien", 0.012], ["daftar", 0.009], ["kalau", 0.008]
  ],
  [
    ["layanan", 0.021], ["pasien", 0.020], ["rumah_sakit", 0.018], ["dokter", 0.015], ["kalau", 0.010],
    ["daftar", 0.008], ["orang", 0.008], ["baik", 0.007], ["obat", 0.007], ["bpjs", 0.007]
  ]
];


const chartDataPositiveList = lda_topics_positive_C.map((topic, index) => ({
  labels: topic.map(item => item[0]),
  datasets: [
    {
      label: `Topik Positif C - ${index + 1}`,
      data: topic.map(item => item[1]),
      backgroundColor: '#fd7e14',
    },
  ],
}))

const chartDataNegativeList = lda_topics_negative_C.map((topic, index) => ({
  labels: topic.map(item => item[0]),
  datasets: [
    {
      label: `Topik Negatif C - ${index + 1}`,
      data: topic.map(item => item[1]),
      backgroundColor: '#20c997',
    },
  ],
}))

const generateChartOptions = (title) => ({
  responsive: true,
  indexAxis: 'y',
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: title,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
    },
  },
})
</script>

<style lang="scss" scoped></style>