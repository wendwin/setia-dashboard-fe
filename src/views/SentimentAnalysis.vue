<template>
    <!-- <div class="container px-6 mx-auto grid h-full overflow-y-auto" ref="scrollContainer"> -->
    <div class="container px-6 mx-auto grid " ref="scrollContainer">
        <div
            class="p-4 my-5 bg-white dark:bg-[#374151] rounded-lg shadow-md focus:outline-none border-1 border-gray-100">
            <div class="text-gray-600 py-1 px-3">
                <h1 class="text-lg font-semibold lg:text-[28px] mb-2 text-gray-700 dark:text-gray-300">Sentiment Insight
                    Explorer at Hospitals in
                    Yogyakarta</h1>
                <p class="text-[15px] mb-5 text-gray-700 dark:text-gray-300">Analyzing Patient Sentiment with Support
                    Vector Machine</p>
                <ul class="space-y-1 text-gray-700 dark:text-gray-300 list-disc list-inside">
                    <li>
                        <strong>Positive & Negative Highlights</strong><br>
                        <span class="inline-block ml-6">
                            Ringkasan temuan utama dalam ulasan dengan sentimen positif dan negatif,
                            mencakup
                            aspek yang dihargai pasien serta area yang perlu perbaikan.
                        </span>
                    </li>
                    <li>
                        <strong>Accuracy Train & Test</strong><br>
                        <span class="inline-block ml-6">
                            Menampilkan tingkat akurasi model sentimen untuk data pelatihan dan pengujian,
                            memberikan gambaran kualitas prediksi.
                        </span>
                    </li>
                    <li>
                        <strong>Sentiment Real (Pie Chart)</strong><br>
                        <span class="inline-block ml-6">
                            Visualisasi distribusi sentimen aktual (positif, negatif, netral) berdasarkan
                            data
                            ulasan asli pasien.
                        </span>
                    </li>
                    <li>
                        <strong>Sentiment Predicted (Pie Chart)</strong><br>
                        <span class="inline-block ml-6">
                            Visualisasi distribusi sentimen yang diprediksi oleh model, untuk membandingkan
                            hasil klasifikasi dengan data nyata.
                        </span>
                    </li>
                    <li>
                        <strong>Wordcloud Positive & Negative Sentiment</strong><br>
                        <span class="inline-block ml-6">
                            Representasi visual kata-kata yang sering muncul dalam ulasan positif dan
                            negatif.
                        </span>
                    </li>
                    <li>
                        <strong>Data Sentimen (Table)</strong><br>
                        <span class="inline-block ml-6">
                            Tabel interaktif berisi data ulasan pasien, sentimen yang dihasilkan, dan
                            informasi
                            relevan lainnya untuk eksplorasi lebih lanjut.
                        </span>
                    </li>
                </ul>
            </div>
        </div>

        <TabSentiment />

        <div class="w-full overflow-x-auto">
            <div class="flex flex-wrap gap-3 items-center mt-4">
                <h4 class=" text-gray-800 dark:text-gray-300">Filter By</h4>
                <select v-model="selectedLocation" @change="fetchSentimentData"
                    class="px-4 py-2 text-sm font-medium leading-5 transition-colors duration-150 border border-1 text-gray-600 border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white dark:border-none">
                    <option value="all">All Hospital</option>
                    <option v-for="hospital in hospitals" :key="hospital.value" :value="hospital.value">
                        {{ hospital.label }}
                    </option>
                </select>

                <select v-model="selectedRating" @change="fetchSentimentData"
                    class="px-4 py-2 text-sm font-medium leading-5 transition-colors duration-150 border border-1 text-gray-600 border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white dark:border-none">
                    <option value="all">All Rating</option>
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                </select>

                <select v-model="selectedType" @change="fetchSentimentData"
                    class="px-4 py-2 text-sm font-medium leading-5 transition-colors duration-150 border border-1 text-gray-600 border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white dark:border-none">
                    <option value="all">All Type</option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>
                    <option value="d">D</option>
                </select>
            </div>

            <div v-if="sentiments.length"
                class="my-5 overflow-x-auto bg-white shadow-xs dark:bg-gray-800 border bottom-1 border-gray-200 dark:border-none">
                <table class="table-auto border-collapse border border-gray-400 w-full">
                    <thead>
                        <tr>
                            <th class="border border-gray-300 dark:text-white p-2">No</th>
                            <th class="border border-gray-300 dark:text-white p-2">Review</th>
                            <th class="border border-gray-300 dark:text-white p-2">Rating</th>
                            <th class="border border-gray-300 dark:text-white p-2">Sentiment</th>
                            <th class="border border-gray-300 dark:text-white p-2">Prediction</th>
                            <th class="border border-gray-300 dark:text-white p-2">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(sentiment, index) in sentiments" :key="index">
                            <td class="border border-gray-300 dark:text-white p-2 text-center">{{ (page - 1) *
                                perPage + index + 1 }}</td>
                            <td class="border border-gray-300 dark:text-white p-2 ">{{
                                sentiment.stemmed_text_done }}</td>
                            <td class="border border-gray-300 dark:text-white p-2">{{ sentiment.rating }}</td>
                            <td class="border border-gray-300 dark:text-white p-2">{{ sentiment.label }}</td>
                            <td class="border border-gray-300 dark:text-white p-2 text-center">{{
                                sentiment.predicted_sentiment }}</td>
                            <td class="border border-gray-300 dark:text-white p-2 text-center">{{
                                sentiment.type_rs }}</td>
                        </tr>
                    </tbody>
                </table>
                <div
                    class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500  border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                    <span class="flex items-center col-span-3">
                        Showing {{ start }}–{{ end }} of {{ totalPages }}
                    </span>
                    <span class="col-span-2"></span>

                    <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                        <nav aria-label="Table navigation">
                            <ul class="inline-flex items-center">
                                <ul class="inline-flex items-center">
                                    <li>
                                        <button @click="prevPage" :disabled="page === 1"
                                            class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
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
                                            page === num ? 'bg-purple-600 text-white border border-purple-600' : ''
                                        ]">
                                            {{ num }}
                                        </button>
                                        <span v-else class="px-3 py-1">...</span>
                                    </li>

                                    <li>
                                        <button @click="nextPage" :disabled="page === totalPages"
                                            class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                                            aria-label="Next">
                                            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                <path
                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                    clip-rule="evenodd" fill-rule="evenodd" />
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

        <!-- <div class="flex justify-end items-center p-4 ">
            <div @click="scrollToTop"
                class="p-5 bg-blue-500 rounded-full shadow-md focus:outline-none w-5 h-5 flex justify-center items-center cursor-pointer">
                <font-awesome-icon :icon="['fas', 'arrow-up']" class="text-white" />
            </div>
        </div> -->
    </div>
</template>

<script setup>
import { ref, reactive, computed, watch, provide, onMounted } from 'vue';
import TabSentiment from '../components/TabSentiment.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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

const sentiments = ref([]);
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

const scrollContainer = ref(null)

function scrollToTop() {
    if (scrollContainer.value) {
        scrollContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

async function fetchSentimentData() {
    try {
        const location = selectedLocation.value;
        const rating = selectedRating.value;
        const type = selectedType.value;
        const currentPage = page.value;

        const res = await fetch(`http://localhost:5000/api/sentiment-analysis?location=${location}&rating=${rating}&type=${type}&page=${currentPage}&per_page=${perPage}`)
        const data = await res.json()
        sentiments.value = data.sentiment
        count.value = data.count
        console.log(data)
    } catch (error) {
        console.error('Fetch error:', error)
    }
}

onMounted(() => {
    fetchSentimentData()
})

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

watch([selectedLocation, selectedRating, selectedType], () => {
    page.value = 1
})

watch([page, selectedLocation, selectedRating, selectedType], () => {
    fetchSentimentData()
})
</script>

<style scoped></style>s
