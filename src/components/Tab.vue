<template>
  <div>
    <div class="flex flex-wrap gap-3">
      <button v-for="tab in tabs" :key="tab.name" @click="activeTab = tab.name" :class="[
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

import { ref, computed } from 'vue'

import TabA from './tabs/TypeA.vue'
import TabB from './tabs/TypeB.vue'
import TabC from './tabs/TypeC.vue'
import TabD from './tabs/TypeD.vue'

const tabs = [
  { name: 'type_a', label: 'Type A', component: TabA },
  { name: 'type_b', label: 'Type B', component: TabB },
  { name: 'type_c', label: 'Type C', component: TabC },
  { name: 'type_d', label: 'Type D', component: TabD },
]

const activeTab = ref(tabs[0].name)

const getActiveTabContent = computed(() => {
  return tabs.find(tab => tab.name === activeTab.value)?.component
})
</script>

<style scoped></style>