<script setup lang="ts">
import FooterComponent from '../components/FooterComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import SearchBar from '../components/SearchBar.vue'
import Navbar from '../components/NavBar.vue'
</script>
<template>
  <header class="flex flex-col gap-4 bg-gray-800 text-white p-4 md:px-8 lg:px-16">
    <HeaderComponent />
    <SearchBar />
    <Navbar />
  </header>
  <main class="bg-white dark:bg-gray-900">
    <div class="container mx-auto flex flex-col">
      <router-view></router-view>
    </div>
  </main>
  <FooterComponent />
</template>
<style scoped></style>
