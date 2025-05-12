<template>
  <div :class="{ 'dark': dark }">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import useLayout from '@/composables/useLayout';

const { dark } = useLayout()
</script>

<style scoped>

</style>  