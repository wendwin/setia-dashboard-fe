<template>
    <div>
        <div class="grid gap-6 mb-8 md:grid-cols-2">
            <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 ">
                <div
                    class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                    <font-awesome-icon :icon="['fas', 'hospital']" />
                </div>
                <div>
                    <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Total Reviews
                    </p>
                    <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        6389
                    </p>
                </div>
            </div>
            <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 ">
                <div>
                    <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Summary Insight RS Type A
                    </p>
                    <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        6389
                    </p>
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
</script>

<style scoped></style>