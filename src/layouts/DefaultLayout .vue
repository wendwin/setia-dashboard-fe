<template>
    <div :class="[{ 'dark': dark, 'overflow-hidden': isSideMenuOpen }, 'flex h-screen bg-gray-50 dark:bg-gray-900']">
        <Sidebar/>
        <div class="flex flex-col flex-1 w-full">
            <Navbar :toggle-side-menu="toggleSideMenu" />
            <main class="h-full overflow-y-auto ">
                <router-view />
            </main>
        </div>
    </div>
</template>

<script setup>
import useLayout from '@/composables/useLayout'
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'

const { dark, isSideMenuOpen, toggleSideMenu } = useLayout()
</script>