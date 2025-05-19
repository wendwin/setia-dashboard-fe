<template>
  <div>
    <main class="h-full pb-16 overflow-y-auto">
      <div class="container px-6 mx-auto grid">
        <div
          class="lg:flex items-center justify-between p-4 my-5 font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple">
          <div class="mb-4 lg:mb-0">
            <h1 class="text-lg lg:text-[28px] mb-2">Data Reviews Google Maps Explorer</h1>
            <p class="text-[15px]">Menu for Data and Sentiment Insights 24 hospitals in Yogyakarta</p>
          </div>
          <div class="">
            <p class="text-base">Total Reviews : {{ count }}</p>
          </div>
        </div>

        <div class="">
          <div class="grid gap-6 mb-8 md:grid-cols-2">
            <div
              class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 border bottom-1 border-gray-200 dark:border-none">
              <h4 class="mb-6 font-semibold text-gray-800 dark:text-gray-300">
                Rating Count for Type A
              </h4>
              <Bar :data="chartData1" :options="chartOptions" />
            </div>
            <div
              class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 border bottom-1 border-gray-200 dark:border-none">
              <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                Rating Count for Type B
              </h4>
              <Bar :data="chartData2" :options="chartOptions" />
            </div>
            <div
              class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 border bottom-1 border-gray-200 dark:border-none">
              <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                Rating Count for Type C
              </h4>
              <Bar :data="chartData3" :options="chartOptions" />
            </div>
            <div
              class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 border bottom-1 border-gray-200 dark:border-none">
              <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                Rating Count for Type D
              </h4>
              <Bar :data="chartData4" :options="chartOptions" />
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const reviews = ref([]);
const selectedLocation = ref('all');
const selectedRating = ref('all');
const selectedType = ref('all');
const count = ref(0);

const fetchReviews = () => {
  const location = selectedLocation.value;
  const rating = selectedRating.value;
  const type = selectedType.value;
  fetch(`http://localhost:5000/api/data-gmaps?location=${location}&rating=${rating}&type=${type}`)

    .then(res => res.json())
    .then(data => {
      reviews.value = data.reviews;
      count.value = data.count;
      console.log(data.reviews);
    })
    .catch(err => {
      console.error("Gagal mengambil data:", err);
    });
};

onMounted(() => {
  fetchReviews();
});

watch([selectedLocation, selectedRating, selectedType], fetchReviews);


import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData1 = {
  labels: [1, 2, 3, 4, 5],
  datasets: [
    {
      label: 'Count',
      data: [204, 40, 54, 46, 644],
      backgroundColor: '#dc3545',
      borderColor: 'transparent',
      borderWidth: 2.5,
      barPercentage: 0.4
    }
  ]
}

const chartData2 = {
  labels: [1, 2, 3, 4, 5],
  datasets: [
    {
      label: 'Count',
      data: [100, 220, 150, 80, 300],
      backgroundColor: '#007bff',
      borderColor: 'transparent',
      borderWidth: 2.5,
      barPercentage: 0.4
    }
  ]
}

const chartData3 = {
  labels: [1, 2, 3, 4, 5],
  datasets: [
    {
      label: 'Count',
      data: [50, 90, 130, 40, 60],
      backgroundColor: '#28a745',
      borderColor: 'transparent',
      borderWidth: 2.5,
      barPercentage: 0.4
    }
  ]
}

const chartData4 = {
  labels: [1, 2, 3, 4, 5],
  datasets: [
    {
      label: 'Count',
      data: [300, 180, 260, 90, 120],
      backgroundColor: '#ffc107',
      borderColor: 'transparent',
      borderWidth: 2.5,
      barPercentage: 0.4
    }
  ]
}

const chartOptions = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        stepSize: 100
      },
      grid: {}
    },
    x: {
      grid: {
        display: false
      }
    }
  }
}

</script>

<style scoped></style>
