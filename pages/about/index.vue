<template>
    <div
      :class="[
        'min-h-screen font-sans transition-colors duration-300',
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900',
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
  
        <!-- About content -->
        <div class="about-section min-h-screen p-8">
          <div class="container mx-auto">
            <h1 class="text-4xl font-bold mb-8">About Me</h1>
            <div class="flex flex-col md:flex-row items-center">
              <div class="w-full md:w-1/2">
                <img :src="darkMode ? darkAvatar : lightAvatar" alt="Avatar" class="w-full h-auto rounded-lg mb-8 md:mb-0" />
              </div>
              <div class="w-full md:w-1/2 md:pl-8">
                <p class="mb-4">
                  Hi, I'm Aditya Dwi Nugroho, a dedicated front-end developer currently studying at SMK N 1 Bantul. My passion lies in creating engaging and dynamic user interfaces.
                </p>
                <p class="mb-4">
                  As a student, I am constantly learning and improving my skills in front-end technologies like Vue.js and Tailwind CSS. I aim to become a professional front-end developer, capable of crafting exceptional digital experiences.
                </p>
                <p class="mb-4">
                  Feel free to explore my portfolio to see my projects, and don't hesitate to reach out if you want to connect or collaborate.
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- End of About content -->
      </main>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { Icon } from "@iconify/vue";
  import lightAvatar from "~/assets/img/light_avatar.jpg";
  import darkAvatar from "~/assets/img/dark_avatar.jpg";
  
  export default {
    components: { Icon },
    setup() {
      const darkMode = ref(false);
  
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
  
      return {
        darkMode,
        toggleDarkMode,
        initials,
        navLinks,
        socialLinks,
        lightAvatar,
        darkAvatar,
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
  </style>
  