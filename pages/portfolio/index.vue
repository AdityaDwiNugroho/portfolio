<template>
    <div
      :class="[
        'min-h-screen font-sans transition-colors duration-300',
        darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900',
      ]"
      :style="{
        backgroundImage: darkMode
          ? 'url(/mnt/data/dark-mode-bg.png)'
          : 'url(/mnt/data/light-mode-bg.png)',
      }"
    >
      <!-- Left Sidebar Navigation -->
      <nav
        class="fixed left-0 top-0 h-full w-16 md:w-24 flex flex-col items-center justify-between py-8 bg-opacity-90 backdrop-filter backdrop-blur-lg z-20"
        :class="darkMode ? 'bg-gray-800' : 'bg-white'"
      >
        <div class="flex flex-col items-center space-y-8">
          <NuxtLink to="/" class="text-2xl font-bold">{{ initials }}</NuxtLink>
          <NuxtLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.path"
            class="p-2 rounded-full transition-colors duration-300 hover:bg-blue-500"
          >
            <Icon :icon="link.icon" class="w-6 h-6" />
          </NuxtLink>
        </div>
        <div class="flex flex-col items-center space-y-4">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-full transition-colors duration-300 hover:bg-blue-500"
          >
            <Icon :icon="social.icon" class="w-5 h-5" />
          </a>
        </div>
      </nav>
  
      <!-- Main Content Area -->
      <main class="ml-16 md:ml-24 p-8 relative">
        <button
          @click="toggleDarkMode"
          class="fixed top-4 right-4 p-2 rounded-full transition-colors duration-300 hover:bg-blue-500 z-30"
          :class="darkMode ? 'bg-gray-700' : 'bg-white'"
        >
          <Icon
            :icon="darkMode ? 'ph:sun-bold' : 'ph:moon-bold'"
            class="w-6 h-6"
            :class="darkMode ? 'text-white' : 'text-gray-900'"
          />
        </button>
  
        <!-- Portfolio Filter -->
        <section class="my-8">
          <h2 class="text-2xl font-bold mb-4">Portfolio</h2>
          <div class="flex space-x-4 mb-8">
            <button
              v-for="category in categories"
              :key="category"
              @click="filterCategory = category"
              :class="[
                'px-4 py-2 rounded-full transition-colors duration-300',
                filterCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-900',
              ]"
            >
              {{ category }}
            </button>
          </div>
  
          <!-- Portfolio Content -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="portfolioItem in filteredPortfolio"
              :key="portfolioItem.name"
              class="relative group"
            >
              <img
                :src="portfolioItem.image"
                :alt="portfolioItem.name"
                class="w-full h-full object-cover rounded-lg transition-transform transform group-hover:scale-105"
              />
              <div
                class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <h3 class="text-lg font-semibold">{{ portfolioItem.name }}</h3>
                <p>{{ portfolioItem.category }}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from "vue";
  import { Icon } from "@iconify/vue";
  
  export default {
    components: { Icon },
    setup() {
      const darkMode = ref(false);
      const filterCategory = ref("All");
  
      const toggleDarkMode = () => {
        darkMode.value = !darkMode.value;
        localStorage.setItem('darkMode', darkMode.value);
      };
  
      const initializeDarkMode = () => {
        const savedDarkMode = localStorage.getItem('darkMode');
        darkMode.value = savedDarkMode === 'true';
      };
  
      onMounted(() => {
        initializeDarkMode();
      });
  
      const initials = "A.";
      const navLinks = [
        { name: "Home", path: "/", icon: "ph:house-bold" },
        { name: "Projects", path: "/portfolio", icon: "ph:projector-screen-chart-bold" },
        { name: "About", path: "/about", icon: "ph:user-bold" },
        { name: "Contact", path: "/contact", icon: "ph:envelope-bold" },
      ];
  
      const socialLinks = [
        { name: "GitHub", icon: "ph:github-logo-bold", url: "https://github.com/AdityaDwiNugroho" },
        { name: "LinkedIn", icon: "ph:linkedin-logo-bold", url: "https://www.linkedin.com/in/aditya-dwi-nugroho-75057827a/" },
        { name: "Twitter", icon: "ph:twitter-logo-bold", url: "https://x.com/ProgrammerADN" },
      ];
  
      const portfolio = [
        { name: "lorem dulu pak", category: "Web development", image: "/path/to/finance.jpg" },
        { name: "lorem dulu pak", category: "Web development", image: "/path/to/orizon.jpg" },
        { name: "Gamatechno Portfolio", category: "Web design", image: "@/assets/img/portfolio/gamatechno-portfolio.png" },
        { name: "lorem dulu pak", category: "Applications", image: "/path/to/brawlhalla.jpg" },
        { name: "lorem dulu pak", category: "Web design", image: "/path/to/dsm.jpg" },
        { name: "GG gaming", category: "Web design", image: "/path/to/metaspark.jpg" },
      ];
  
      const categories = ["All", "Web design", "Applications", "Web development"];
  
      const filteredPortfolio = computed(() => {
        if (filterCategory.value === "All") {
          return portfolio;
        }
        return portfolio.filter(item => item.category === filterCategory.value);
      });
  
      return {
        darkMode,
        toggleDarkMode,
        initials,
        navLinks,
        socialLinks,
        categories,
        filterCategory,
        filteredPortfolio,
      };
    },
  };
  </script>
  
  <style>
  @import "tailwindcss/base";
  @import "tailwindcss/components";
  @import "tailwindcss/utilities";
  
  html {
    scroll-behavior: smooth;
  }
  
  img {
    border: 2px solid white;
    transition: border-color 0.3s;
  }
  
  .group:hover img {
    border-color: transparent;
  }

  button:hover {
    background-color: #3498db;
  }
  </style>
  