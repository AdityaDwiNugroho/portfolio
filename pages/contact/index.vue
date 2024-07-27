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
        class="fixed left-0 top-0 h-full w-16 md:w-24 flex flex-col items-center justify-between py-8 bg-opacity-90 backdrop-filter backdrop-blur-lg z-20 transition-colors duration-300"
        :class="darkMode ? 'bg-gray-800' : 'bg-white'"
      >
        <div class="flex flex-col items-center space-y-8">
          <NuxtLink to="/" class="text-2xl font-bold" :class="darkMode ? 'text-white' : 'text-gray-900'">{{ initials }}</NuxtLink>
          <NuxtLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.path"
            class="p-2 rounded-full transition-colors duration-300"
            :class="darkMode ? 'text-white hover:text-white hover:bg-blue-500' : 'text-gray-900 hover:text-gray-900 hover:bg-blue-500'"
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
            class="p-2 rounded-full transition-colors duration-300"
            :class="darkMode ? 'text-white hover:text-white hover:bg-blue-500' : 'text-gray-900 hover:text-gray-900 hover:bg-blue-500'"
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
          :class="darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'"
        >
          <Icon
            :icon="darkMode ? 'ph:sun-bold' : 'ph:moon-bold'"
            class="w-6 h-6"
          />
        </button>
  
        <h1 class="text-4xl font-bold text-center mb-8" :class="darkMode ? 'text-white' : 'text-gray-900'">
          Drop me a message, and I'll reach out to you soon.
        </h1>
  
        <div class="flex space-x-8">
          <div id="code" class="w-1/2 p-6 rounded-lg transition-colors duration-300" :class="darkMode ? 'bg-gray-800' : 'bg-white'">
            <pre :class="darkMode ? 'text-pink-500' : 'text-blue-600'">
              <code>{{ codeSnippet }}</code>
            </pre>
          </div>
  
          <form @submit.prevent="handleSubmit" class="w-1/2 space-y-4">
            <input
              v-model="senderInput"
              type="text"
              class="w-full p-3 rounded transition-colors duration-300"
              :class="darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'"
              placeholder="Your name"
            />
            <input
              v-model="recipientInput"
              type="email"
              class="w-full p-3 rounded transition-colors duration-300"
              :class="darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'"
              placeholder="Email"
            />
            <input
              v-model="subjectInput"
              type="text"
              class="w-full p-3 rounded transition-colors duration-300"
              :class="darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'"
              placeholder="Subject"
            />
            <textarea
            v-model="message"
            class="w-full p-3 rounded h-40 transition-colors duration-300"
            :class="darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'"
            placeholder="Your message"
          ></textarea>
            <div class="flex items-center space-x-2">
              <input
                v-model="isChecked"
                type="checkbox"
                class="form-checkbox h-5 w-5 transition-colors duration-300"
                :class="darkMode ? 'text-blue-400' : 'text-blue-600'"
              />
              <label class="text-sm" :class="darkMode ? 'text-gray-300' : 'text-gray-700'">
                I agree that Alpay may use my personal data (name and e-mail address) to contact me.
              </label>
            </div>
            <p class="text-sm" :class="darkMode ? 'text-gray-400' : 'text-gray-600'">
              By submitting this request, you acknowledge that you have read the Privacy Policy
            </p>
            <button
              type="submit"
              class="w-full p-3 text-white rounded hover:bg-blue-700 transition-colors duration-300"
              :class="darkMode ? 'bg-blue-600' : 'bg-blue-500'"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
  
      <transition name="slide-up">
        <div v-if="showThankYou" class="fixed bottom-0 left-0 right-0 bg-green-500 text-white p-4 text-center">
          <Icon icon="ph:camera-bold" class="inline-block mr-2" />
          Thank you for your email. I will get back to you as soon as possible
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted } from 'vue'
  import { Icon } from '@iconify/vue'
  
  // Dark mode
  const darkMode = ref(false)
  
  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
    localStorage.setItem('darkMode', darkMode.value)
  }
  
  const initializeDarkMode = () => {
    const savedDarkMode = localStorage.getItem('darkMode')
    darkMode.value = savedDarkMode === 'true'
  }
  
  onMounted(() => {
    initializeDarkMode()
  })
  
  // Form state
  const senderInput = ref('somebody')
  const recipientInput = ref('allen@gmail.com')
  const subjectInput = ref('portrr')
  const message = ref(`Hello, intrepid traveler! 👋
  
  Across the cosmos, a message for you:
  
  "so good bro "
  
  Wishing you stardust dreams,
  
  somebody
  `)
  
  const sender = computed(() => `${senderInput.value} 🚀`)
  const recipient = computed(() => `${recipientInput.value}📧`)
  const subject = computed(() => `${subjectInput.value}✨`)
  
  const isChecked = ref(false)
  const showThankYou = ref(false)
  
  const codeSnippet = computed(() => `
  import { ref, computed } from "vue";
  
  // 🌈 Spreading Stardust:
  // Crafting Cosmic Email 🚀
  
  const sender = computed(() => ${JSON.stringify(sender.value)});
  const recipient = computed(() => ${JSON.stringify(recipient.value)});
  const subject = computed(() => ${JSON.stringify(subject.value)});
  const message = ref(\`${message.value}\`);
  `)
  
  const handleSubmit = () => {
    showThankYou.value = true
    setTimeout(() => {
      showThankYou.value = false
    }, 3000)
  }
  
  // Update message signature when sender changes
  watch(sender, (newSender) => {
    message.value = message.value.replace(/somebody$/, newSender.replace(' 🚀', ''))
  })
  
  const initials = "A."
  const navLinks = [
    { name: "Home", path: "/", icon: "ph:house-bold" },
    { name: "Projects", path: "/portfolio", icon: "ph:projector-screen-chart-bold" },
    { name: "About", path: "/about", icon: "ph:user-bold" },
    { name: "Contact", path: "/contact", icon: "ph:envelope-bold" },
  ]
  
  const socialLinks = [
    { name: "GitHub", icon: "ph:github-logo-bold", url: "https://github.com/AdityaDwiNugroho" },
    { name: "LinkedIn", icon: "ph:linkedin-logo-bold", url: "https://www.linkedin.com/in/aditya-dwi-nugroho-75057827a/" },
    { name: "Twitter", icon: "ph:twitter-logo-bold", url: "https://x.com/ProgrammerADN" },
  ]
  </script>
  
  <style scoped>
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: all 0.3s ease;
  }
  .slide-up-leave-to,
  .slide-up-enter-from {
    transform: translateY(100%);
    opacity: 0;
  }

  textarea {
    scrollbar-width: none; 
    resize: none;
  }

  textarea::-webkit-scrollbar {
    display: none;
  }

  #code {
    border: 2px solid white;
  }
  </style>
  