<template>
    <div>
        <div class="grid gap-6 mb-8 lg:grid-cols-2">
            <div>
                <div
                    class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 border border-gray-200 dark:border-none">
                    <div class="md:flex justify-evenly">
                        <div class=" text-center">
                            <h2 class="font-semibold mb-2 text-gray-800 dark:text-gray-300">Sentiment Real</h2>
                            <ChartSentimentRealTypeC />
                            <div class="md:hidden mt-6">
                                <h1 class="text-xl lg:text-2xl text-gray-800 dark:text-gray-300">99,6%</h1>
                                <h2 class="text-base  text-gray-800 dark:text-gray-300">Accuracy Train</h2>
                            </div>
                        </div>
                        <div class=" text-center">
                            <h2 class="font-semibold mb-2 text-gray-800 dark:text-gray-300">Sentiment Prediction</h2>
                            <ChartSentimentPredictTypeC />
                            <div class="md:hidden mt-6">
                                <h1 class="text-xl lg:text-2xl text-gray-800 dark:text-gray-300">94,5%</h1>
                                <h2 class="text-base text-gray-800 dark:text-gray-300">Accuracy Train</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hidden md:flex justify-around mt-3 gap-3 text-center">
                    <div
                        class="w-full p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 border border-gray-200 dark:border-none">
                        <h1 class="text-xl lg:text-2xl font-semibold text-gray-800 dark:text-gray-300">99,6%</h1>
                        <h2 class="text-base  text-gray-800 dark:text-gray-300">Accuracy Train</h2>
                    </div>
                    <div
                        class="w-full p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 border border-gray-200 dark:border-none">
                        <h1 class="text-xl lg:text-2xl font-semibold text-gray-800 dark:text-gray-300">94,5%</h1>
                        <h2 class="text-base text-gray-800 dark:text-gray-300">Accuracy Train</h2>
                    </div>
                </div>
            </div>

            <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <div>
                    <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                        Summary Insight
                    </h4>
                    <fwb-accordion>
                        <fwb-accordion-panel class="w-full">
                            <fwb-accordion-header>Positive Sentiment Highlights</fwb-accordion-header>
                            <fwb-accordion-content>
                                <p class="mb-2 text-gray-500 dark:text-gray-400">
                                    Positive sentiment rs type a
                                </p>
                                <p class="text-gray-500 dark:text-gray-400">
                                    Check out this guide to learn how to <a href="/docs/getting-started/introduction/"
                                        class="text-blue-600 hover:underline dark:text-blue-500">get started</a> and
                                    start developing websites even faster with components on top of Tailwind CSS.
                                </p>
                            </fwb-accordion-content>
                        </fwb-accordion-panel>

                        <fwb-accordion-panel>
                            <fwb-accordion-header>Negative Sentiment Highlights</fwb-accordion-header>
                            <fwb-accordion-content>
                                <p class="mb-2 text-gray-500 dark:text-gray-400">
                                    Flowbite is first conceptualized and designed using the Figma software so everything
                                    you see in the library has a design equivalent in our Figma file.
                                </p>
                                <p class="text-gray-500 dark:text-gray-400">
                                    Check out the <a href="https://flowbite.com/figma/"
                                        class="text-blue-600 hover:underline dark:text-blue-500">Figma design system</a>
                                    based on the utility classes from Tailwind CSS and components from Flowbite.
                                </p>
                            </fwb-accordion-content>
                        </fwb-accordion-panel>
                    </fwb-accordion>
                </div>
            </div>
        </div>

        <div class="grid gap-6 mb-8 md:grid-cols-2">
            <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
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
            <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
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
            <p class="text-base lg:text-lg text-white">Eksplorasi Data Sentimen 24 Rumah Sakit di Yogyakarta menggunakan Algoritma Support Vector Machine untuk memahami opini dan persepsi pasien atau pengguna layanan melalui ulasan yang diberikan</p>
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
import ChartSentimentRealTypeC from '@/components/chart/ChartSentimentRealTypeC.vue'
import ChartSentimentPredictTypeC from '@/components/chart/ChartSentimentPredictTypeC.vue'
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
  const minSize = 0.9;   // Ukuran minimum (em)
  const maxSize = 2.0;   // Ukuran maksimum (em)
  const scale = frequency / maxFrequency;
  const size = minSize + scale * (maxSize - minSize);

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
        const res = await fetch(`http://localhost:5000/api/sentiment-analysis/word-cloud/type-c`);
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