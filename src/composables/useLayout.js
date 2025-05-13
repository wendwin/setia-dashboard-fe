import { ref, onMounted, watch } from 'vue'

const dark = ref(false)
const isSideMenuOpen = ref(false)
const isNotificationsMenuOpen = ref(false)
const isProfileMenuOpen = ref(false)
const isPagesMenuOpen = ref(false)
const isModalOpen = ref(false)
let trapCleanup = null

const getThemeFromLocalStorage = () => {
  const stored = localStorage.getItem('dark')
  if (stored !== null) return JSON.parse(stored)
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const setThemeToLocalStorage = (value) => {
  localStorage.setItem('dark', value)
}

const applyDarkClass = (val) => {
  const html = document.documentElement
  if (val) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}

const toggleTheme = () => {
  dark.value = !dark.value
  setThemeToLocalStorage(dark.value)
}

const toggleSideMenu = () => {
  isSideMenuOpen.value = !isSideMenuOpen.value
  console.log('Side menu is now:', isSideMenuOpen.value ? 'Open' : 'Closed')
}

const closeSideMenu = () => {
  isSideMenuOpen.value = false
  console.log('Side menu closed')
}

const toggleNotificationsMenu = () => {
  isNotificationsMenuOpen.value = !isNotificationsMenuOpen.value
}
const closeNotificationsMenu = () => {
  isNotificationsMenuOpen.value = false
}
const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value
}
const closeProfileMenu = () => {
  isProfileMenuOpen.value = false
}
const togglePagesMenu = () => {
  isPagesMenuOpen.value = !isPagesMenuOpen.value
}
const openModal = () => {
  isModalOpen.value = true
  trapCleanup = window.focusTrap?.(document.querySelector('#modal'))
}
const closeModal = () => {
  isModalOpen.value = false
  trapCleanup?.()
}

onMounted(() => {
  dark.value = getThemeFromLocalStorage()
  applyDarkClass(dark.value)
})

watch(dark, (val) => {
  applyDarkClass(val)
})

export default function useLayout() {
  return {
    dark,
    toggleTheme,
    isSideMenuOpen,
    toggleSideMenu,
    closeSideMenu,
    isNotificationsMenuOpen,
    toggleNotificationsMenu,
    closeNotificationsMenu,
    isProfileMenuOpen,
    toggleProfileMenu,
    closeProfileMenu,
    isPagesMenuOpen,
    togglePagesMenu,
    isModalOpen,
    openModal,
    closeModal
  }
}


