import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFormStore = defineStore('form', () => {
   const email = ref('')

   function setEmail(value) {
      email.value = value
   }

   return {
      email,
      setEmail
   }
})
