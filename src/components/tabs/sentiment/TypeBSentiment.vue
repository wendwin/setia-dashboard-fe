<template>
    <div>
        <div class="grid gap-6 mb-4 md:grid-cols-2">
            <div class="p-4 bg-white rounded-lg dark:bg-gray-800 shadow-md border border-gray-200 dark:border-none">
                <h2 class="font-semibold lg:text-lg mb-4 text-gray-800 dark:text-gray-300 text-center">Sentiment Real</h2>
                <ChartSentimentRealTypeB />
            </div>

            <div class="p-4 bg-white rounded-lg dark:bg-gray-800 shadow-md border border-gray-200 dark:border-none">
                <h2 class="font-semibold lg:text-lg mb-4 text-gray-800 dark:text-gray-300 text-center">Sentiment Prediction</h2>
                <ChartSentimentPredictTypeB />
            </div>
        </div>

        <div class="grid gap-3 md:gap-6 mb-8 md:grid-cols-2">
            <div
                class="w-full text-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 border border-gray-200 dark:border-none">
                <h1 class="text-xl lg:text-2xl font-semibold text-gray-800 dark:text-gray-300">99,6%</h1>
                <h2 class="text-base  text-gray-800 dark:text-gray-300">Accuracy Train</h2>
            </div>
            <div
                class="w-full text-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 border border-gray-200 dark:border-none">
                <h1 class="text-xl lg:text-2xl font-semibold text-gray-800 dark:text-gray-300">94,5%</h1>
                <h2 class="text-base text-gray-800 dark:text-gray-300">Accuracy Tes</h2>
            </div>
        </div>

        <div class="grid gap-6 mb-8 md:grid-cols-2">
            <div class="min-w-0 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h4 class="mb-6 font-semibold text-gray-800 dark:text-gray-300">
                    Wordcloud Positive Sentiment
                </h4>
                <div class="flex flex-wrap justify-center gap-3">
                    <span v-for="(item, index) in wordFreqPos" :key="index" class="tag"
                        :style="getTagStyle(item.Frequency, maxFreqPos)">
                        {{ item.Word }}
                    </span>
                </div>
            </div>
            <div class="min-w-0 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                    Negative Sentiment Highlights
                </h4>
                <div class="flex flex-wrap justify-center gap-3">
                    <span v-for="(item, index) in wordFreqNeg" :key="index" class="tag"
                        :style="getTagStyle(item.Frequency, maxFreqNeg)">
                        {{ item.Word }}
                    </span>
                </div>
            </div>
        </div>

        <div class="w-full bg-blue-600 text-center rounded-lg p-5">
            <h1 class="text-xl lg:text-2xl font-semibold text-white mb-4">Data Sentimen Explorer</h1>
            <p class="text-base lg:text-lg text-white">Eksplorasi Data Sentimen RSU Queen Latifa Yogyakarta menggunakan Algoritma Support Vector Machine untuk memahami opini dan persepsi pasien atau pengguna layanan di RSU Queen Latifa Yogyakarta melalui ulasan yang diberikan.</p>
        </div>
    </div>
</template>

<script setup>
import {
    FwbAccordion,
    FwbAccordionPanel,
    FwbAccordionHeader,
    FwbAccordionContent,
} from 'flowbite-vue'
import ChartSentimentRealTypeB from '@/components/chart/ChartSentimentRealTypeB.vue'
import ChartSentimentPredictTypeB from '@/components/chart/ChartSentimentPredictTypeB.vue'
import { ref, onMounted, computed } from 'vue';

const wordFreqNeg = ref([]);
const wordFreqPos = ref([]);

const maxFreqNeg = computed(() =>
    wordFreqNeg.value.length ? Math.max(...wordFreqNeg.value.map(w => w.Frequency)) : 1
);
const maxFreqPos = computed(() =>
    wordFreqPos.value.length ? Math.max(...wordFreqPos.value.map(w => w.Frequency)) : 1
);

function getTagStyle(frequency, maxFrequency) {
  const minSize = 0.9;   
  const mamdize = 2.0; 
  const scale = frequency / maxFrequency;
  const size = minSize + scale * (mamdize - minSize);

  const hue = Math.floor(240 - scale * 240);
  const color = `hsl(${hue}, 70%, 50%)`;

  return {
    fontSize: `${size}em`,
    color,
    fontWeight: '600',
    lineHeight: 1,
  };
}

async function fetchSentimentWordCloud() {
    try {
        const res = await fetch(`http://localhost:5000/api/sentiment-analysis/word-cloud/type-b`);
        const data = await res.json();
        wordFreqNeg.value = data.word_freq_neg;
        wordFreqPos.value = data.word_freq_pos;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

onMounted(() => {
    fetchSentimentWordCloud();
});

</script>

<style scoped>
::v-deep(fwb-accordion-panel summary) {
    display: block;
    width: 100%;
}

.tag {
  padding: 0.1em 0.3em;
  white-space: nowrap;
  transition: transform 0.2s ease;
  user-select: none;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.tag:hover {
  transform: scale(1.1);
}

</style>