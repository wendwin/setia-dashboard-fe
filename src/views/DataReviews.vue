<template>
  <div>
    <main class="h-full pb-6 overflow-y-auto">
      <div class="container px-6 mx-auto grid">
        <header class="lg:flex gap-3 items-center justify-between my-5 text-white font-semibold ">
          <div class="p-4 bg-blue-500 lg:w-[70%] rounded-lg shadow-md focus:outline-none focus:shadow-outline-blue">
            <div class="">
              <p class="text-lg lg:text-[28px] mb-2">Data Reviews Google Maps Explorer</p>
              <p class="text-[15px]">Menu for Data and Sentiment Insights 24 hospitals in Yogyakarta</p>
            </div>
          </div>
          <div class="hidden h-full lg:block p-4 bg-blue-500 w-[30%] rounded-lg shadow-md focus:outline-none focus:shadow-outline-blue">
            <div class="flex items-center justify-between text-center gap-5">
              <p class="lg:text-sm xl:text-lg">
                Total Reviews
                <count-up :end-val="count" :duration="2" />
              </p>
              <p class="lg:text-sm xl:text-lg">
                Positive
                <count-up :end-val="countPositive" :duration="2" />
              </p>
              <p class="lg:text-sm xl:text-lg">
                Negative
                <count-up :end-val="countNegative" :duration="2" />
              </p>
            </div>
          </div>
          <div
            class="p-4 mt-3 lg:hidden bg-blue-500 lg:w-[70%] rounded-lg shadow-md focus:outline-none focus:shadow-outline-blue">
            <div class="flex items-center justify-evenly text-center gap-5">
              <p class="text-base">
                Total Reviews
                <count-up :end-val="count" :duration="2" />
              </p>
              <p class="text-base">
                Positive
                <count-up :end-val="countPositive" :duration="2" />
              </p>
              <p class="text-base">
                Negative
                <count-up :end-val="countNegative" :duration="2" />
              </p>
            </div>
          </div>
        </header>

        <div class="w-full overflow-x-auto mb-4">
          <div class="min-w-[600px] p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 border bottom-1 border-gray-200 dark:border-none">
             <h4 class="mb-6 font-semibold text-gray-800 dark:text-gray-300">
                Rating Count
              </h4>
            <div class="">
              <Bar :data="chartDataGrouped" :options="chartOptions" :style="{ height: isLargeScreen ? '100%' : '350px' }" />
            </div>
          </div>
        </div>

        <!-- <div class="min-w-0 p-4 mb-8 bg-white rounded-lg shadow-xs dark:bg-gray-800 border bottom-1 border-gray-200 dark:border-none">
          <Bar :data="chartDataGrouped" :options="chartOptions" />
        </div> -->

        <!-- <div class="">
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
        </div> -->


        <div class="w-full overflow-x-auto">
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
                  <td class="border border-gray-300 dark:text-white p-2 text-center">{{ (page - 1) * perPage + index + 1 }}</td>
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
                Showing {{ start }}–{{ end }} of {{ totalPages  }}
              </span>
              <span class="col-span-2"></span>

              <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                <nav aria-label="Table navigation">
                  <ul class="inline-flex items-center">
                    <ul class="inline-flex items-center">
                      <li>
                        <button
                          @click="prevPage"
                          :disabled="page === 1"
                          class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                          aria-label="Previous"
                        >
                          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </li>                    

                      <li v-for="num in pageNumbers" :key="num">
                        <button
                          v-if="num !== '...'"
                          @click="goToPage(num)"
                          :class="[
                            'px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple',
                            page === num ? 'bg-purple-600 text-white border border-purple-600' : ''
                          ]"
                        >
                          {{ num }}
                        </button>
                        <span v-else class="px-3 py-1">...</span>
                      </li>                    

                      <li>
                        <button
                          @click="nextPage"
                          :disabled="page === totalPages"
                          class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                          aria-label="Next"
                        >
                          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </li>
                    </ul>
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
import { ref, reactive, watchEffect, onMounted, onUnmounted, watch, computed } from 'vue';
import CountUp from 'vue-countup-v3'

const isLargeScreen = ref(false)

function handleResize() {
  isLargeScreen.value = window.innerWidth >= 1024
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

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
const lastFilter = reactive({
  location: selectedLocation.value,
  rating: selectedRating.value,
  type: selectedType.value
});
const count = ref(0);
const countPositive = ref(0);
const countNegative = ref(0);

const page = ref(1)
const perPage = 10
const totalPages = computed(() => Math.ceil(count.value / perPage))

const pageNumbers = computed(() => {
  const total = totalPages.value
  const current = page.value
  const delta = 2
  const range = []

  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.push(i)
  }

  if (range[0] > 2) {
    range.unshift('...')
  }
  if (range[0] !== 1) {
    range.unshift(1)
  }

  if (range[range.length - 1] < total - 1) {
    range.push('...')
  }
  if (range[range.length - 1] !== total) {
    range.push(total)
  }

  return range
})

const fetchReviews = () => {
  const location = selectedLocation.value;
  const rating = selectedRating.value;
  const type = selectedType.value;
  const currentPage = page.value;
  fetch(`http://localhost:5000/api/data-gmaps?location=${location}&rating=${rating}&type=${type}&page=${currentPage}&per_page=${perPage}`)

    .then(res => res.json())
    .then(data => {
      reviews.value = data.reviews;
      count.value = data.count;
      countPositive.value = data.countPositive;
      countNegative.value = data.countNegative;
      console.log(data.reviews);
    })
    .catch(err => {
      console.error("Gagal mengambil data:", err);
    });
};

const goToPage = (p) => {
  if (p !== '...') {
    page.value = p
  }
}

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++
  }
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
  }
}

const start = computed(() => {
  return (page.value - 1) * perPage + 1
})

const end = computed(() => {
  return Math.min(page.value * perPage, count.value)
})


onMounted(() => {
  fetchReviews();
});

// watch([selectedLocation, selectedRating, selectedType], () => {
//   page.value = 1
// })


// watch([selectedLocation, selectedRating, selectedType, page], fetchReviews, );
// Reset page ke 1 saat filter berubah
watch([selectedLocation, selectedRating, selectedType], () => {
  page.value = 1
})

// Fetch data saat page atau filter berubah
watch([page, selectedLocation, selectedRating, selectedType], () => {
  fetchReviews()
})


import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LogarithmicScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LogarithmicScale)

const chartDataGrouped = {
  labels: [1, 2, 3, 4, 5],
  datasets: [
    {
      label: 'Type A',
      data: [578, 109, 161, 262, 1149],
      backgroundColor: '#dc3545',
      borderColor: 'transparent',
      borderWidth: 2.5,
      barPercentage: 0.4
    },
    {
      label: 'Type B',
      data: [2019, 441, 599, 1257, 7946],
      backgroundColor: '#007bff',
      borderColor: 'transparent',
      borderWidth: 2.5,
      barPercentage: 0.4
    },
    {
      label: 'Type C',
      data: [629, 136, 170, 246, 2817],
      backgroundColor: '#28a745',
      borderColor: 'transparent',
      borderWidth: 2.5,
      barPercentage: 0.4
    },
    {
      label: 'Type D',
      data: [794, 168, 197, 292, 2689],
      backgroundColor: '#ffc107',
      borderColor: 'transparent',
      borderWidth: 2.5,
      barPercentage: 0.4
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      type: 'logarithmic',
      ticks: {
        callback: function (value) {
          return Number(value.toString());
        }
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        autoSkip: false,
        maxRotation: 45,
        minRotation: 0
      }
    }
  },
  plugins: {
    legend: {
      position: 'top',
      labels: {
        boxWidth: 25
      }
    },
    tooltip: {
      mode: 'index',
      intersect: false
    }
  }
}

// const chartData1 = {
//   labels: [1, 2, 3, 4, 5],
//   datasets: [
//     {
//       label: 'Count',
//       data: [578, 109, 161, 262, 1149],
//       backgroundColor: '#dc3545',
//       borderColor: 'transparent',
//       borderWidth: 2.5,
//       barPercentage: 0.4
//     }
//   ]
// }

// const chartData2 = {
//   labels: [1, 2, 3, 4, 5],
//   datasets: [
//     {
//       label: 'Count',
//       data: [2019, 441, 599, 1257, 7946],
//       backgroundColor: '#007bff',
//       borderColor: 'transparent',
//       borderWidth: 2.5,
//       barPercentage: 0.4
//     }
//   ]
// }

// const chartData3 = {
//   labels: [1, 2, 3, 4, 5],
//   datasets: [
//     {
//       label: 'Count',
//       data: [629, 136, 170, 246, 2817],
//       backgroundColor: '#28a745',
//       borderColor: 'transparent',
//       borderWidth: 2.5,
//       barPercentage: 0.4
//     }
//   ]
// }

// const chartData4 = {
//   labels: [1, 2, 3, 4, 5],
//   datasets: [
//     {
//       label: 'Count',
//       data: [794, 168, 197, 292, 2689],
//       backgroundColor: '#ffc107',
//       borderColor: 'transparent',
//       borderWidth: 2.5,
//       barPercentage: 0.4
//     }
//   ]
// }


// const chartOptions = {
//   responsive: true,
//   scales: {
//     y: {
//       ticks: {
//         stepSize: 100
//       },
//       grid: {}
//     },
//     x: {
//       grid: {
//         display: false
//       }
//     }
//   }
// }

// const chartOptions = {
//   responsive: true,
//   scales: {
//     y: {
//       type: 'logarithmic',
//       ticks: {
//         callback: function (value) {
//           return Number(value.toString());
//         }
//       }
//     },
//     x: {
//       grid: {
//         display: false
//       }
//     }
//   }
// }

</script>

<style scoped></style>
