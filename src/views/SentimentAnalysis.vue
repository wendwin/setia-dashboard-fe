<template>
    <div>
        <main class="h-full overflow-y-auto">
            <div class="container px-6 mx-auto grid">
                <!-- <div class="flex items-center justify-between p-4 my-5 font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"> -->
                <div class="flex items-center justify-between p-4 my-5 font-semibold text-purple-100 bg-white rounded-lg shadow-md focus:outline-none ">
                    <div>
                        <!-- <div class="text-gray-600">
                            <h1 class="text-lg lg:text-[28px] mb-2 ">Sentiment Insight Explorer at Hospitals in Yogyakarta</h1>
                            <p class="text-[15px] mb-5">Analyzing Patient Sentiment with Support Vector Machine</p>
                            <ul>
                                <li >Positive & Negative Highlights <span class="inline-block">Ringkasan temuan utama dalam ulasan dengan sentimen positif dan negatif, mencakup aspek yang dihargai pasien serta area yang perlu perbaikan.</span></li>
                                <li>Accuracy Train & Test <span class="inline-block">Menampilkan tingkat akurasi model sentimen untuk data pelatihan dan pengujian, memberikan gambaran kualitas prediksi.</span></li>
                                <li>Sentiment Real (Pie Chart) <span class="inline-block">Visualisasi distribusi sentimen aktual (positif, negatif, netral) berdasarkan data ulasan asli pasien.</span></li>
                                <li>Sentiment Predicted (Pie Chart) <span class="inline-block">Visualisasi distribusi sentimen yang diprediksi oleh model, untuk membandingkan hasil klasifikasi dengan data nyata.</span></li>
                                <li>Wordcloud Positive & Negative Sentiment <span class="inline-block">Representasi visual kata-kata yang sering muncul dalam ulasan positif dan negatif.</span></li>
                                <li>Data Sentimen (Table) <span class="inline-block">Tabel interaktif berisi data ulasan pasien, sentimen yang dihasilkan, dan informasi relevan lainnya untuk eksplorasi lebih lanjut.</span></li>
                            </ul>
                        </div> -->
                    </div>
                </div>

                <TabSentiment />
                
            </div>
        </main>
    </div>
</template>

<script setup>
import TabSentiment from '../components/TabSentiment.vue';
</script>

<style scoped></style>s
