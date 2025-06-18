<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Desktop sidebar -->
    <aside class="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
      <div class="py-4 text-gray-500 dark:text-gray-400">
        <a class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
          SETIA
        </a>
        <ul class="mt-6">
          <li class="relative px-6 py-3">
            <router-link
              class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              :to="{ name: 'dashboard' }">
              <span class="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg " aria-hidden="true"
                v-show="$route.path === '/'"></span>
              <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                </path>
              </svg>
              <span class="ml-4 font-semibold">Dashboard</span>
            </router-link>
          </li>
        </ul>
        <ul>
          <li class="relative px-6 py-3">
            <router-link
              class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              :to="{ name: 'data-reviews' }">
              <span class="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg" aria-hidden="true"
                v-show="$route.path === '/data-reviews'"></span>
              <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01">
                </path>
              </svg>
              <span class="ml-4">Data Reviews GMaps</span>
            </router-link>
          </li>
          <li class="relative px-6 py-3">
            <button
              class="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              @click="toggleDropdown('preprocessing')" aria-haspopup="true">
              <span class="inline-flex items-center">
                <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z">
                  </path>
                </svg>
                <span class="ml-4">Pre-Processing</span>
              </span>
              <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
            <transition name="submenu" @before-enter="beforeEnter" @enter="enter" @leave="leave">
              <ul v-if="activeDropdown === 'preprocessing'"
                class="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                aria-label="submenu">         
                <li class="relative px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                  <span class="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg"
                    v-show="$route.params.step === 'case-folding'" aria-hidden="true"></span>
                  <router-link class="w-full" :to="{ name: 'preprocessing', params: { step: 'case-folding' } }">Case Folding</router-link>
                </li>         
                <li class="relative px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                  <span class="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg"
                    v-show="$route.params.step === 'data-cleaning'" aria-hidden="true"></span>
                  <router-link class="w-full" :to="{ name: 'preprocessing', params: { step: 'data-cleaning' } }">Data Cleaning</router-link>
                </li>         
                <li class="relative px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                  <span class="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg"
                    v-show="$route.params.step === 'normalization'" aria-hidden="true"></span>
                  <router-link class="w-full" :to="{ name: 'preprocessing', params: { step: 'normalization' } }">Normalization</router-link>
                </li>         
                <li class="relative px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                  <span class="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg"
                    v-show="$route.params.step === 'tokenization'" aria-hidden="true"></span>
                  <router-link class="w-full" :to="{ name: 'preprocessing', params: { step: 'tokenization' } }">Tokenizing</router-link>
                </li>         
                <li class="relative px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                  <span class="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg"
                    v-show="$route.params.step === 'stemming'" aria-hidden="true"></span>
                  <router-link class="w-full" :to="{ name: 'preprocessing', params: { step: 'stemming' } }">Stemming</router-link>
                </li>         
                <!-- <li class="relative px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                  <span class="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg"
                    v-show="$route.params.step === 'representation'" aria-hidden="true"></span>
                  <a class="w-full">Representation</a>
                </li>          -->
              </ul>
            </transition>
          </li>
          <li class="relative px-6 py-3">
            <router-link
              class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              :to="{ name: 'sentiment-analysis' }">
              <span class="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg" aria-hidden="true"
                v-show="$route.path === '/sentiment-analysis'"></span>
              <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01">
                </path>
              </svg>
              <span class="ml-4">Sentiment Analysis</span>
            </router-link>
          </li>
          <li class="relative px-6 py-3">
            <router-link
              class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              :to="{ name: 'topic-analysis' }">
              <span class="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg" aria-hidden="true"
                v-show="$route.path === '/topic-analysis'"></span>
              <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01">
                </path>
              </svg>
              <span class="ml-4">Topic Analysis</span>
            </router-link>
          </li>
          <!-- <li class="relative px-6 py-3">
            <router-link
              class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
              <span class="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg" aria-hidden="true"
                v-show="$route.path === '/topic-tools'"></span>
              <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01">
                </path>
              </svg>
              <span class="ml-4">Sentiment Topic Tools</span>
            </router-link>
          </li> -->
        </ul>
      </div>
    </aside>
    <!-- Mobile sidebar -->

    <!-- Backdrop -->
    <transition enter-active-class="transition ease-in-out duration-100" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition ease-in-out duration-100"
      leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="isSideMenuOpen"
        class="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"></div>
    </transition>

    <transition enter-active-class="transition ease-in-out duration-100"
      enter-from-class="opacity-0 transform -translate-x-20" enter-to-class="opacity-100 transform translate-x-0"
      leave-active-class="transition ease-in-out duration-100" leave-from-class="opacity-100 transform translate-x-0"
      leave-to-class="opacity-0 transform -translate-x-20">
      <aside class="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden"
        v-if="isSideMenuOpen" id="sidebar">

        <div class="py-4 text-gray-500 dark:text-gray-400">
          <a class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
            SETIA
          </a>
          <ul class="mt-6">
            <li class="relative px-6 py-3">
              <router-link  @click="closeSideMenu"
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                :to="{ name: 'dashboard' }">
                <span class="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg "
                  aria-hidden="true" v-show="$route.path === '/'"></span>
                <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                  </path>
                </svg>
                <span class="ml-4">Dashboard</span>
              </router-link>
            </li>
          </ul>
          <ul>
            <li class="relative px-6 py-3">
              <router-link  @click="closeSideMenu"
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200" :to="{ name: 'data-reviews' }">
                <span class="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg "
                  aria-hidden="true" v-show="$route.path === '/data-reviews'"></span>
                <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01">
                  </path>
                </svg>
                <span class="ml-4">Data Reviews</span>
              </router-link>
            </li>
            <li class="relative px-6 py-3">
              <button
                class="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                @click.prevent="toggleDropdown('preprocessing')" aria-haspopup="true">
                <span class="inline-flex items-center">
                  <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z">
                    </path>
                  </svg>
                  <span class="ml-4">Pre-Processing</span>
                </span>
                <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </button>
            
              <transition name="submenu" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <ul v-if="activeDropdown === 'preprocessing'"
                  class="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                  aria-label="submenu">

                  <li class="relative px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                    <span class="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg"
                      v-show="$route.path === '/preprocessing/case-folding'" aria-hidden="true"></span>
                    <router-link class="w-full" :to="{ name: 'preprocessing', params: { step: 'case-folding' } }" @click="closeSideMenu">Case Folding</router-link>
                  </li>
                
                  <li class="relative px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                    <span class="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg"
                      v-show="$route.path === '/preprocessing/data-cleaning'" aria-hidden="true"></span>
                    <router-link class="w-full" :to="{ name: 'preprocessing', params: { step: 'data-cleaning' } }" @click="closeSideMenu">Data Cleaning</router-link>
                  </li>
                  <li class="relative px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                    <span class="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg"
                      v-show="$route.path === '/preprocessing/normalization'" aria-hidden="true"></span>
                    <router-link class="w-full" :to="{ name: 'preprocessing', params: { step: 'normalization' } }" @click="closeSideMenu">Normalization</router-link>
                  </li>
                  <li class="relative px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                    <span class="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg"
                      v-show="$route.path === '/preprocessing/tokenization'" aria-hidden="true"></span>
                    <router-link class="w-full" :to="{ name: 'preprocessing', params: { step: 'tokenization' } }" @click="closeSideMenu">Tokenizing</router-link>
                  </li>
                  <li class="relative px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                    <span class="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg"
                      v-show="$route.path === '/preprocessing/stemming'" aria-hidden="true"></span>
                    <router-link class="w-full" :to="{ name: 'preprocessing', params: { step: 'stemming' } }" @click="closeSideMenu">Stemming</router-link>
                  </li>
                  <!-- <li class="relative px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                    <a class="w-full">Representation</a>
                  </li> -->
                
                </ul>
              </transition>
            </li>
            <li class="relative px-6 py-3">
              <router-link  @click="closeSideMenu"
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200" :to="{ name: 'sentiment-analysis' }">
                <span class="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg "
                  aria-hidden="true" v-show="$route.path === '/sentiment-analysis'"></span>
                <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01">
                  </path>
                </svg>
                <span class="ml-4">Sentiment Analysis</span>
              </router-link>
            </li>
            <li class="relative px-6 py-3">
              <router-link  @click="closeSideMenu"
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200" :to="{ name: 'topic-analysis' }">
                <span class="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg "
                  aria-hidden="true" v-show="$route.path === '/topic-analysis'"></span>
                <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01">
                  </path>
                </svg>
                <span class="ml-4">Topic Analysis</span>
              </router-link>
            </li>
            <!-- <li class="relative px-6 py-3">
              <router-link
                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                <span class="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg" aria-hidden="true"
                  v-show="$route.path === '/topic-tools'"></span>
                <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01">
                  </path>
                </svg>
                <span class="ml-4">Sentiment Topic Tools</span>
              </router-link>
            </li> -->
          </ul>
        </div>
      </aside>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useLayout from '@/composables/useLayout'; 
import router from '../router';

const {
  isSideMenuOpen,
  toggleSideMenu,
  closeSideMenu
} = useLayout();

// const isPagesMenuOpen = ref(false);
const activeDropdown = ref(null)

function toggleDropdown(menuName) {
  activeDropdown.value = activeDropdown.value === menuName ? null : menuName
}

// function togglePagesMenu() {
//   isPagesMenuOpen.value = !isPagesMenuOpen.value;
// }

// Transition hooks
function beforeEnter(el) {
  el.style.maxHeight = "0";
  el.style.opacity = 0;
}

function enter(el, done) {
  el.offsetHeight; // Trigger reflow
  el.style.transition = "all 0.3s ease-in-out";
  el.style.maxHeight = "1000px"; 
  el.style.opacity = 1;
  done();
}


function leave(el, done) {
  el.style.transition = "all 0.3s ease-in-out";
  el.style.maxHeight = "0";
  el.style.opacity = 0;
  done();
}
</script>

<style scoped>
/* Transisi untuk backdrop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease-in-out;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
  {
  opacity: 0;
}

/* Transisi untuk sidebar */
.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.15s ease-in-out, opacity 0.15s ease-in-out;
}

.sidebar-enter,
.sidebar-leave-to

/* .sidebar-leave-active in <2.1.8 */
  {
  transform: translateX(-20px);
  opacity: 0;
}

.sidebar-enter-to,
.sidebar-leave {
  transform: translateX(0);
  opacity: 1;
}


.router-link-exact-active {
  @apply text-gray-800 dark:text-gray-200;
}
</style>