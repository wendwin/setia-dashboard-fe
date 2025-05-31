<template>
    <div>
        <div class="grid gap-6 mb-8 md:grid-cols-2 items-start">
            <div class="lg:flex items-center justify-evenly p-4 bg-white rounded-lg shadow-md border border-gray-200 dark:border-none dark:bg-gray-800 md:min-h-[202px]">
                <div class="flex items-center mb-5 lg:mb-0">
                    <div
                        class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                        <font-awesome-icon :icon="['fas', 'hospital']" class="text-xl"/>
                    </div>
                    <div>
                        <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            Total Reviews
                        </p>
                        <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            4,140
                        </p>
                    </div>
                </div>
                <div class="">
                    <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3"> Hospitals</p>
                    <ul>
                        <li class="text-sm text-gray-600 dark:text-gray-400">RSU Rajawali Citra</li>
                        <li class="text-sm text-gray-600 dark:text-gray-400">RS Queen Latifa</li>
                        <li class="text-sm text-gray-600 dark:text-gray-400">RS Mitra Paramedika</li>
                        <li class="text-sm text-gray-600 dark:text-gray-400">RS Bhayangkara Polda DIY</li>
                        <li class="text-sm text-gray-600 dark:text-gray-400">RS Nur Hidayah</li>
                        <li class="text-sm text-gray-600 dark:text-gray-400">RS Bethesda Lempuyangwangi</li>
                        <li class="text-sm text-gray-600 dark:text-gray-400">RS PKU Muhammadiyah Wonosari</li>
                    </ul>
                </div>
            </div>

            <div class="p-4 bg-white rounded-lg dark:bg-gray-800 shadow-md border border-gray-200 dark:border-none">
                <div>
                    <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                        Summary Insight
                    </h4>
                    <fwb-accordion>
                        <fwb-accordion-panel class="w-full">
                            <fwb-accordion-header>Positive Sentiment</fwb-accordion-header>
                            <fwb-accordion-content>
                                <p class="mb-2 text-gray-500 dark:text-gray-400">
                                    Positive sentiment rs type d
                                </p>
                                <p class="text-gray-500 dark:text-gray-400">
                                    Check out this guide to learn how to
                                    <a href="/docs/getting-started/introduction/"
                                        class="text-blue-600 hover:underline dark:text-blue-500">get started</a>
                                    and start developing websites even faster with components on
                                    top of Tailwind CSS.
                                </p>
                            </fwb-accordion-content>
                        </fwb-accordion-panel>

                        <fwb-accordion-panel>
                            <fwb-accordion-header>Negative Sentiment</fwb-accordion-header>
                            <fwb-accordion-content>
                                <p class="mb-2 text-gray-500 dark:text-gray-400">
                                    Flowbite is first conceptualized and designed using the Figma
                                    software so everything you see in the library has a design
                                    equivalent in our Figma file.
                                </p>
                                <p class="text-gray-500 dark:text-gray-400">
                                    Check out the
                                    <a href="https://flowbite.com/figma/"
                                        class="text-blue-600 hover:underline dark:text-blue-500">Figma design system</a>
                                    based on the utility classes from Tailwind CSS and components
                                    from Flowbite.
                                </p>
                            </fwb-accordion-content>
                        </fwb-accordion-panel>
                    </fwb-accordion>
                </div>
            </div>
        </div>

        <div class="grid gap-6 mb-8 lg:grid-cols-2">
            <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 shadow-md border border-gray-200 dark:border-none">
                <!-- <h4 class="mb-5 text-center text-lg font-semibold text-gray-800 dark:text-gray-300">
                    Persentase Sentiment Hospitals Type A
                </h4> -->
                <h4 class="mb-6 font-semibold text-gray-800 dark:text-gray-300">
                    Sentiment Distribution for Type A Hospitals
                </h4>
                <div class="md:flex justify-evenly">
                    <div class="mb-10 lg:mb-0">
                        <h2 class="text-center font-semibold mb-2 text-gray-800 dark:text-gray-300">Sentiment Real</h2>
                        <ChartSentimentRealTypeD />
                    </div>
                    <div class="mb-4 lg:mb-0">
                        <h2 class="text-center font-semibold mb-2 text-gray-800 dark:text-gray-300">Sentiment Prediction</h2>
                        <ChartSentimentPredictTypeD />
                    </div>
                </div>
            </div>
            <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 shadow-md border border-gray-200 dark:border-none">
                <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                    Coherence Score
                </h4>
                <CoherenceTypeD/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ChartSentimentRealTypeD from '@/components/chart/ChartSentimentRealTypeD.vue'
import ChartSentimentPredictTypeD from '@/components/chart/ChartSentimentPredictTypeD.vue'
import CoherenceTypeD from '@/components/coherence/CoherenceTypeD.vue'
import {
    FwbAccordion,
    FwbAccordionPanel,
    FwbAccordionHeader,
    FwbAccordionContent,
} from "flowbite-vue";
</script>

<style scoped>
::v-deep(fwb-accordion-panel summary) {
    display: block;
    width: 100%;
}
</style>
