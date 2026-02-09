<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import { useRouter } from 'vue-router'
import phoneCountry from './phoneCountry.vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const firstName = ref('')
const lastName = ref('')
const phone = ref('')

const firstNameInput = ref(null)
const lastNameInput = ref(null)
const phoneInput = ref(null)

const errors = ref({
  firstName: '',
  lastName: '',
  phone: '',
  sector: '',
  colleague: ''
})

function clearError(field) {
  errors.value[field] = ''
}

function isValidPhone(value) {
  return /^[0-9+()\s-]{7,}$/.test(value)
}

async function handleSubmit() {
  Object.keys(errors.value).forEach(key => {
    errors.value[key] = ''
  })

  if (!firstName.value.trim()) {
    errors.value.firstName = t('FormAir12.required-field')
    await nextTick()
    firstNameInput.value?.focus()
    return
  }

  if (!lastName.value.trim()) {
    errors.value.lastName = t('FormAir12.required-field')
    await nextTick()
    lastNameInput.value?.focus()
    return
  }

  if (!phone.value.trim()) {
    errors.value.phone = t('FormAir12.required-field')
    await nextTick()
    phoneInput.value?.focus()
    return
  }

  if (!isValidPhone(phone.value)) {
    errors.value.phone = t('FormAir12.invalid-phone')
    await nextTick()
    phoneInput.value?.focus()
    return
  }

  let selectError = false

  if (!selectedSector.value) {
    errors.value.sector = t('FormAir12.required-select')
    selectError = true
  }

  if (!selectedColleague.value) {
    errors.value.colleague = t('FormAir12.required-select')
    selectError = true
  }

  if (selectError) return
  router.push('/PageAir16')
}


const onScroll = () => {
 
}

const isOpen = ref(false)
const isOpen2 = ref(false)

const router = useRouter()

const password = ref('')
const passwordRepeat = ref('')
const showErrors = ref(false)

watch(password, () => {
  showErrors.value = false
})

watch(passwordRepeat, () => {
  showErrors.value = false
})

const selectedSector = ref("")
const sectors = computed(() => tm('FormAir12.selectedSector'))

function selectSector(item) {
  selectedSector.value = item
  isOpen.value = false
}
function toggleSector() {
  errors.value.sector = ''
  isOpen.value = !isOpen.value
}


const selectedColleague = ref("")
const colleague = [
  "1-50",
  "51-100",
  "101-300",
  "301-500",
  "501-1000",
  "1.001-10.000",
  "10.000+"
]

function selectColleague(item) {
  selectedColleague.value = item
  isOpen2.value = false
}
function toggleColleague() {
  errors.value.colleague = ''
  isOpen2.value = !isOpen2.value
}


function clearAllErrors() {
  Object.keys(errors.value).forEach(key => {
    errors.value[key] = ''
  })
}


function handleClickOutside(e) {
  const isFormField = e.target.closest(
    '.forms__input, .dropdown, .error'
  )

  if (!e.target.closest('.select-wrap')) {
    isOpen.value = false
    isOpen2.value = false
  }

  if (!isFormField) {
    clearAllErrors()
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside)
})
</script>

<template>
  <div class="form__container">
    <div class="form__img">
      <img src="./icons/Step_01.svg" alt="img">
    </div>
    <h1 class="form__title">{{ t('FormAir12.title') }}</h1>
    <form action="#" method="post" class="forms">
      <div class="forms__block">
       <div class="forms__name">
         <label for="text" class="forms__lable">{{ t('FormAir12.firstNameLabel') }}</label>
         <input
         :title="t('FormAir12.required-field')"
         ref="firstNameInput"
         type="text" 
         class="forms__input" 
         :placeholder="t('FormAir12.firstNamePlaceholder')"  
         v-model="firstName" 
         @input="clearError('firstName')">
         <p v-if="errors.firstName" class="error-text error-animate">
           <img src="./icons/exclamation.svg" alt="">
           {{ errors.firstName }}
         </p>
       </div>
       <div class="forms__surname">
         <label for="text" class="forms__lable">{{ t('FormAir12.lastNameLabel') }}</label>
         <input
         :title="t('FormAir12.required-field')"
         ref="lastNameInput"
         type="text"
         class="forms__input"
         :placeholder="t('FormAir12.lastNamePlaceholder')"
         v-model="lastName"
         @input="clearError('lastName')"/>
         <p v-if="errors.lastName" class="error-text error-animate">
           <img src="./icons/exclamation.svg" alt="">
           {{ errors.lastName }}
         </p>
       </div>
     </div>
     <div class="phone-field">
        <phoneCountry></phoneCountry>
        <div class="forms__tel">
          <label for="tel" class="forms__lable">{{ t('FormAir12.phoneLabel') }}</label>
          <input
          :title="t('FormAir12.required-field')"
          ref="phoneInput" 
          type="text" 
          inputmode="tel"
          class="forms__input tel" 
          :placeholder="t('FormAir12.phonePlaceholder')"
          v-model="phone"
          @input="clearError('phone')">
          <p v-if="errors.phone" class="error-text error-animate">
            <img src="./icons/exclamation.svg" alt="">
            {{ errors.phone }}
          </p>
        </div>
     </div>

     <div class="forms__business select-wrap" :class="{ open: isOpen }">
        <label class="forms__lable">{{ t('FormAir12.sectorLabel') }}</label>
        <div class="dropdown" @click="toggleSector">
          <span :class="{ 'is-selected': selectedSector }">
            {{ selectedSector || t('FormAir12.sectorSelectDefault') }}
          </span>

          <svg class="select-arrow" width="13" height="6" viewBox="0 0 12 8">
            <path d="M6 8L0 0H12L6 8Z" fill="#003F34"/>
          </svg>
        </div>
        <Transition name="dropdown">
          <div class="list-wrap" v-show="isOpen">
            <ul class="dropdown-list scroll-area" ref="listRef" @scroll="onScroll">
              <li v-for="item in sectors" :key="item" @click.stop="selectSector(item)">
                {{ item }}
              </li>
            </ul>
          </div>
        </Transition>
        <p v-if="errors.sector" class="error error-animate">
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="9"/>
            <line x1="12" y1="10" x2="12" y2="16"/>
            <circle cx="12" cy="7" r="1"/>
          </svg>
          {{ errors.sector }}
        </p>
     </div>

      
     <div class="forms__employee select-wrap" :class="{ open: isOpen2 }">
        <label for="text" class="forms__lable">{{ t('FormAir12.colleagueLabel') }}</label>
        <div class="dropdown colleagues"  @click="toggleColleague">
          <span :class="{ 'is-selected': selectedColleague }">
            {{ selectedColleague || t('FormAir12.colleagueSelectDefault') }}
          </span>
              
          <svg class="select-arrow2" width="13" height="6" viewBox="0 0 12 8">
            <path d="M6 8L0 0H12L6 8Z" fill="#003F34" stroke="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <Transition name="dropdown">
          <div class="list-wrap" v-show="isOpen2">
            <ul class="dropdown-list scroll-area" ref="listRef" @scroll="onScroll">
              <li v-for="item in colleague" :key="item" @click.stop="selectColleague(item)">
                {{ item }}
              </li>
            </ul>
          </div>
        </Transition>
        <p v-if="errors.colleague" class="error error-animate">
         <svg width="20" height="20" viewBox="0 0 22 22" fill="none" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <circle cx="12" cy="12" r="9"/>
           <line x1="12" y1="10" x2="12" y2="16"/>
           <circle cx="12" cy="7" r="1"/>
         </svg>
         {{ errors.colleague }}
        </p>
     </div>
    </form>
    <div class="button">
      <button type="button" class="button__сomeback" @click="router.push('/PageAir5')">
        <svg class="icon-back" width="50" height="50" viewBox="0 0 50 50" fill="none">
          <circle cx="24" cy="24" r="23" stroke="currentColor" stroke-width="1"/>
          <path d="M35 24H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M22 18L16 24L22 30" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button type="button" class="button__registr" @click.stop="handleSubmit">
        <div class="button__reg">
          {{ t('FormAir12.buttonNext') }}
          <div class="button__icon">
            <img src="./icons/Variant.svg" alt="img">
          </div>
        </div>
      </button>
    </div>
 </div>
</template>

<style lang="scss" scoped>

.form {

   &__container {
      max-width: 447px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 0px 10px;
   }

   &__img {
      display: flex;
      justify-content: center;
      padding: 60px 0px 0px 0px
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

.forms {
   display: flex;
   flex-direction: column;
   gap: 20px;
   gap: calc(11px + (20 - 5) * ((100vw - 320px) / (1280 - 320)));

   &__block {
      display: flex;
      gap: 16px;
      gap: calc(5px + (16 - 5) * ((100vw - 320px) / (1280 - 320)));
   }

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

   &__name,
   &__surname,
   &__tel,
   &__business,
   &__employee {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;
      gap: calc(3px + (8 - 3) * ((100vw - 320px) / (1280 - 320)));
      position: relative;
   }
}

.forms__input:focus-visible {
  border-color: var(--color-title);
}

.phone-field {
  position: relative;
}

.tel {
  padding: 16px 16px 16px 50px;
}

 @media (min-width: 768px) {
  .button {
    padding: 5px 0px 0px 0px;
  }
}

  @media (max-width: 767.98px) {
   .forms__block {
    flex-direction: column;
   }
   .form__img {
    padding: 80px 0px 0px 0px;
   }
   .button {
    padding-bottom: 30px;
   }
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

.error {
   display: flex;
   justify-content: left;
   align-self: center;
   align-items: center;
   gap: 10px;
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


.select-wrap {
  position: relative;
}

.dropdown {
  appearance: none;
  position: relative;
  background: var(--color-fff);
  border-radius: var(--border-input);
  padding: 18px 40px 19px 13px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 160%;
} 

.dropdown span {
  color: var(--color-placeholder); 
}

.dropdown span.is-selected {
  color: var(--color-title); 
}

.select-arrow {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%) rotate(0deg);
  transition: transform 0.25s ease;
  pointer-events: none;
}
.select-wrap.open .select-arrow {
  transform: translateY(-50%) rotate(180deg);
}

.select-wrap.open .dropdown {
  border-radius: 20px 20px 0px 0px;
  border: 1px solid var(--color-title);
  border-bottom: none;
  transition: 0.2s ease-in-out;
}

.select-arrow2 {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%) rotate(0deg);
  transition: transform 0.25s ease;
  pointer-events: none;
}
.select-wrap.open .select-arrow2 {
   transform: translateY(-50%) rotate(180deg);
}

.list-wrap {
  position:absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 0px 0px 20px 20px;
  border: 1px solid var(--color-title);
  border-top: none;
  height: 230px;
  overflow: hidden;
  z-index: 20;
}

.scroll-area {
  height: 100%;
  overflow-y: auto;
  padding-right: 8px;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
}

.dropdown-list {
  box-shadow: 0px 8px 20px rgba(0,0,0,0.06);
}
.dropdown-list::-webkit-scrollbar {
   width: 3px;
}
.dropdown-list::-webkit-scrollbar-track {
  background: #b3b6b4;
}
.dropdown-list::-webkit-scrollbar-thumb {
  background: #050505;
  border-radius: 5px;
}

.dropdown-list li {
  padding: 12px 14px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 14px;
  border-bottom: 1px solid #cccfcd;
  max-width: 412px;
  position: relative;
  left: 8px;
}

.dropdown-list li:first-child {
  border-top: 1px solid #cccfcd;
}

.dropdown-list li:last-child {
  border-bottom: none;
}

.dropdown-list li:hover {
  color: var(--color-hover);
}

.button {
   display: flex;
   gap: 16px;

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



