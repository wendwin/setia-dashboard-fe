<template>
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

        <div v-if="isLoading" class="flex justify-center items-center py-4">
            <div class="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>

        <div :class="{ hidden: isLoading, block: !isLoading }" v-if="!isLoading">
            <div v-if="reviews.length"
                class="my-5 bg-white shadow-xs dark:bg-gray-800 border bottom-1 border-gray-200 dark:border-none">

                <div class="overflow-x-auto">
                    <table class="table-auto border-collapse border border-gray-400 w-full">
                        <thead>
                            <tr>
                                <th class="border border-gray-300 dark:text-white p-2">No</th>
                                <th v-if="path === 'case-folding'" class="border border-gray-300 dark:text-white p-2">
                                    Case Folding</th>
                                <th v-if="path === 'data-cleaning'" class="border border-gray-300 dark:text-white p-2">
                                    Data Cleaning</th>
                                <th v-if="path === 'normalization'" class="border border-gray-300 dark:text-white p-2">
                                    Normalization</th>
                                <th v-if="path === 'tokenization'" class="border border-gray-300 dark:text-white p-2">
                                    Tokenization</th>
                                <th v-if="path === 'stemming'" class="border border-gray-300 dark:text-white p-2">
                                    Stemming</th>
                                <th class="border border-gray-300 dark:text-white p-2">Rating</th>
                                <th class="border border-gray-300 dark:text-white p-2">Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(review, index) in reviews" :key="index">
                                <td class="border border-gray-300 dark:text-white p-2 text-center">
                                    {{ (page - 1) * perPage + index + 1 }}
                                </td>

                                <td v-if="path === 'case-folding'" class="border border-gray-300 dark:text-white p-2">
                                    {{ review.casefold_text }}
                                </td>
                                <td v-if="path === 'data-cleaning'" class="border border-gray-300 dark:text-white p-2">
                                    {{ review.clean_text }}
                                </td>
                                <td v-if="path === 'normalization'" class="border border-gray-300 dark:text-white p-2">
                                    {{ review.slang_text }}
                                </td>
                                <td v-if="path === 'tokenization'" class="border border-gray-300 dark:text-white p-2">
                                    {{ review.token_text }}
                                </td>
                                <td v-if="path === 'stemming'" class="border border-gray-300 dark:text-white p-2">
                                    {{ review.stemmed_text_done }}
                                </td>

                                <td class="border border-gray-300 dark:text-white p-2 text-center">
                                    {{ review.rating }}
                                </td>
                                <td class="border border-gray-300 dark:text-white p-2 text-center">
                                    {{ review.type_rs }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="w-full flex flex-col gap-2 px-4 py-3 text-xs font-semibold tracking-wide 
             text-gray-500 border-t dark:border-gray-700 bg-gray-50 
             dark:text-gray-400 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between">

                    <span class="flex items-center justify-center sm:justify-start">
                        Showing {{ start }}–{{ end }} of {{ totalPages }}
                    </span>

                    <nav aria-label="Table navigation" class="flex justify-center sm:justify-end">
                        <ul class="inline-flex items-center space-x-1">

                            <li>
                                <button @click="prevPage" :disabled="page === 1"
                                    class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Previous">
                                    <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clip-rule="evenodd" fill-rule="evenodd" />
                                    </svg>
                                </button>
                            </li>

                            <li v-for="num in pageNumbers" :key="num">
                                <button v-if="num !== '...'" @click="goToPage(num)" :class="[
                                    'px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple',
                                    page === num ? 'bg-blue-500 text-white border border-blue-500' : 'bg-white dark:bg-gray-700'
                                ]">
                                    {{ num }}
                                </button>
                                <span v-else class="px-3 py-1">...</span>
                            </li>

                            <li>
                                <button @click="nextPage" :disabled="page === totalPages"
                                    class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Next">
                                    <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd" fill-rule="evenodd" />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <p v-else class="text-center mt-5 dark:text-white font-semibold">Data Not Found...</p>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed } from 'vue';

const props = defineProps({ path: String });

// const hospitals = [
//   { value: 'rs_at_turots_al_islamy', label: 'RS At Turots Al Islamy' },
//   { value: 'rs_bethesda_lempuyangwangi', label: 'RS Bethesda Lempuyangwangi' },
//   { value: 'rs_bethesda_yogyakarta', label: 'RS Bethesda Yogyakarta' },
//   { value: 'rs_bhayangkara_polda_diy', label: 'RS Bhayangkara Polda DIY' },
//   { value: 'rs_mata_dr_yap', label: 'RS Mata Dr YAP' },
//   { value: 'rs_mitra_paramedika', label: 'RS Mitra Paramedika' },
//   { value: 'rs_nur_hidayah', label: 'RS Nur Hidayah' },
//   { value: 'rs_panti_rapih', label: 'RS Panti Rapih' },
//   { value: 'rs_pku_muhammadiyah_bantul', label: 'RS PKU Muhammadiyah Bantul' },
//   { value: 'rs_pku_muhammadiyah_gamping', label: 'RS PKU Muhammadiyah Gamping' },
//   { value: 'rs_pku_muhammadiyah_wonosari', label: 'RS PKU Muhammadiyah Wonosari' },
//   { value: 'rs_pku_muhammadiyah_yogyakarta', label: 'RS PKU Muhammadiyah Yogyakarta' },
//   { value: 'rs_queen_latifa', label: 'RS Queen Latifa' },
//   { value: 'rs_u_rajawali_citra', label: 'RSU Rajawali Citra' },
//   { value: 'rsud_kota_yogyakarta', label: 'RSUD Kota Yogyakarta' },
//   { value: 'rsud_nyi_ageng_serang', label: 'RSUD Nyi Ageng Serang' },
//   { value: 'rsud_panembahan_senopati', label: 'RSUD Panembahan Senopati' },
//   { value: 'rsud_prambanan', label: 'RSUD Prambanan' },
//   { value: 'rsud_sleman', label: 'RSUD Sleman' },
//   { value: 'rsud_wates', label: 'RSUD Wates' },
//   { value: 'rsud_wonosari', label: 'RSUD Wonosari' },
//   { value: 'rspau_hardjolukito', label: 'RSPAU Hardjolukito' },
//   { value: 'rsu_rajawali_citra', label: 'RSU Rajawali Citra' },
//   { value: 'rsup_dr_sardjito_yogyakarta', label: 'RSUP Dr Sardjito Yogyakarta' },
//   { value: 'rst_dr_soetarto_yogyakarta', label: 'RST Dr Soetarto Yogyakarta' },
// ];


const hospitals = [
    { value: 'rsup_dr_sardjito_yogyakarta', label: 'RS-A1' },
    { value: 'rsud_panembahan_senopati', label: 'RS-B1' },
    { value: 'rsud_kota_yogyakarta', label: 'RS-B2' },
    { value: 'rspau_hardjolukito', label: 'RS-B3' },
    { value: 'rs_bethesda_yogyakarta', label: 'RS-B4' },
    { value: 'rsud_wates', label: 'RS-B5' },
    { value: 'rsud_wonosari', label: 'RS-B6' },
    { value: 'rs_mata_dr_yap', label: 'RS-B7' },
    { value: 'rsud_sleman', label: 'RS-B8' },
    { value: 'rs_pku_muhammadiyah_yogyakarta', label: 'RS-B9' },
    { value: 'rs_pku_muhammadiyah_gamping', label: 'RS-B10' },
    { value: 'rs_panti_rapih', label: 'RS-B11' },
    { value: 'rs_pku_muhammadiyah_bantul', label: 'RS-C1' },
    { value: 'rsud_nyi_ageng_serang', label: 'RS-C2' },
    { value: 'rsud_prambanan', label: 'RS-C3' },
    { value: 'rs_at_turots_al_islamy', label: 'RS-C4' },
    { value: 'rst_dr_soetarto_yogyakarta', label: 'RS-C5' },
    { value: 'rs_queen_latifa', label: 'RS-D1' },
    { value: 'rs_mitra_paramedika', label: 'RS-D2' },
    { value: 'rs_bhayangkara_polda_diy', label: 'RS-D3' },
    { value: 'rsu_rajawali_citra', label: 'RS-D4' },
    { value: 'rs_nur_hidayah', label: 'RS-D5' },
    { value: 'rs_bethesda_lempuyangwangi', label: 'RS-D6' },
    { value: 'rs_pku_muhammadiyah_wonosari', label: 'RS-D7' }
];

const isLoading = ref(false)
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
const page = ref(1)
const perPage = 10
const totalPages = ref(0);

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


const baseUrl = import.meta.env.VITE_API_URL;

const fetchReviews = async () => {
    isLoading.value = true
    try {
        const location = selectedLocation.value
        const rating = selectedRating.value
        const type = selectedType.value
        const currentPage = page.value

        const res = await fetch(`${baseUrl}/api/data-gmaps/preprocessing/${props.path}?location=${location}&rating=${rating}&type=${type}&page=${currentPage}&per_page=${perPage}`)
        const data = await res.json()

        reviews.value = data.reviews
        count.value = data.count
        totalPages.value = data.pagination.total_pages
    } catch (err) {
        console.error("Gagal mengambil data:", err)
    } finally {
        isLoading.value = false
    }
}
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


watch([selectedLocation, selectedRating, selectedType, page], fetchReviews,);

watch([selectedLocation, selectedRating, selectedType], () => {
    page.value = 1
})

// Fetch data saat page atau filter berubah
watch([page, selectedLocation, selectedRating, selectedType], () => {
    fetchReviews()
})


watch(() => props.path, (newPath) => {
    fetchReviews()
})
</script>

<style lang="scss" scoped></style>