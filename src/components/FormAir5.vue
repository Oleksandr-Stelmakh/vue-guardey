<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const password = ref('')
const passwordRepeat = ref('')

const showErrors = ref(false)
const submitStep = ref(0)

const passwordInput = ref(null)
const passwordRepeatInput = ref(null)


watch(passwordRepeat, () => {
  if (submitStep === 3 && isPasswordsMatch.value) {
    submitStep.value = 0
    showErrors.value = false
  }
})

const hasUppercase = computed(() => /[A-Z]/.test(password.value))
const hasNumber = computed(() => /[0-9]/.test(password.value))
const hasSpecial = computed(() => /[^A-Za-z0-9]/.test(password.value))

const conditionsMet = computed(() => {
  return [hasUppercase.value, hasNumber.value, hasSpecial.value].filter(Boolean).length
})

const passwordStarted = computed(() => password.value.length > 0)
const passwordLength = computed(() => password.value.length >= 12)
const allGood = computed(() => {
  return passwordLength.value && hasUppercase.value && hasSpecial.value && hasNumber.value
})


const isPasswordValid = computed(() => password.value.trim().length > 0)
const isPasswordRepeatValid = computed(() => passwordRepeat.value.trim().length > 0)
const isPasswordsMatch = computed(() => password.value === passwordRepeat.value)



const handleSubmit = async () => {
  showErrors.value = true

  if (!isPasswordValid.value) {
    submitStep.value = 1
    await nextTick()
    passwordInput.value?.focus()
    return
  }

  if (!isPasswordRepeatValid.value) {
    submitStep.value = 3
    await nextTick()
    passwordRepeatInput.value?.focus()
    return
  }

  if (!isPasswordsMatch.value) {
    submitStep.value = 3
    await nextTick()
    passwordRepeatInput.value?.focus()
    return
  }

  if (conditionsMet.value !== 3 || !passwordLength.value) {
    submitStep.value = 1
    await nextTick()
    passwordInput.value?.focus()
    return
  }
  router.push('/PageAir12')
}


const formContainer = ref(null)

function onDocumentClick(e) {
  if (!formContainer.value.contains(e.target)) {
  showErrors.value = false
  submitStep.value = 0
}
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})
onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
})


function decorClass(level) {
  if (passwordLength.value && conditionsMet.value === 3) {
    return "green"
  }

  if (conditionsMet.value === 3 && level <= 2) {
    return "orange"
  }

  if (password.value.length > 0) {
    if (level === 1) return "red"
  }

  return ""
}

const showPassword = ref(false)
const showPasswordRepeat = ref(false)
</script>


<template>
  <div class="form__container" ref="formContainer">
    <div class="form__img">
      <img src="./icons/Step.svg" alt="img">
    </div>
    <h1 class="form__title">Maak een nieuw wachtwoord</h1>
    <form class="forms" @submit.prevent>
      <div class="forms__password field">
        <label for="password" class="forms__lable">Wachtwoord:</label>
          <div class="input-wrapper">
            <input
            title="Заполните это поле"
            ref="passwordInput"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            class="forms__input"
            placeholder="Jouw unieke en geheime code"
            :class="{ error: submitStep === 1,
            'error-danger': submitStep === 3 && !isPasswordsMatch }"/>
            <span class="toggle-pass" @click="showPassword = !showPassword">
              <svg v-if="!showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3L21 21" stroke="#011816" stroke-width="2" stroke-linecap="round"/>
                <path d="M10.58 10.58C10.21 11 10 11.48 10 12C10 13.1 10.9 14 12 14C12.52 14 13 13.79 13.41 13.42" stroke="#011816" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.53 9.47C14.07 9.17 13.55 9 13 9C11.9 9 11 9.9 11 11C11 11.55 11.17 12.07 11.47 12.53" stroke="#011816" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.88 5.08C10.58 5.03 11.28 5 12 5C17 5 21.27 8.11 23 12C22.18 13.85 20.88 15.47 19.19 16.73" stroke="#011816" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.81 7.27C3.12 8.53 1.82 10.15 1 12C2.38 15.19 5.42 17.69 9 18.58" stroke="#011816" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5C7 5 2.73 8.11 1 12C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 12C21.27 8.11 17 5 12 5Z" stroke="#011816" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="#011816" stroke-width="2"/>
              </svg>
            </span>
          </div>
          <div  
            v-if="showErrors && submitStep === 1 && !isPasswordValid"
            class="error-text error-animate">
            <img src="./icons/exclamation.svg" alt="">
            Vul dit veld in!
          </div>
        <div v-if="submitStep === 3 && !isPasswordsMatch"
          class="error-repeat error-animate">
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="9"/>
            <line x1="12" y1="10" x2="12" y2="16"/>
            <circle cx="12" cy="7" r="1"/>
          </svg>
            The passwords do not match
        </div>
      </div>

      <div class="forms__info">
        <div class="forms__infoRect"></div>
        <div class="forms__decor">
          <div class="forms__decor1" :class="decorClass(1)"></div>
          <div class="forms__decor2" :class="decorClass(2)"></div>
          <div class="forms__decor3" :class="decorClass(3)"></div>
        </div>
        <div 
         class="forms__text password-req"
         :class="{
         'red': passwordStarted && !allGood,
         'green': allGood
         }">
         Een goed wachtwoord heeft minimaal <span :class="passwordStarted ? (passwordLength ? 'ok' : 'bad') : ''">12 karakters</span>, 
         <span :class="passwordStarted ? (hasUppercase ? 'ok' : 'bad') : ''">1 hoofdletter</span>, 
         <span :class="passwordStarted ? (hasSpecial ? 'ok' : 'bad') : ''">1 speciaal karakter</span> en 
         <span :class="passwordStarted ? (hasNumber ? 'ok' : 'bad') : ''">1 getal</span>.
        </div>
      </div>

      <div class="forms__passwordRepeat field">
        <label for="password" class="forms__lable">Herhaal wachtwoord:</label>
          <div class="input-wrapper">
            <input
              title="Заполните это поле"
              ref="passwordRepeatInput"
              v-model="passwordRepeat"
              :type="showPasswordRepeat ? 'text' : 'password'"
              class="forms__input"
              placeholder="Jouw unieke en geheime code"
              :class="{ error: submitStep === 3 && !isPasswordRepeatValid }"/>
            <span class="toggle-pass" @click="showPasswordRepeat = !showPasswordRepeat">
              <svg v-if="!showPasswordRepeat" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3L21 21" stroke="#011816" stroke-width="2" stroke-linecap="round"/>
                <path d="M10.58 10.58C10.21 11 10 11.48 10 12C10 13.1 10.9 14 12 14C12.52 14 13 13.79 13.41 13.42" stroke="#011816" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.53 9.47C14.07 9.17 13.55 9 13 9C11.9 9 11 9.9 11 11C11 11.55 11.17 12.07 11.47 12.53" stroke="#011816" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.88 5.08C10.58 5.03 11.28 5 12 5C17 5 21.27 8.11 23 12C22.18 13.85 20.88 15.47 19.19 16.73" stroke="#011816" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.81 7.27C3.12 8.53 1.82 10.15 1 12C2.38 15.19 5.42 17.69 9 18.58" stroke="#011816" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5C7 5 2.73 8.11 1 12C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 12C21.27 8.11 17 5 12 5Z" stroke="#011816" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="#011816" stroke-width="2"/>
              </svg>
            </span>
          </div>
          <div
            v-if="showErrors && submitStep === 3 && !isPasswordRepeatValid"
            class="error-text error-animate">
            <img src="./icons/exclamation.svg" />
            Vul dit veld in!
          </div>
      </div>
    </form>

    <div class="button">
      <button type="button" class="button__сomeback" @click="router.push('/PageAir1')">
        <svg class="icon-back" width="50" height="50" viewBox="0 0 50 50" fill="none">
          <circle cx="24" cy="24" r="23" stroke="currentColor" stroke-width="1"/>
          <path d="M35 24H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M22 18L16 24L22 30" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <button type="button" class="button__registr" @click="handleSubmit">
        <div class="button__reg">
          Volgende
          <div class="button__icon">
            <img src="./icons/Variant.svg" alt="img">
          </div>
        </div>
      </button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.forms__decor1.red { background: var(--color-error) !important; opacity: 1 !important; }
.forms__decor1.orange { background: var(--color-error-yellow) !important; opacity: 1 !important; }
.forms__decor2.orange { background: var(--color-error-yellow) !important; opacity: 1 !important; }
.forms__decor1.green,
.forms__decor2.green,
.forms__decor3.green { background: var(--color-error-green) !important; opacity: 1 !important; }

.password-req {
  transition: color .25s ease;
  color: var(--color-title); 
}

.password-req span {
  transition: color .25s ease;
}

.password-req span.bad {
  color: var(--color-error) !important; 
}

.password-req span.ok {
  color: var(--color-error-green) !important; 
}

.error-animate {
  animation: errorIn 0.25s ease forwards;
}

@keyframes errorIn {
  from {
    opacity: 0;
    transform: translateX(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.input-wrapper {
  position: relative;
  width: 100%;
  display: grid;
}

.toggle-pass {
  position: absolute;
  right: 10px;
  top: 57%;
  transform: translateY(-50%);
  cursor: pointer;
  opacity: 0.7;
  transition: 0.2s;
}

.toggle-pass:hover {
  opacity: 1;
}

.toggle-pass img {
  width: 20px;
  height: 20px;
}

.field {
  position: relative;
}

.error-text {
  position: absolute;
  top: 100%;
  left:10px;
  display: flex;
  align-items: center;
  gap: 6px;
  width: max-content;
  max-width: 220px;
  padding: 6px 10px;
  margin-top: 8px;
  background: var(--color-fff);
  color: var(--color-error-text);
  font-size: 13px;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.error-repeat {
   display: flex;
   justify-content: left;
   align-self: center;
   align-items: center;
   width: 100%;
   height: 55px;
   box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
   border-radius: 20px;
   background-color: var(--color-error-pink);
   opacity: 0.7;
   color: var(--color-error-text);
   font-size: 13px;
   margin-top: -3px;
   padding-left: 20px;
}

.error-repeat svg {
   padding-right: 5px;
}

.forms__input.error {
   border-color: var(--color-title);
}
.forms__input.error-danger {
  border-color: var(--color-error);
}


.error-text::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 14px;
  width: 10px;
  height: 10px;
  background: var(--color-fff);
  border-left: 1px solid var(--color-title);
  border-top: 1px solid var(--color-title);
  transform: rotate(45deg);
}

.error-text img {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.form {

   &__container {
      max-width: 490px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 0px 10px;
   }

   &__img {
      display: flex;
      justify-content: center;
      padding: 60px 0px 0px 0px;
   }

   &__title {
      font-weight: 400;
      font-size: 30px;
      line-height: 120%;
      letter-spacing: -1px;
      text-align: center;
      font-size: calc(18px + (30 - 20) * ((100vw - 300px) / (1280 - 300)));
   }   
} 

.form__img img {
   max-width: 100%;
   object-fit: cover;
}

.forms__password,
.forms__passwordRepeat {
   display: flex;
   flex-direction: column;
   gap: 10px;
}

.forms__input::placeholder {
   color: var(--color-placeholder);
}

.forms {
   display: flex;
   flex-direction: column;
   gap: 20px;
   gap: calc(11px + (20 - 5) * ((100vw - 320px) / (1280 - 320)));

   &__lable {
      font-weight: 400;
      font-size: 14px;
      line-height: 160%;
   }

   &__input {
      background: var(--color-input);
      border-radius: var(--border-input);
      padding: 16px 30px 16px 13px;
      font-weight: 400;
      font-size: 14px;
      line-height: 160%;
      border: solid 1px transparent;
      transition: border-color 0.25s ease;
   }

   &__info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      margin-top: -10px;
      width: 100%;
      border-radius: var(--border-forms_info);
      background-color: var(--color-infoRect);
   }

   &__infoRect {
      position: relative;
      width: 11.09px;
      height: 11.09px;
      top: -6px;
      background: var(--color-infoRect);
      transform: rotate(45deg);
   }

   &__decor {
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: 10px;
      padding: 0px 0px 12px 20px;
      padding-left: calc(4px + (20 - 4) * ((100vw - 521px) / (1280 - 521)));
   }

   &__decor1,
   &__decor2,
   &__decor3 {
      width: 30%;
      height: 5px;
      border-radius: var(--border-forms_decor);
      opacity: 0.2;
      background-color: var(--color-title);
   }

   &__text {
      max-width: 419px;
      font-family: var(--font-family-Kumbh);
      font-weight: 400;
      font-size: 14px;
      line-height: 160%;
      letter-spacing: 0.5px;
      text-align: center;
      color: var(--color-title);
      padding: 0px 0px 15px 0px;
      font-size: calc(12px + (14 - 12) * ((100vw - 320px) / (1280 - 320)));
   }
}

.forms__input:focus-visible {
  border-color: var(--color-title);
}

  @media (max-width: 991.98px) {
   .forms__info {
    margin-top: calc(0px + (-10 - 0) * ((100vw - 300px) / (991.98 - 300)));
   }
}

.button {
   display: flex;
   gap: 16px;
   padding: 5px 0px 0px 0px;
   

   &__registr {
      width: 100%;
      padding: 16px 0px;
      background-color: var(--color-lime);
      border-radius: var(--border-input);
      transition: background-color 0.3s ease 0s;
   }

   &__reg {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-weight: 600;
      width: 100%;
      height: 100%;
      color: var(--color-green);
      transition: color 0.3s ease;
   }
}

.button__reg img {
   position: relative;
   top: 4px;
   
}

.button__registr:hover {
  background-color: var(--color-hover);
}

.button__registr:hover .button__reg {
  color: var(--color-fff);
}

.button__registr:hover img {
  filter: brightness(0) invert(1);
  transition: filter 0.3s ease;
}

.icon-back {
  color: var(--color-green);   
  transition: 0.2s;
}

.icon-back:hover {
  color: var(--color-hover);
}
</style>