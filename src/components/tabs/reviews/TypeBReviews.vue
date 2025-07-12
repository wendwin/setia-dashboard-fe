<template>
    <div>
        <div class="grid gap-6 mb-8 md:grid-cols-2 items-stretch">
            <!-- <div
                class="p-4 bg-white rounded-lg dark:bg-gray-800 shadow-md border border-gray-200 dark:border-none h-full flex flex-col justify-between">
                <div class="lg:flex items-center justify-evenly flex-grow">
                    <div class="flex items-center mb-5 lg:mb-0">
                        <div
                            class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                            <font-awesome-icon :icon="['fas', 'hospital']" class="text-xl" />
                        </div>
                        <div>
                            <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                Total Reviews
                            </p>
                            <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                12,262
                            </p>
                        </div>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Hospitals</p>
                        <ul>
                            <li class="text-sm text-gray-600 dark:text-gray-400">RS-B1</li>
                            <li class="text-sm text-gray-600 dark:text-gray-400">RS-B2</li>
                            <li class="text-sm text-gray-600 dark:text-gray-400">RS-B3</li>
                            <li class="text-sm text-gray-600 dark:text-gray-400">RS-B4</li>
                            <li class="text-sm text-gray-600 dark:text-gray-400">RS-B5</li>
                            <li class="text-sm text-gray-600 dark:text-gray-400">RS-B6</li>
                            <li class="text-sm text-gray-600 dark:text-gray-400">RS-B7</li>
                            <li class="text-sm text-gray-600 dark:text-gray-400">RS-B8</li>
                            <li class="text-sm text-gray-600 dark:text-gray-400">RS-B9</li>
                            <li class="text-sm text-gray-600 dark:text-gray-400">RS-B10</li>
                            <li class="text-sm text-gray-600 dark:text-gray-400">RS-B11</li>
                        </ul>
                    </div>
                </div>
            </div> -->
            <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-none flex flex-col h-full">
                <div class="flex items-center mb-6">
                    <div
                        class="p-4 rounded-full bg-orange-100 text-orange-500 dark:bg-orange-500 dark:text-orange-100 mr-4">
                        <font-awesome-icon :icon="['fas', 'hospital']" class="text-xl" />
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Total Reviews</p>
                        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">12,262</h2>
                    </div>
                </div>

                <hr class="border-gray-200 dark:border-gray-700 mb-4" />

                <div class="flex-grow">
                    <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Hospitals</p>
                    <ul class="columns-2 sm:columns-3 md:columns-4 space-y-1">
                        <li v-for="rs in ['RS-B1', 'RS-B2', 'RS-B3', 'RS-B4', 'RS-B5', 'RS-B6', 'RS-B7', 'RS-B8', 'RS-B9', 'RS-B10', 'RS-B11']"
                            :key="rs" class="break-inside-avoid text-sm text-gray-700 dark:text-gray-300">
                            • {{ rs }}
                        </li>
                    </ul>
                </div>
            </div>


            <div
                class="p-4 bg-white rounded-lg dark:bg-gray-800 shadow-md border border-gray-200 dark:border-none h-full flex flex-col">
                <div class="flex-grow flex flex-col">
                    <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                        Summary Insight
                    </h4>
                    <fwb-accordion class="flex-grow">
                        <fwb-accordion-panel class="w-full">
                            <fwb-accordion-header>Positive Sentiment</fwb-accordion-header>
                            <fwb-accordion-content>
                                <p class="mb-2 text-gray-500 dark:text-gray-400">
                                    {{ summaryPos.content }}
                                </p>
                            </fwb-accordion-content>
                        </fwb-accordion-panel>

                        <fwb-accordion-panel>
                            <fwb-accordion-header>Negative Sentiment</fwb-accordion-header>
                            <fwb-accordion-content>
                                <p class="mb-2 text-gray-500 dark:text-gray-400">
                                    {{ summaryNeg.content }}
                                </p>
                            </fwb-accordion-content>
                        </fwb-accordion-panel>
                    </fwb-accordion>
                    <div class="flex justify-end mt-3">
                        <ModalEditSummary @updated="fetchTopics" :summaryPos="summaryPos" :summaryNeg="summaryNeg"
                            :summaryId="summaryPos.id" :typeTopic="typeTopic" />
                    </div>
                </div>
            </div>
        </div>


        <div class="grid gap-6 mb-8 lg:grid-cols-2">
            <div
                class="min-w-0 p-4 bg-white rounded-lg dark:bg-gray-800 shadow-md border border-gray-200 dark:border-none">
                <!-- <h4 class="mb-5 text-center text-lg font-semibold text-gray-800 dark:text-gray-300">
                    Persentase Sentiment Hospitals Type A
                </h4> -->
                <h4 class="mb-6 font-semibold text-gray-800 dark:text-gray-300">
                    Sentiment Distribution for Type B Hospitals
                </h4>
                <div class="md:flex justify-evenly">
                    <div class="mb-10 lg:mb-0">
                        <h2 class="text-center font-semibold mb-2 text-gray-800 dark:text-gray-300">Sentiment Real</h2>
                        <ChartSentimentRealTypeB />
                    </div>
                    <div class="mb-4 lg:mb-0">
                        <h2 class="text-center font-semibold mb-2 text-gray-800 dark:text-gray-300">Sentiment Prediction
                        </h2>
                        <ChartSentimentPredictTypeB />
                    </div>
                </div>
            </div>
            <div
                class="min-w-0 p-4 bg-white rounded-lg dark:bg-gray-800 shadow-md border border-gray-200 dark:border-none">
                <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                    Coherence Score
                </h4>
                <CoherenceTypeB />
            </div>
        </div>
    </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ChartSentimentRealTypeB from '@/components/chart/ChartSentimentRealTypeB.vue'
import ChartSentimentPredictTypeB from '@/components/chart/ChartSentimentPredictTypeB.vue'
import CoherenceTypeB from '@/components/coherence/CoherenceTypeB.vue'
import {
    FwbAccordion,
    FwbAccordionPanel,
    FwbAccordionHeader,
    FwbAccordionContent,
} from 'flowbite-vue'

import { ref, onMounted } from 'vue'
import ModalEditSummary from "../../ModalEditSummary.vue"

const summaryPos = ref([])
const summaryNeg = ref([])
const typeTopic = ref('')

const baseUrl = import.meta.env.VITE_API_URL;

const fetchTopics = async () => {
    try {
        const res = await fetch(`${baseUrl}/api/summary?type=B`)
        const data = await res.json()
        summaryPos.value = data.summary.positive
        summaryNeg.value = data.summary.negative
        typeTopic.value = data.summary.positive?.type_name || ''

    } catch (err) {
        console.error('Gagal mengambil data:', err)
    }
}

onMounted(fetchTopics)
</script>

<style scoped>
::v-deep(fwb-accordion-panel summary) {
    display: block;
    width: 100%;
}
</style>