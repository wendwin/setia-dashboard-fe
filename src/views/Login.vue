<template>
    <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div class="flex-1 max-w-md mx-auto bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <div class="flex items-center justify-center p-6 sm:p-12">
                <div class="w-full">
                    <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                        Login | <a href="/" class="hover:text-blue-500">STIAMU</a>
                    </h1>

                    <p v-if="error" class="my-2 text-sm text-red-500">
                        {{ error }}
                    </p>

                    <form @submit.prevent="handleLogin">
                        <label class="block text-sm">
                            <span class="text-gray-700 dark:text-gray-400">Email</span>
                            <input
                                class="block w-full mt-1 text-sm rounded-md dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                placeholder="Email" v-model="email" autocomplete="email" required />
                        </label>
                        <label class="block mt-4 text-sm relative">
                          <span class="text-gray-700 dark:text-gray-400">Password</span>
                          <input
                            :type="showPassword ? 'text' : 'password'"
                            class="block w-full mt-1 text-sm rounded-md dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input pr-10"
                            placeholder="***************"
                            v-model="password"
                            autocomplete="current-password"
                            required
                          />
                          <button
                            type="button"
                            @click="showPassword = !showPassword"
                            class="absolute right-2 top-8 text-gray-500 dark:text-gray-400 focus:outline-none hover:text-blue-500"
                          >
                           <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" />
                          </button>
                        </label>

                        <button type="submit" :disabled="loading"
                            class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-500 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-purple disabled:opacity-50 disabled:cursor-not-allowed">
                            <span v-if="loading">Loading...</span>
                            <span v-else>Log in</span>
                        </button>
                    </form>

                    <hr class="my-8" />

                    <p class="mt-4">
                        <a class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline" href="#">
                            Lupa password?
                        </a>
                    </p>
                    <p class="mt-1">
                        <a class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline" href="#">
                            Buat akun
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
    <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div class="flex flex-col overflow-y-auto md:flex-row">
            <div class="h-32 md:h-auto md:w-1/2">
                <img aria-hidden="true" class="object-cover w-full h-full"
                    src="/public/assets/img/login-office.jpeg" alt="Office" />
            </div>
            <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                <div class="w-full">
                    <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                        Login
                    </h1>
                    <p v-if="error" class="my-2 text-sm text-red-500">
                        {{ error }}
                    </p>
                    <form @submit.prevent="handleLogin">
                        <label class="block text-sm">
                            <span class="text-gray-700 dark:text-gray-400">Email</span>
                            <input
                                class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                placeholder="Email" v-model="email" required/>
                        </label>
                        <label class="block mt-4 text-sm">
                            <span class="text-gray-700 dark:text-gray-400">Password</span>
                            <input
                                class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                placeholder="***************" type="password" v-model="password" required/>
                        </label>

                        <button  type="submit"
                            class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-500 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-purple"
                            href="#">
                            Log in
                        </button>   
                    </form>
                    <hr class="my-8" />
                    <p class="mt-4">
                        <a class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                            href="#">
                            Lupa password?
                        </a>
                    </p>
                    <p class="mt-1">
                        <a class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                            href="#">
                            Buat akun
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div> -->
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const router = useRouter()
const loading = ref(false)
const error = ref(null)

const baseUrl = import.meta.env.VITE_API_URL;
const handleLogin = async () => {
    error.value = null
    loading.value = true
    try {
        const response = await fetch(`${baseUrl}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })

        const data = await response.json()

        if (!response.ok) {
             // error validasi
            if (typeof data === 'object') {
                error.value = Object.values(data).flat().join(' ')
            } else {
                error.value = data.msg || 'Login gagal'
            }
            // email.value = ''
            password.value = ''
            return
        }

        // Jika berhasil login
        localStorage.setItem('access_token', data.access_token)
        router.push('/')
    } catch (err) {
        error.value = 'Terjadi kesalahan saat login'
    } finally {
        loading.value = false
    }
}
</script>

<style lang="scss" scoped></style>