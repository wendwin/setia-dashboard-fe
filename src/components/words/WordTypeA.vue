<!-- <template>
    <div class="grid gap-6 mb-8 md:grid-cols-2 items-stretch rounded-lg">
        <div
            class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 h-full flex flex-col shadow-md focus:outline-none border-1 border-gray-100">
            <div class="flex-grow flex flex-col">
                <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                    Positive Words Topic
                </h4>
                <div class="mb-5">
                    <Bar :data="chartData" :options="chartOptions" />
                </div>
                <div class="mb-5">
                    <Bar :data="chartData" :options="chartOptions" />
                </div>
                <div class="mb-5">
                    <Bar :data="chartData" :options="chartOptions" />
                </div>
            </div>
        </div>

        <div
            class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 shadow-md focus:outline-none border-1 border-gray-100">
            <div>
                <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                    Negative Words Topic
                </h4>
                <div class="mb-5">
                    <Bar :data="chartData" :options="chartOptions" />
                </div>
                <div class="mb-5">
                    <Bar :data="chartData" :options="chartOptions" />
                </div>
                <div class="mb-5">
                    <Bar :data="chartData" :options="chartOptions" />
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);

const chartData = {
    labels: [
        "baik",
        "rsu",
        "cepat",
        "rawat",
        "periksa",
        "rs",
        "tugas",
        "dokter",
        "ramah",
        "x",
    ],
    datasets: [
        {
            label: "Topik Positif 1",
            data: [0.01, 0.012, 0.013, 0.014, 0.017, 0.018, 0.019, 0.03, 0.035, 0.04],
            backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
    ],
};

const chartOptions = {
    responsive: true,
    indexAxis: "y",
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: "Topik Positif 1",
        },
    },
    scales: {
        x: {
            beginAtZero: true,
        },
    },
};
</script>

<style lang="scss" scoped></style> -->



<template>
    <div class="grid gap-6 mb-8 md:grid-cols-2 items-stretch rounded-lg">
        <div
            class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 h-full flex flex-col shadow-md focus:outline-none border border-gray-100 dark:border-none">
            <div class="flex-grow flex flex-col">
                <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                    Positive Words Topic
                </h4>

                <div v-for="(chartData, index) in chartDataPositiveList" :key="index" class="mb-5">
                    <Bar :data="chartData" :options="generateChartOptions(`Topik Positif A - ${index + 1}`)" />
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
                    <Bar :data="chartData" :options="generateChartOptions(`Topik Negative A - ${index + 1}`)" />
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


// const lda_topics_positive_A = [
//   [
//     ["layanan", 0.017], ["ramah", 0.015], ["sardjito", 0.014], ["dokter", 0.012], ["baik", 0.011],
//     ["parkir", 0.011], ["rumah_sakit", 0.010], ["kalau", 0.010], ["tugas", 0.010], ["cepat", 0.009],
//   ],
//   [
//     ["layanan", 0.056], ["rumah_sakit", 0.054], ["ramah", 0.032], ["lengkap", 0.022], ["sardjito", 0.018],
//     ["fasilitas", 0.014], ["bersih", 0.014], ["bagus", 0.014], ["baik", 0.014], ["pasien", 0.014],
//   ],
//   [
//     ["layanan", 0.029], ["sardjito", 0.021], ["rumah_sakit", 0.018], ["rawat", 0.018], ["dokter", 0.017],
//     ["baik", 0.014], ["parkir", 0.012], ["terima_kasih", 0.011], ["pasien", 0.010], ["daftar", 0.009],
//   ],
// ]

// const lda_topics_negative_A = [
//   [
//     ["lama", 0.026], ["antri", 0.025], ["menunggu", 0.020], ["dokter", 0.018], ["daftar", 0.017],
//     ["sakit", 0.014], ["pelayanan", 0.013], ["tidak", 0.011], ["pasien", 0.011], ["bpjs", 0.010]
//   ],
//   [
//     ["sistem", 0.031], ["eror", 0.025], ["lama", 0.023], ["antrian", 0.020], ["tidak", 0.017],
//     ["dokter", 0.015], ["administrasi", 0.012], ["pelayanan", 0.011], ["penuh", 0.011], ["parkir", 0.010]
//   ],
//   [
//     ["tidak", 0.036], ["dokter", 0.030], ["pasien", 0.025], ["lama", 0.020], ["antri", 0.019],
//     ["sakit", 0.018], ["sistem", 0.014], ["batal", 0.012], ["bpjs", 0.011], ["daftar", 0.010]
//   ]
// ];


const lda_topics_positive_A = [
  [
    ["rs-a1", 0.036], ["layanan", 0.035], ["ramah", 0.019], ["baik", 0.013], ["pasien", 0.011],
    ["dokter", 0.011], ["rumah_sakit", 0.010], ["rawat", 0.010], ["bersih", 0.010], ["tempat", 0.009]
  ],
  [
    ["rs-a1", 0.054], ["layanan", 0.023], ["parkir", 0.014], ["lengkap", 0.014], ["dokter", 0.012],
    ["banyak", 0.011], ["rujuk", 0.010], ["tempat", 0.009], ["baik", 0.009], ["jogja", 0.008]
  ],
  [
    ["layanan", 0.051], ["ramah", 0.027], ["rs-a1", 0.027], ["dokter", 0.021], ["lengkap", 0.018],
    ["baik", 0.018], ["rawat", 0.017], ["pasien", 0.015], ["fasilitas", 0.015], ["semua", 0.012]
  ]
];

const lda_topics_negative_A = [
  [
    ["pasien", 0.010], ["rawat", 0.010], ["mau", 0.009], ["rs-a1", 0.009], ["dokter", 0.008],
    ["buat", 0.008], ["sakit", 0.008], ["satu", 0.008], ["hari", 0.007], ["sama", 0.007]
  ],
  [
    ["parkir", 0.027], ["rs-a1", 0.018], ["pasien", 0.014], ["layanan", 0.012], ["jam", 0.011],
    ["tunggu", 0.010], ["kalau", 0.008], ["mau", 0.008], ["dokter", 0.008], ["baik", 0.008]
  ],
  [
    ["parkir", 0.021], ["layanan", 0.015], ["daftar", 0.013], ["mobil", 0.011], ["orang", 0.008],
    ["jauh", 0.008], ["online", 0.008], ["antre", 0.008], ["rs-a1", 0.006], ["tanya", 0.005]
  ],
  [
    ["dokter", 0.027], ["jam", 0.024], ["layanan", 0.016], ["pasien", 0.015], ["rs-a1", 0.012],
    ["kalau", 0.011], ["antre", 0.010], ["datang", 0.010], ["tunggu", 0.010], ["apa", 0.009]
  ],
  [
    ["saya", 0.018], ["pasien", 0.014], ["yang", 0.011], ["parkir", 0.010], ["tempat", 0.010],
    ["dan", 0.009], ["di", 0.009], ["untuk", 0.008], ["rs-a1", 0.008], ["orang", 0.008]
  ],
  [
    ["layanan", 0.030], ["pasien", 0.022], ["dokter", 0.014], ["rawat", 0.013], ["rs-a1", 0.011],
    ["tanya", 0.010], ["satu", 0.010], ["tidak_ramah", 0.007], ["sama", 0.007], ["bahkan", 0.006]
  ]
];



const chartDataPositiveList = lda_topics_positive_A.map((topic, index) => ({
  labels: topic.map(item => item[0]),
  datasets: [
    {
      label: `Topik Positif A - ${index + 1}`,
      data: topic.map(item => item[1]),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
    },
  ],
}))

const chartDataNegativeList = lda_topics_negative_A.map((topic, index) => ({
  labels: topic.map(item => item[0]),
  datasets: [
    {
      label: `Topik Negatif A - ${index + 1}`,
      data: topic.map(item => item[1]),
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
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