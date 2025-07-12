<template>
            <div class="container px-6 mx-auto grid h-full overflow-y-auto" ref="scrollContainer">
                <div
                    class="p-4 mt-5 bg-white dark:bg-[#374151] rounded-lg shadow-md focus:outline-none border-1 border-gray-100">
                    <div class="text-gray-600 py-1 px-3">
                        <h1 class="text-lg font-semibold lg:text-[28px] mb-2 text-gray-700 dark:text-gray-300">Topic
                            Insight Explorer at Hospitals in
                            Yogyakarta</h1>
                        <p class="text-[15px] mb-5 text-gray-700 dark:text-gray-300">Analisis LDA (Latent Dirichlet Allocation)</p>
                        <ul class="space-y-1 text-gray-700 dark:text-gray-300 list-disc list-inside">
                            <li>
                                <strong>Topic Highlights</strong><br>
                                <span class="inline-block ml-6">
                                    Menyajikan ringkasan utama dari topik yang ditemukan, termasuk topik positif dan
                                    negatif. Setiap topik mencakup kata-kunci utama dan wawasan penting yang dapat
                                    membantu memahami konteks ulasan atau komentar.
                                </span>
                            </li>
                            <li>
                                <strong>Coherence Score</strong><br>
                                <span class="inline-block ml-6">
                                    Menampilkan visualisasi skor koherensi setiap topik yang ditemukan. Skor ini
                                    menunjukkan seberapa baik kata-kata dalam topik saling terkait secara semantik,
                                    dengan skor lebih tinggi menunjukkan kualitas topik yang lebih baik.
                                </span>
                            </li>
                            <li>
                                <strong>Words Topic</strong><br>
                                <span class="inline-block ml-6">
                                    Daftar kata-kata utama yang menjadi ciri khas setiap topik. Ini membantu
                                    menggambarkan tema atau subjek yang mendominasi dalam setiap topik.
                                </span>
                            </li>
                            <li>
                                <strong>Topic Distance Map</strong><br>
                                <span class="inline-block ml-6">
                                    Visualisasi peta jarak antar topik menggunakan diagram yang menunjukkan hubungan
                                    atau kemiripan antar topik. Topik yang berdekatan menunjukkan hubungan semantik yang
                                    lebih erat.
                                </span>
                            </li>
                            <li>
                                <strong>Representative Sentence</strong><br>
                                <span class="inline-block ml-6">
                                    Tabel yang memuat kalimat representatif dari data untuk setiap topik. Kalimat ini
                                    dipilih karena merepresentasikan isi utama dari topik tersebut dan membantu memahami
                                    konteks ulasan atau komentar secara lebih spesifik.
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <TabTopic />

                <div class="flex justify-end items-center p-4">
                    <div  @click="scrollToTop"
                        class="p-5 bg-blue-500 rounded-full shadow-md focus:outline-none w-5 h-5 flex justify-center items-center cursor-pointer">
                       <font-awesome-icon :icon="['fas', 'arrow-up']" class="text-white"/>
                    </div>
                </div>

                <!-- <div class="">
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

                </div> -->
            </div>
</template>

<script setup>
import { ref } from 'vue';
import TabTopic from '../components/TabTopic.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const scrollContainer = ref(null)

function scrollToTop() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

</script>

<style lang="scss" scoped></style>