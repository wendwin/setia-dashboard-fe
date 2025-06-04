<template>
  <div ref="tabContent">
    <div class="flex flex-wrap gap-3 mt-5">
      <button v-for="tab in tabs" :key="tab.name" @click="selectTab(tab.name)" :class="[
        'px-3 py-1 border rounded-md text-sm leading-5 transition-colors duration-150 focus:outline-none border-none',
        activeTab === tab.name
          ? 'bg-slate-500 text-white font-semibold border-none'
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white'
      ]">
        {{ tab.label }}
      </button>

    </div>

    <div class="flex-1 my-5">
      <component :is="getActiveTabContent" />
    </div>

  </div>
</template>

<script setup>

import { ref, computed, nextTick } from 'vue'

import TypeA from './tabs/sentiment/TypeASentiment.vue'
import TypeB from './tabs/sentiment/TypeBSentiment.vue'
import TypeC from './tabs/sentiment/TypeCSentiment.vue'
import TypeD from './tabs/sentiment/TypeDSentiment.vue'

const tabs = [
  { name: 'type_a', label: 'Type A', component: TypeA },
  { name: 'type_b', label: 'Type B', component: TypeB },
  { name: 'type_c', label: 'Type C', component: TypeC },
  { name: 'type_d', label: 'Type D', component: TypeD },
]

const activeTab = ref(tabs[0].name)
const tabContent = ref(null)

const getActiveTabContent = computed(() => {
  return tabs.find(tab => tab.name === activeTab.value)?.component
})

const selectTab = async (tabName) => {
  activeTab.value = tabName
  await nextTick()
  tabContent.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped></style>