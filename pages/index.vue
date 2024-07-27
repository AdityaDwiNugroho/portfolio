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
      <!-- Dark Mode Toggle -->
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

      <!-- Hero Section -->
      <section class="min-h-screen flex items-center">
        <div class="container mx-auto px-4 flex justify-between items-center relative">
          <div class="max-w-2xl">
            <h1 class="text-3xl md:text-5xl font-bold mb-2">
              <span class="block">Aditya Dwi Nugroho</span>
            </h1>
            <div class="mb-4">
              <TypeWriter
                :phrases="['Designer', 'Developer', 'Animator']"
                :typeSpeed="150"
                :backSpeed="75"
                :loop="true"
              />
            </div>
            <p class="text-lg md:text-xl mb-6">{{ heroSubtext }}</p>
            <button
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Get in touch
            </button>
          </div>
          <div class="hidden md:block relative">
            <img
              :src="darkMode ? darkAvatar : lightAvatar"
              alt="Aditya's avatar"
              class="w-64 h-64 rounded-full object-cover"
            />
            <div ref="loader" class="loader-animation"></div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import TypeWriter from "../components/TypeWriter.vue";

import lightAvatar from "~/assets/img/light_avatar.jpg";
import darkAvatar from "~/assets/img/dark_avatar.jpg";

export default {
  components: { Icon, TypeWriter },
  setup() {
    const darkMode = ref(false);

    // Function to apply dark mode class to the document
    const applyDarkMode = (isDark) => {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Retrieve dark mode state from localStorage on mount
    onMounted(() => {
      const savedMode = localStorage.getItem('darkMode');
      darkMode.value = savedMode === 'true';
      applyDarkMode(darkMode.value);
    });

    // Toggle dark mode and save the state to localStorage
    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value;
      localStorage.setItem('darkMode', darkMode.value.toString());
      applyDarkMode(darkMode.value);
    };

    const initials = "A.";
    const heroText = ["Designer", "Developer", "Animator"];
    const heroSubtext = "Crafting digital experiences that inspire and engage.";

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

    const loader = ref(null);

    const animateLoader = () => {
      const loaderEl = loader.value;
      if (loaderEl) {
        loaderEl.classList.add("animate");
      }
    };

    onMounted(() => {
      animateLoader();
    });

    return {
      darkMode,
      toggleDarkMode,
      initials,
      heroText,
      heroSubtext,
      navLinks,
      socialLinks,
      lightAvatar,
      darkAvatar,
      loader,
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

.loader-animation {
  position: absolute;
  top: 50%;
  left: 0;
  width: 4px;
  height: 4px;
  background-color: transparent;
  border-radius: 50%;
  border: 4px solid transparent;
  border-top-color: #3498db; /* Blue */
  border-right-color: #e74c3c; /* Red */
  border-bottom-color: #f1c40f; /* Yellow */
  border-left-color: #2ecc71; /* Green */
  animation: move 2s cubic-bezier(0.65, 0.05, 0.36, 1) forwards,
    spin 1s linear infinite;
}

.loader-animation.animate {
  animation: move 2s cubic-bezier(0.65, 0.05, 0.36, 1) forwards,
    spin 1s linear infinite;
}

@keyframes move {
  0% {
    left: 0;
    width: 4px;
    height: 4px;
  }
  50% {
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
  }
  100% {
    left: calc(50% - 2px);
    top: calc(50% - 2px);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid transparent;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

img {
  border: 2px solid white;
  transition: border-color 0.3s;
}

.loader-animation.animate ~ img {
  border-color: #3498db; /* Blue */
  border-color: #e74c3c; /* Red */
  border-color: #f1c40f; /* Yellow */
  border-color: #2ecc71; /* Green */
}
</style>
