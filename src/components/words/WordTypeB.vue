<template>
    <div class="grid gap-6 mb-8 md:grid-cols-2 items-stretch rounded-lg">
        <div
            class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 h-full flex flex-col shadow-md focus:outline-none border border-gray-100 dark:border-none">
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
            class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 h-full flex flex-col shadow-md focus:outline-none border border-gray-100 dark:border-none">
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


// const lda_topics_positive_B = [
//   [
//     ["layanan", 0.040], ["rumah_sakit", 0.032], ["terima_kasih", 0.029], ["rawat", 0.023], ["baik", 0.023],
//     ["dokter", 0.019], ["rumah_sakitud", 0.016], ["selalu", 0.015], ["pku", 0.013], ["pasien", 0.012]
//   ],
//   [
//     ["layanan", 0.110], ["ramah", 0.076], ["bagus", 0.040], ["baik", 0.034], ["bersih", 0.031],
//     ["nyaman", 0.026], ["cepat", 0.024], ["ruang", 0.022], ["rumah_sakit", 0.022], ["dokter", 0.020]
//   ],
//   [
//     ["rumah_sakit", 0.021], ["antre", 0.012], ["daftar", 0.012], ["parkir", 0.011], ["pasien", 0.009],
//     ["jadi", 0.008], ["kalau", 0.008], ["bpjs", 0.008], ["jam", 0.007], ["obat", 0.007]
//   ]
// ];

// const lda_topics_negative_B = [
//   [
//     ["layanan", 0.024], ["pasien", 0.021], ["dokter", 0.014], ["rumah_sakit", 0.013], ["kalau", 0.010],
//     ["daftar", 0.010], ["sama", 0.009], ["tanya", 0.009], ["baik", 0.009], ["rawat", 0.008]
//   ],
//   [
//     ["rumah_sakit", 0.018], ["dokter", 0.012], ["parkir", 0.011], ["pasien", 0.011], ["obat", 0.011],
//     ["hari", 0.009], ["tunggu", 0.008], ["layanan", 0.008], ["igd", 0.007], ["sakit", 0.007]
//   ],
//   [
//     ["jam", 0.057], ["antre", 0.039], ["layanan", 0.028], ["tunggu", 0.024], ["lama", 0.023],
//     ["datang", 0.019], ["dokter", 0.018], ["nomor", 0.013], ["daftar", 0.011], ["panggil", 0.009]
//   ]
// ];

const lda_topics_positive_B = [
  [
    ["layanan", 0.028], ["pasien", 0.023], ["daftar", 0.021], ["periksa", 0.021], ["mata", 0.021],
    ["bpjs", 0.021], ["antre", 0.018], ["poli", 0.018], ["dokter", 0.014], ["obat", 0.013]
  ],
  [
    ["terima_kasih", 0.023], ["dokter", 0.021], ["anak", 0.018], ["rawat", 0.018], ["sini", 0.014],
    ["ibu", 0.012], ["baik", 0.011], ["rs-b8", 0.009], ["alhamdulillah", 0.009], ["operasi", 0.008]
  ],
  [
    ["layanan", 0.104], ["ramah", 0.047], ["baik", 0.041], ["terima_kasih", 0.035], ["selalu", 0.027],
    ["dokter", 0.022], ["rawat", 0.022], ["semua", 0.019], ["pasien", 0.018], ["rs-b9", 0.014]
  ],
  [
    ["rs-b11", 0.030], ["rumah_sakit", 0.018], ["kalau", 0.011], ["satu", 0.010], ["jadi", 0.010],
    ["jogja", 0.010], ["baru", 0.009], ["yogyakarta", 0.009], ["jam", 0.008], ["salah", 0.008]
  ],
  [
    ["layanan", 0.075], ["ramah", 0.050], ["bagus", 0.046], ["bersih", 0.045], ["nyaman", 0.033],
    ["tempat", 0.027], ["baik", 0.022], ["parkir", 0.019], ["cepat", 0.018], ["fasilitas", 0.017]
  ]
];

const lda_topics_negative_B = [
  [
    ["dokter", 0.018], ["sakit", 0.011], ["pasien", 0.011], ["igd", 0.011], ["obat", 0.010],
    ["anak", 0.009], ["rawat", 0.009], ["parkir", 0.009], ["kalau", 0.008], ["hari", 0.008]
  ],
  [
    ["pasien", 0.028], ["layanan", 0.027], ["bpjs", 0.012], ["kalau", 0.011], ["daftar", 0.011],
    ["bagi", 0.009], ["baik", 0.008], ["tugas", 0.007], ["tanya", 0.007], ["mohon", 0.007]
  ],
  [
    ["satu", 0.017], ["sama", 0.016], ["aman", 0.014], ["layanan", 0.013], ["tidak_ramah", 0.013],
    ["tanya", 0.010], ["kalau", 0.009], ["sekali", 0.009], ["iya", 0.008], ["orang", 0.008]
  ],
  [
    ["lama", 0.042], ["obat", 0.039], ["antre", 0.033], ["layanan", 0.026], ["farmasi", 0.026],
    ["tunggu", 0.023], ["jam", 0.018], ["ambil", 0.015], ["parkir", 0.010], ["banget", 0.010]
  ],
  [
    ["jam", 0.042], ["dokter", 0.028], ["antre", 0.024], ["layanan", 0.019], ["tunggu", 0.018],
    ["pasien", 0.017], ["daftar", 0.016], ["datang", 0.016], ["lama", 0.012], ["nomor", 0.011]
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