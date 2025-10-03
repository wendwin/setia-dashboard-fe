<template>
    <div>
        <main class="h-full overflow-y-auto">
            <div class="container px-6 mx-auto grid">
                <div
                    class="p-4 my-5 font-semibold text-purple-100 bg-blue-500 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple">
                    <div>
                        <div>
                            <h1 class="text-lg lg:text-[28px] mb-2"> {{ formatKata(path) }} Preprocessing</h1>
                            <p class="text-[15px]">
                                {{ formatKata(path) }} {{ descriptions[path] || 'No description available.' }}
                            </p>
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

const descriptions = {
  'case-folding': 'is the process of converting all characters in a text to lowercase (or sometimes uppercase) to ensure uniformity and avoid discrepancies caused by case differences during text analysis.',
  'data-cleaning': 'is the process of identifying and correcting errors or inconsistencies in raw data to improve its quality and ensure that the data is accurate, complete, and reliable for analysis.',
  'normalization': 'is the process of removing or correcting slang words, informal expressions, and non-standard language used in text data. This step ensures that the text is standardized and more suitable for analysis by focusing on meaningful and formal terms.',
  'tokenization': 'is the process of breaking down text into smaller units, called tokens, such as words, phrases, or symbols. This step is crucial for text analysis as it converts unstructured text into a structured format that can be easily processed and analyzed.',
  'stemming': 'is the process of reducing words to their root or base form by removing prefixes and suffixes. This step helps in normalizing the text by ensuring that different forms of a word are treated as a single term, which enhances the effectiveness of text analysis.'
}

</script>

<style scoped></style>s
