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
            class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 h-full flex flex-col shadow-md focus:outline-none border border-gray-100">
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
            class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 h-full flex flex-col shadow-md focus:outline-none border border-gray-100">
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


const lda_topics_positive_A = [
  [
    ["layanan", 0.017], ["ramah", 0.015], ["sardjito", 0.014], ["dokter", 0.012], ["baik", 0.011],
    ["parkir", 0.011], ["rumah_sakit", 0.010], ["kalau", 0.010], ["tugas", 0.010], ["cepat", 0.009],
  ],
  [
    ["layanan", 0.056], ["rumah_sakit", 0.054], ["ramah", 0.032], ["lengkap", 0.022], ["sardjito", 0.018],
    ["fasilitas", 0.014], ["bersih", 0.014], ["bagus", 0.014], ["baik", 0.014], ["pasien", 0.014],
  ],
  [
    ["layanan", 0.029], ["sardjito", 0.021], ["rumah_sakit", 0.018], ["rawat", 0.018], ["dokter", 0.017],
    ["baik", 0.014], ["parkir", 0.012], ["terima_kasih", 0.011], ["pasien", 0.010], ["daftar", 0.009],
  ],
]

const lda_topics_negative_A = [
  [
    ["lama", 0.026], ["antri", 0.025], ["menunggu", 0.020], ["dokter", 0.018], ["daftar", 0.017],
    ["sakit", 0.014], ["pelayanan", 0.013], ["tidak", 0.011], ["pasien", 0.011], ["bpjs", 0.010]
  ],
  [
    ["sistem", 0.031], ["eror", 0.025], ["lama", 0.023], ["antrian", 0.020], ["tidak", 0.017],
    ["dokter", 0.015], ["administrasi", 0.012], ["pelayanan", 0.011], ["penuh", 0.011], ["parkir", 0.010]
  ],
  [
    ["tidak", 0.036], ["dokter", 0.030], ["pasien", 0.025], ["lama", 0.020], ["antri", 0.019],
    ["sakit", 0.018], ["sistem", 0.014], ["batal", 0.012], ["bpjs", 0.011], ["daftar", 0.010]
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