<template>
    <div>
        <main class="h-full overflow-y-auto">
            <div class="container px-6 mx-auto grid">
                <div class="flex items-center justify-between p-4 my-5 font-semibold text-purple-100 bg-blue-500 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple">
                    <div>
                        <div>
                            <h1 class="text-lg lg:text-[28px] mb-2">Sentiment and Topic Insights Analysis</h1>
                            <p class="text-[15px]">Patient Insights Explorer: Dashboard for Sentiment and Topic Analysis of 24 Hospitals in Yogyakarta</p>
                        </div>
                    </div>
                </div>

                <Tab />
            </div>
        </main>
    </div>
</template>

<script setup>
import Tab from '../components/TabPage.vue'
</script>

<style scoped></style>s
