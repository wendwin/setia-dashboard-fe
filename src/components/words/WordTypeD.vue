<template>
    <div class="grid gap-6 mb-8 md:grid-cols-2 items-stretch rounded-lg">
        <div
            class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 h-full flex flex-col shadow-md focus:outline-none border border-gray-100 dark:border-none">
            <div class="flex-grow flex flex-col">
                <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                    Positive Words Topic
                </h4>

                <div v-for="(chartData, index) in chartDataPositiveList" :key="index" class="mb-5">
                    <Bar :data="chartData" :options="generateChartOptions(`Topik Positif D - ${index + 1}`)" />
                </div>
            </div>
        </div>

        <div
            class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 h-full flex flex-col shadow-md focus:outline-none border border-gray-100 dark:border-none">
            <div class="flex-grow flex flex-col">
                <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                    Negative Words Topic
                </h4>

                <div v-for="(chartData, index) in chartDataNegativeList" :key="index" class="mb-5">
                    <Bar :data="chartData" :options="generateChartOptions(`Topik Negative D - ${index + 1}`)" />
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


// const lda_topics_positive_D = [
//   [
//     ["layanan", 0.027], ["daftar", 0.026], ["bpjs", 0.023], ["antre", 0.021], ["baik", 0.017],
//     ["dokter", 0.013], ["pasien", 0.013], ["sini", 0.012], ["lama", 0.012], ["obat", 0.011]
//   ],
//   [
//     ["dokter", 0.039], ["layanan", 0.035], ["terima_kasih", 0.029], ["latifa", 0.028], ["queen", 0.027],
//     ["ramah", 0.025], ["periksa", 0.024], ["anak", 0.023], ["rumah_sakit", 0.018], ["jelas", 0.017]
//   ],
//   [
//     ["banget", 0.017], ["gigi", 0.016], ["sini", 0.016], ["dokter", 0.015], ["mau", 0.014],
//     ["periksa", 0.013], ["alhamdulillah", 0.012], ["hospital", 0.011], ["rawat", 0.011], ["bantu", 0.010]
//   ],
//   [
//     ["layanan", 0.103], ["ramah", 0.068], ["bagus", 0.037], ["rumah_sakit", 0.034], ["bersih", 0.032],
//     ["cepat", 0.032], ["queen", 0.027], ["latifa", 0.027], ["nyaman", 0.026], ["baik", 0.023]
//   ],
//   [
//     ["hidayah", 0.060], ["nur", 0.058], ["rumah_sakit", 0.039], ["ilmu", 0.018], ["layanan", 0.018],
//     ["tenaga", 0.018], ["terima_kasih", 0.017], ["medis", 0.016], ["baik", 0.011], ["sehat", 0.010]
//   ],
//   [
//     ["layanan", 0.098], ["ramah", 0.067], ["rumah_sakit", 0.049], ["baik", 0.046], ["terima_kasih", 0.026],
//     ["dokter", 0.022], ["perawat", 0.020], ["puas", 0.019], ["selalu", 0.018], ["semua", 0.018]
//   ],
//   [
//     ["rumah_sakit", 0.052], ["layanan", 0.020], ["parkir", 0.013], ["pasien", 0.013], ["sini", 0.012],
//     ["biasa", 0.011], ["jalan", 0.011], ["luar", 0.011], ["keluarga", 0.010], ["sehat", 0.010]
//   ]
// ];

// const lda_topics_negative_D = [
//   [
//     ["dokter", 0.026], ["jam", 0.018], ["layanan", 0.017], ["rumah_sakit", 0.016], ["antre", 0.013],
//     ["pasien", 0.012], ["periksa", 0.012], ["datang", 0.010], ["kalau", 0.010], ["daftar", 0.010]
//   ],
//   [
//     ["layanan", 0.021], ["pasien", 0.016], ["jam", 0.014], ["tunggu", 0.014], ["antre", 0.014],
//     ["lama", 0.013], ["rumah_sakit", 0.010], ["daftar", 0.010], ["obat", 0.009], ["jadi", 0.008]
//   ]
// ];


const lda_topics_positive_D = [
  [
    ["layanan", 0.052], ["rs-d5", 0.051], ["terima_kasih", 0.027], ["baik", 0.024], ["selalu", 0.017],
    ["ramah", 0.015], ["sehat", 0.012], ["bagus", 0.012], ["beri", 0.011], ["pasien", 0.011]
  ],
  [
    ["layanan", 0.101], ["ramah", 0.070], ["baik", 0.032], ["cepat", 0.026], ["dokter", 0.024],
    ["bagus", 0.024], ["perawat", 0.019], ["bersih", 0.019], ["rs-d1", 0.017], ["terima_kasih", 0.015]
  ],
  [
    ["dokter", 0.022], ["anak", 0.012], ["obat", 0.011], ["jadi", 0.011], ["periksa", 0.010],
    ["bpjs", 0.010], ["rawat", 0.010], ["layanan", 0.010], ["pasien", 0.009], ["antre", 0.009]
  ]
];

const lda_topics_negative_D = [
  [
    ["jam", 0.022], ["antre", 0.021], ["dokter", 0.021], ["layanan", 0.018], ["pasien", 0.016],
    ["tunggu", 0.015], ["lama", 0.013], ["daftar", 0.012], ["obat", 0.011], ["datang", 0.010]
  ],
  [
    ["dokter", 0.016], ["anak", 0.014], ["kalau", 0.012], ["pasien", 0.009], ["rujuk", 0.008],
    ["periksa", 0.008], ["padahal", 0.007], ["rs-d1", 0.007], ["obat", 0.007], ["suruh", 0.007]
  ],
  [
    ["layanan", 0.026], ["jam", 0.017], ["dokter", 0.016], ["pasien", 0.014], ["lama", 0.012],
    ["kalau", 0.011], ["tunggu", 0.010], ["daftar", 0.008], ["obat", 0.007], ["mohon", 0.007]
  ]
];



const chartDataPositiveList = lda_topics_positive_D.map((topic, index) => ({
  labels: topic.map(item => item[0]),
  datasets: [
    {
      label: `Topik Positif C - ${index + 1}`,
      data: topic.map(item => item[1]),
      backgroundColor: '#6f42c1',
    },
  ],
}))

const chartDataNegativeList = lda_topics_negative_D.map((topic, index) => ({
  labels: topic.map(item => item[0]),
  datasets: [
    {
      label: `Topik Negatif C - ${index + 1}`,
      data: topic.map(item => item[1]),
      backgroundColor: '#e83e8c',
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