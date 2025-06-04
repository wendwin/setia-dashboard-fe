<template>
    <div class="grid gap-6 mb-8 md:grid-cols-2 items-stretch rounded-lg">
        <div
            class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 h-full flex flex-col shadow-md focus:outline-none border border-gray-100">
            <div class="flex-grow flex flex-col">
                <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                    Positive Words Topic
                </h4>

                <div v-for="(chartData, index) in chartDataPositiveList" :key="index" class="mb-5">
                    <Bar :data="chartData" :options="generateChartOptions(`Topik Positif B - ${index + 1}`)" />
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
                    <Bar :data="chartData" :options="generateChartOptions(`Topik Negative B - ${index + 1}`)" />
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


const lda_topics_positive_B = [
  [
    ["layanan", 0.040], ["rumah_sakit", 0.032], ["terima_kasih", 0.029], ["rawat", 0.023], ["baik", 0.023],
    ["dokter", 0.019], ["rumah_sakitud", 0.016], ["selalu", 0.015], ["pku", 0.013], ["pasien", 0.012]
  ],
  [
    ["layanan", 0.110], ["ramah", 0.076], ["bagus", 0.040], ["baik", 0.034], ["bersih", 0.031],
    ["nyaman", 0.026], ["cepat", 0.024], ["ruang", 0.022], ["rumah_sakit", 0.022], ["dokter", 0.020]
  ],
  [
    ["rumah_sakit", 0.021], ["antre", 0.012], ["daftar", 0.012], ["parkir", 0.011], ["pasien", 0.009],
    ["jadi", 0.008], ["kalau", 0.008], ["bpjs", 0.008], ["jam", 0.007], ["obat", 0.007]
  ]
];

const lda_topics_negative_B = [
  [
    ["layanan", 0.024], ["pasien", 0.021], ["dokter", 0.014], ["rumah_sakit", 0.013], ["kalau", 0.010],
    ["daftar", 0.010], ["sama", 0.009], ["tanya", 0.009], ["baik", 0.009], ["rawat", 0.008]
  ],
  [
    ["rumah_sakit", 0.018], ["dokter", 0.012], ["parkir", 0.011], ["pasien", 0.011], ["obat", 0.011],
    ["hari", 0.009], ["tunggu", 0.008], ["layanan", 0.008], ["igd", 0.007], ["sakit", 0.007]
  ],
  [
    ["jam", 0.057], ["antre", 0.039], ["layanan", 0.028], ["tunggu", 0.024], ["lama", 0.023],
    ["datang", 0.019], ["dokter", 0.018], ["nomor", 0.013], ["daftar", 0.011], ["panggil", 0.009]
  ]
];

const chartDataPositiveList = lda_topics_positive_B.map((topic, index) => ({
  labels: topic.map(item => item[0]),
  datasets: [
    {
      label: `Topik Positif B - ${index + 1}`,
      data: topic.map(item => item[1]),
      backgroundColor: '#17a2b8',
    },
  ],
}))

const chartDataNegativeList = lda_topics_negative_B.map((topic, index) => ({
  labels: topic.map(item => item[0]),
  datasets: [
    {
      label: `Topik Negatif B - ${index + 1}`,
      data: topic.map(item => item[1]),
      backgroundColor: '#6610f2',
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