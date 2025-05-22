<template>
  <div>
    <main class="h-full pb-6 overflow-y-auto">
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


        <div class="">
          <div class="flex flex-wrap gap-3 items-center mt-4">
            <h4 class=" text-gray-800 dark:text-gray-300">Filter By</h4>
            <select v-model="selectedLocation" @change="fetchReviews"
              class="px-4 py-2 text-sm font-medium leading-5 transition-colors duration-150 border border-1 text-gray-600 border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white dark:border-none">
              <option value="all">All Hospital</option>
              <option v-for="hospital in hospitals" :key="hospital.value" :value="hospital.value">
                {{ hospital.label }}
              </option>
            </select>
  
            <select v-model="selectedRating" @change="fetchReviews"
              class="px-4 py-2 text-sm font-medium leading-5 transition-colors duration-150 border border-1 text-gray-600 border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white dark:border-none">
              <option value="all">All Rating</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
  
            <select v-model="selectedType" @change="fetchReviews"
              class="px-4 py-2 text-sm font-medium leading-5 transition-colors duration-150 border border-1 text-gray-600 border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white dark:border-none">
              <option value="all">All Type</option>
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
              <option value="d">D</option>
            </select>
          </div>

          <div v-if="reviews.length"
            class="my-5 overflow-x-auto bg-white shadow-xs dark:bg-gray-800 border bottom-1 border-gray-200 dark:border-none">
            <table class="table-auto border-collapse border border-gray-400 w-full">
              <thead>
                <tr>
                  <th class="border border-gray-300 dark:text-white p-2">No</th>
                  <th class="border border-gray-300 dark:text-white p-2">Name</th>
                  <th class="border border-gray-300 dark:text-white p-2">Review</th>
                  <th class="border border-gray-300 dark:text-white p-2">Rating</th>
                  <th class="border border-gray-300 dark:text-white p-2">Type</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(review, index) in reviews" :key="index">
                  <td class="border border-gray-300 dark:text-white p-2 text-center">{{ index + 1 }}</td>
                  <td class="border border-gray-300 dark:text-white p-2 ">{{ review.name }}</td>
                  <td class="border border-gray-300 dark:text-white p-2">{{ review.review }}</td>
                  <td class="border border-gray-300 dark:text-white p-2 text-center">{{ review.rating }}</td>
                  <td class="border border-gray-300 dark:text-white p-2 text-center">{{ review.type_rs }}</td>
                </tr>
              </tbody>
            </table>
            <div
              class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500  border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
              <span class="flex items-center col-span-3">
                Showing {{ start }}–{{ end }} of {{ count }}
              </span>
              <span class="col-span-2"></span>

              <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                <nav aria-label="Table navigation">
                  <ul class="inline-flex items-center">
                    <li>
                      <button class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                        aria-label="Previous">
                        <svg aria-hidden="true" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd" fill-rule="evenodd"></path>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">1</button>
                    </li>
                    <li>
                      <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">2</button>
                    </li>
                    <li>
                      <button class="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">3</button>
                    </li>
                    <li>
                      <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">4</button>
                    </li>
                    <li><span class="px-3 py-1">...</span>
                    </li>
                    <li>
                      <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">8</button>
                    </li>
                    <li>
                      <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">9</button>
                    </li>
                    <li>
                      <button class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                        aria-label="Next">
                        <svg class="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                          <path
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd" fill-rule="evenodd"></path>
                        </svg>
                      </button>
                    </li>
                  </ul>
                </nav>
              </span>
            </div>
          </div>
          
          <p v-else class="text-center mt-5 dark:text-white font-semibold">Data Not Found...</p>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch} from 'vue';

const hospitals = [
  { value: 'rsup_dr_sardjito_yogyakarta', label: 'RSUP Dr Sardjito Yogyakarta' },
  { value: 'rspau_hardjolukito', label: 'RSPAU Hardjolukito' },
  { value: 'rs_pku_muhammadiyah_yogyakarta', label: 'RS PKU Muhammadiyah Yogyakarta' },
  { value: 'rs_bethesda_yogyakarta', label: 'RS Bethesda Yogyakarta' },
  { value: 'rst_dr_soetarto_yogyakarta', label: 'RST Dr Soetarto Yogyakarta' },
  { value: 'rs_panti_rapih', label: 'RS Panti Rapih' },
  { value: 'rs_pku_muhammadiyah_bantul', label: 'RS PKU Muhammadiyah Bantul' },
  { value: 'rs_queen_latifa', label: 'RS Queen Latifa' },
  { value: 'rs_pku_muhammadiyah_gamping', label: 'RS PKU Muhammadiyah Gamping' },
  { value: 'rsud_kota_yogyakarta', label: 'RSUD Kota Yogyakarta' },
  { value: 'rsud_panembahan_senopati', label: 'RSUD Panembahan Senopati' },
  { value: 'rsu_rajawali_citra', label: 'RSU Rajawali Citra' },
  { value: 'rs_nur_hidayah', label: 'RS Nur Hidayah' },
  { value: 'rsud_sleman', label: 'RSUD Sleman' },
  { value: 'rs_mata_dr_yap', label: 'RS Mata Dr YAP' },
  { value: 'rsud_wates', label: 'RSUD Wates' },
  { value: 'rsud_prambanan', label: 'RSUD Prambanan' },
  { value: 'rsud_wonosari', label: 'RSUD Wonosari' },
  { value: 'rsud_nyi_ageng_serang', label: 'RSUD Nyi Ageng Serang' },
  { value: 'rs_bhayangkara_polda_diy', label: 'RS Bhayangkara Polda DIY' },
  { value: 'rs_bethesda_lempuyangwangi', label: 'RS Bethesda Lempuyangwangi' },
  { value: 'rs_mitra_paramedika', label: 'RS Mitra Paramedika' },
  { value: 'rs_at_turots_al_islamy', label: 'RS At Turots Al Islamy' },
  { value: 'rumah_sakit_pku_muhammadiyah_wonosari', label: 'Rumah Sakit PKU Muhammadiyah Wonosari' }
];

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
