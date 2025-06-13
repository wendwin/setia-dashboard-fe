<template>
    <div>
        <main class="h-full overflow-y-auto">
            <div class="container px-6 mx-auto grid">
                <div
                    class="p-4 my-5 font-semibold text-purple-100 bg-blue-500 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple">
                    <div>
                        <div>
                            <h1 class="text-lg lg:text-[28px] mb-2"> {{ formatKata(path) }} Preprocessing</h1>
                            <p class="text-[15px]">{{ formatKata(path) }} is the process of converting all characters in a text to
                                lowercase (or sometimes uppercase) to ensure uniformity and avoid discrepancies caused
                                by case differences during text analysis.</p>
                        </div>
                    </div>
                </div>

                <TablePrepro :path="path"/>    
            </div>
        </main>
    </div>
</template>

<script setup>
import TablePrepro from '../components/TablePrepro.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const stepParam = route.params.step || route.query.step || ''
const path = ref(stepParam)

watch(() => route.params.step, (newStep) => {
  path.value = newStep
})

function formatKata(teks) {
  return teks
    .replace(/-/g, ' ')                   
    .replace(/\b\w/g, char => char.toUpperCase()) 
}

</script>

<style scoped></style>s
