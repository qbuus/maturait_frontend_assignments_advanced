<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

type SearchHandlerType = () => void

const searchValue = ref('')
const router = useRouter()

const searchHandler: SearchHandlerType = () => {
  router.push({ name: 'products', query: { s: searchValue.value } })
  searchValue.value = ''
}
</script>
<template>
  <form @submit.prevent="searchHandler">
    <label
      for="default-search"
      class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >Search</label
    >
    <div class="relative">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          class="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        v-model="searchValue"
        type="search"
        id="default-search"
        class="block w-full p-4 ps-10 text-sm text-gray-300 border border-gray-300 rounded-lg bg-gray-700 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
        required
      />
      <button
        type="submit"
        class="dark:text-white dark:bg-gray-700 dark:hover:bg-black dark:focus:ring-black text-gray-100 absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
      >
        Search
      </button>
    </div>
  </form>
</template>
