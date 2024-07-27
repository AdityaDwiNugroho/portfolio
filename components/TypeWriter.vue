<template>
    <span class="text-4xl md:text-6xl font-bold">{{ displayedText }}</span>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  
  export default {
    props: {
      phrases: {
        type: Array,
        required: true
      },
      typeSpeed: {
        type: Number,
        default: 150
      },
      backSpeed: {
        type: Number,
        default: 75
      },
      loop: {
        type: Boolean,
        default: true
      }
    },
    setup(props) {
      const displayedText = ref('')
      const placeholderText = ref('')
      const typing = ref(false)
  
      const typePhrase = (phrase, onComplete) => {
        let i = 0
        const interval = setInterval(() => {
          if (i < phrase.length) {
            displayedText.value += phrase[i]
            i++
          } else {
            clearInterval(interval)
            setTimeout(onComplete, 1000)
          }
        }, props.typeSpeed)
      }
  
      const backspace = (onComplete) => {
        const interval = setInterval(() => {
          if (displayedText.value.length > 0) {
            displayedText.value = displayedText.value.slice(0, -1)
          } else {
            clearInterval(interval)
            onComplete()
          }
        }, props.backSpeed)
      }
  
      const typeNextPhrase = (index = 0) => {
        typePhrase(props.phrases[index], () => {
          if (index < props.phrases.length - 1 || props.loop) {
            setTimeout(() => {
              backspace(() => {
                typeNextPhrase((index + 1) % props.phrases.length)
              })
            }, 1000)
          }
        })
      }
  
      const setPlaceholderText = () => {
        if (!typing.value) {
          placeholderText.value = 'Aditya Dwi Nugroho'
        }
      }
  
      onMounted(() => {
        setPlaceholderText()
        typeNextPhrase()
      })
  
      return { displayedText, placeholderText, typing }
    }
  }
  </script>
  