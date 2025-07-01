<template>
    <div>
        <div class="grid gap-6 mb-8 md:grid-cols-2 items-stretch">
            <div class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 h-full flex flex-col  shadow-md border border-gray-200 dark:border-none">
                <div class="flex-grow flex flex-col">
                    <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                        Positive Topic Highlights
                    </h4>
                    <fwb-accordion>
                        <fwb-accordion-panel v-for="(topic, index) in topicsPos" :key="index">
                            <fwb-accordion-header>{{ topic.topic }}</fwb-accordion-header>
                            <!-- <fwb-accordion-content>
                                <div v-for="(s, i) in topic.suggestions" :key="s.id">
                                    <h4 class="text-gray-500 dark:text-gray-400 mb-2">Message {{ i + 1 }}</h4>
                                    <p class="mb-2 text-gray-500 dark:text-gray-400">{{ s.content }}</p>
                                    <hr v-if="i < topic.suggestions.length - 1"
                                        class="my-4 border-t border-gray-300 dark:border-gray-700" />
                                </div>
                                <div class="flex justify-end">
                                    <ModalEdit @updated="fetchTopics" :suggestions="topic.suggestions" :topic="topic.topic" :topicId="topic.id" :typeTopic="typeTopic"/>
                                </div>
                            </fwb-accordion-content> -->
                             <fwb-accordion-content>
                                <div v-for="(s, i) in topic.suggestions" :key="s.id">
                                    <h4 class="text-gray-500 dark:text-gray-400 mb-2">
                                        {{ i === 1 ? 'Peningkatan Mutu' : 'Insight ' }}
                                    </h4>
                                    <p class="mb-2 text-gray-500 dark:text-gray-400">{{ s.content }}</p>
                                    <hr v-if="i < topic.suggestions.length - 1"
                                        class="my-4 border-t border-gray-300 dark:border-gray-700" />
                                </div>
                                <div class="flex justify-end">
                                    <ModalEdit @updated="fetchTopics" :suggestions="topic.suggestions"
                                        :topic="topic.topic" :topicId="topic.id" :typeTopic="typeTopic" />
                                </div>
                            </fwb-accordion-content>
                        </fwb-accordion-panel>
                    </fwb-accordion>
                </div>
            </div>

            <div class="p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800  shadow-md border border-gray-200 dark:border-none">
                <div>
                    <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                        Negative Topic Highlights
                    </h4>
                    <fwb-accordion>
                        <fwb-accordion-panel v-for="(topic, index) in topicsNeg" :key="index">
                            <fwb-accordion-header>{{ topic.topic }}</fwb-accordion-header>
                            <fwb-accordion-content>
                                <div v-for="(s, i) in topic.suggestions" :key="s.id">
                                    <h4 class="text-gray-500 dark:text-gray-400 mb-2">
                                        {{ i === 1 ? 'Peningkatan Mutu' : 'Insight ' }}
                                    </h4>
                                    <p class="mb-2 text-gray-500 dark:text-gray-400">{{ s.content }}</p>
                                    <hr v-if="i < topic.suggestions.length - 1"
                                        class="my-4 border-t border-gray-300 dark:border-gray-700" />
                                </div>
                                <div class="flex justify-end">
                                    <ModalEdit @updated="fetchTopics" :suggestions="topic.suggestions"
                                        :topic="topic.topic" :topicId="topic.id" :typeTopic="typeTopic" />
                                </div>
                            </fwb-accordion-content>
                            <!-- <fwb-accordion-content>
                                <div v-for="(s, i) in topic.suggestions" :key="s.id">
                                    <h4 class="text-gray-500 dark:text-gray-400 mb-2">Message {{ i + 1 }}</h4>
                                    <p class="mb-2 text-gray-500 dark:text-gray-400">{{ s.content }}</p>
                                    <hr v-if="i < topic.suggestions.length - 1"
                                        class="my-4 border-t border-gray-300 dark:border-gray-700" />
                                </div>
                                <div class="flex justify-end">
                                    <ModalEdit @updated="fetchTopics" :suggestions="topic.suggestions" :topic="topic.topic" :topicId="topic.id" :typeTopic="typeTopic"/>
                                </div>
                            </fwb-accordion-content> -->
                        </fwb-accordion-panel>
                    </fwb-accordion>
                </div>
            </div>
        </div>

        <CoherenceTypeB />

        <WordTypeB/>

        <div
            class="mb-5 overflow-hidden w-full h-[95vh] bg-white dark:bg-[#374151] rounded-lg shadow-md focus:outline-none border-1 border-gray-100">
            <p class="p-4 font-semibold text-gray-800 dark:text-gray-300">Positive Topic Distance Map</p>
            <iframe src="/assets/visualization/lda_visualization_positif_b(X).html" class="w-full h-screen"
                style="border: none;"></iframe>
        </div>

        <div
            class="mb-5 overflow-hidden w-full h-[95vh] bg-white dark:bg-[#374151] rounded-lg shadow-md focus:outline-none border-1 border-gray-100">
            <p class="p-4 font-semibold text-gray-800 dark:text-gray-300">Negative Topic Distance Map</p>
            <iframe src="/assets/visualization/lda_visualization_negatif_b(X).html" class="w-full h-screen"
                style="border: none;"></iframe>
        </div>
    </div>
</template>

<script setup>
import CoherenceTypeB from '@/components/coherence/CoherenceTypeB.vue'
import WordTypeB from '@/components/words/WordTypeB.vue'
import {
    FwbAccordion,
    FwbAccordionPanel,
    FwbAccordionHeader,
    FwbAccordionContent,
} from "flowbite-vue";
import { ref, onMounted, computed } from 'vue'
import ModalEdit from "../../ModalEdit.vue";    

const topicsPos = ref([])
const topicsNeg = ref([])
const typeTopic = ref('')

const baseUrl = import.meta.env.VITE_API_URL;

const fetchTopics = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/topics?type=B`)
    const data = await res.json()
    topicsPos.value = data.positive
    topicsNeg.value = data.negative
    typeTopic.value = data.typeTopic
  } catch (err) {
    console.error('Gagal mengambil data:', err)
  }
}

onMounted(fetchTopics)
</script>

<style lang="scss" scoped></style>