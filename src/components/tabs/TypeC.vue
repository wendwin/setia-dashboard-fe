<template>
    <div>
        <div class="grid gap-6 mb-8 md:grid-cols-2 items-start">
            <div class="lg:flex items-center justify-evenly p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 md:min-h-[202px]">
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
                            5,580
                        </p>
                    </div>
                </div>
                <div class="">
                    <p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Hospitals</p>
                    <ul>
                        <li class="text-sm text-gray-600 dark:text-gray-400">RSUD Nyi Ageng Serang</li>
                        <li class="text-sm text-gray-600 dark:text-gray-400">RSUD Prambanan</li>
                        <li class="text-sm text-gray-600 dark:text-gray-400">RST Dr. Soetarto Yogyakarta</li>
                        <li class="text-sm text-gray-600 dark:text-gray-400">RS PKU Muhammadiyah Bantul</li>
                        <li class="text-sm text-gray-600 dark:text-gray-400">RS At-Turots Al-Islamy</li>
                    </ul>
                </div>
            </div>

            <div class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <div>
                    <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                        Summary Insight
                    </h4>
                    <fwb-accordion>
                        <fwb-accordion-panel class="w-full">
                            <fwb-accordion-header>Positive Sentiment</fwb-accordion-header>
                            <fwb-accordion-content>
                                <p class="mb-2 text-gray-500 dark:text-gray-400">
                                    Positive sentiment rs type c
                                </p>
                                <p class="text-gray-500 dark:text-gray-400">
                                    Check out this guide to learn how to <a href="/docs/getting-started/introduction/"
                                        class="text-blue-600 hover:underline dark:text-blue-500">get started</a> and
                                    start developing websites even faster with components on top of Tailwind CSS.
                                </p>
                            </fwb-accordion-content>
                        </fwb-accordion-panel>

                        <fwb-accordion-panel>
                            <fwb-accordion-header>Negative Sentiment</fwb-accordion-header>
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

        <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Charts
        </h2>
        <div class="grid gap-6 mb-8 md:grid-cols-2">
            <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                    Persentase Sentiment
                </h4>
                <Chart />
            </div>
            <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                    Coherence Score Comparison
                </h4>
                <Chart />
            </div>
        </div>
    </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    FwbAccordion,
    FwbAccordionPanel,
    FwbAccordionHeader,
    FwbAccordionContent,
} from 'flowbite-vue'
</script>

<style scoped>
::v-deep(fwb-accordion-panel summary) {
    display: block;
    width: 100%;
}
</style>