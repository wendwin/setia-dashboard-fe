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
                                3,998
                            </p>
                        </div>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Hospitals</p>
                        <ul>
                            <li class="text-sm text-gray-600 dark:text-gray-400">RS-C1</li>
                            <li class="text-sm text-gray-600 dark:text-gray-400">RS-C2</li>
                            <li class="text-sm text-gray-600 dark:text-gray-400">RS-C3</li>
                            <li class="text-sm text-gray-600 dark:text-gray-400">RS-C4</li>
                            <li class="text-sm text-gray-600 dark:text-gray-400">RS-C5</li>
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
                        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">3,998</h2>
                    </div>
                </div>

                <hr class="border-gray-200 dark:border-gray-700 mb-4" />

                <div class="flex-grow">
                    <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Hospitals</p>
                    <ul class="columns-2 space-y-1">
                        <li v-for="rs in ['RS-C1', 'RS-C2', 'RS-C3', 'RS-C4', 'RS-C5']" :key="rs"
                            class="break-inside-avoid text-sm text-gray-700 dark:text-gray-300">
                            • {{ rs }}
                        </li>
                    </ul>
                </div>
            </div>


            <div
                class="p-4 bg-white rounded-lg dark:bg-gray-800 shadow-md border border-gray-200 dark:border-none h-full flex flex-col">
                <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                    Coherence Score
                </h4>
                <CoherenceTypeC />
            </div>
        </div>


        <div class="w-full bg-white rounded-lg dark:bg-gray-800 shadow-md border border-gray-200 dark:border-none">
            <h4 class="p-4 text-center font-semibold text-gray-800 dark:text-gray-300">
                Sentiment Distribution for Type C Hospitals
            </h4>
            <div class="grid gap-6 pl-4 pr-4 pb-4 lg:grid-cols-2">
                <div
                    class="min-w-0 p-4 bg-white rounded-lg dark:bg-gray-800 border border-gray-200 dark:border-slate-700 hover:shadow-sm hover:bg-slate-50">
                    <div>
                        <h2 class="text-center font-semibold mb-2 text-gray-800 dark:text-gray-300">
                            Sentiment Real
                        </h2>
                        <ChartSentimentRealTypeC />
                    </div>
                </div>
                <div
                    class="min-w-0 p-4 bg-white rounded-lg dark:bg-gray-800 border border-gray-200 dark:border-slate-700 hover:bg-slate-50">
                    <div>
                        <h2 class="text-center font-semibold mb-2 text-gray-800 dark:text-gray-300">
                            Sentiment Prediction
                        </h2>
                        <ChartSentimentPredictTypeC />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ChartSentimentRealTypeC from '@/components/chart/ChartSentimentRealTypeC.vue'
import ChartSentimentPredictTypeC from '@/components/chart/ChartSentimentPredictTypeC.vue'
import CoherenceTypeC from '@/components/coherence/CoherenceTypeC.vue'
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
        const res = await fetch(`${baseUrl}/api/summary?type=C`)
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