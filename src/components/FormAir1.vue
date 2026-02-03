<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useFormStore } from '@/stores/formStore'

const { t } = useI18n()
const router = useRouter()
const formStore = useFormStore()

const email = ref('')
const address = ref('')

const emailInput = ref(null)
const addressInput = ref(null)

const emailHint = ref('')


const errors = ref({
  email: '',
  address: ''
})

function clearError(field) {
  errors.value[field] = ''
}

function clearAllErrors() {
  Object.keys(errors.value).forEach(key => {
    errors.value[key] = ''
  })
}

function validateEmail(value) {
  if (!value.includes('@')) {
    return `Адрес электронной почты должен содержать символ "@". 
В адресе "${value}" отсутствует символ "@".`
  }
  
    const parts = value.split('@')
  if (!parts[1]) {
    return `Введите часть адреса после символа "@". 
Адрес "${value}" неполный.`
  }
  return ''
}


async function handleSubmit() {
  clearAllErrors()

  // Email — первый
  if (!email.value.trim()) {
    errors.value.email = 'Заполните это поле'
    await nextTick()
    emailInput.value?.focus()
    return
  }

 const emailError = validateEmail(email.value)
  if (emailError) {
    errors.value.email = emailError
    await nextTick()
    emailInput.value?.focus()
    return
  }

  // Company — второй
  if (!address.value.trim()) {
    errors.value.address = 'Заполните это поле'
    await nextTick()
    addressInput.value?.focus()
    return
  }
  formStore.setEmail(email.value)
  // Всё ок
  router.push('/PageAir5')
}

function onEmailInput() {
  // убираем ошибку
  errors.value.email = ''

  // если поле пустое — подсказку не показываем
  if (!email.value.trim()) {
    emailHint.value = ''
    return
  }

  // показываем подсказку, если email некорректный
  emailHint.value = validateEmail(email.value)
}


function handleClickOutside(e) {
  const isFormField = e.target.closest(
    '.forms__input, .error-text, button'
  )

  if (!isFormField) {
    clearAllErrors()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>


<template>
   <div class="form__container">
		<h1 class="form__title">{{ t('form.title') }}</h1>
		<div class="form__subtitle">{{ t('form.subtitle') }}</div>
		<form class="forms">
			<div class="forms__email">
				<label for="email" class="forms__lable">{{ t('form.email') }}</label>
				<input
            title="Заполните это поле" 
            ref="emailInput" 
            v-model="email" 
            @input="onEmailInput"
            :class="{ error: errors.email }"
            class="forms__input" 
            :placeholder="t('forms__input.placeholder')">
               <p v-if="errors.email" class="error-text error-animate">
                  <img src="./icons/exclamation.svg" alt="">
                  {{ errors.email }}
               </p> 
               <p v-else-if="emailHint" class="hint-text">
                  <img src="./icons/exclamation.svg" alt="">
                  {{ emailHint }}
               </p> 
			</div>
			<div class="forms__address">
				<label for="address" class="forms__lable">{{ t('form.company') }}</label>
				<input
            title="Заполните это поле"
            ref="addressInput" 
            v-model="address"
            @input="clearError('address')"
            :class="{ error: errors.address }" 
            class="forms__input" 
            :placeholder="t('form.placeholder')">
               <p v-if="errors.address" class="error-text error-animate">
                  <img src="./icons/exclamation.svg" alt="">
                  {{ errors.address }}
               </p>
			</div>
			<div class="forms__btn">
				<a href="#" class="forms__btn-btn">{{ t('forms.btn-btn')}}</a>
			</div>
		</form>
		<div class="form__button button">
			<button type="button" class="button__registr" @click="handleSubmit">
				<a href="#" class="button__reg">
					{{ t('form.reg') }}
						<img src="./icons/Variant.svg" alt="img">
				</a>
			</button>
			<div class="button__login">
				<a href="#" class="button__log">
					<img src="./icons/Group.svg" alt="img">
					{{ t('form.log') }}
				</a>
			</div>
		</div>
		<div class="form__txt">
			<p class="txt">
				{{ t('form.txt') }} <br>
				<a href="#">{{ t('form.privacy') }}</a> {{ t('form.en') }} <a href="#">{{ t('form.gebrui') }}</a>
			</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
   .form {

   &__container {
      max-width: 490px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 0px 10px;
   }

   &__title {
      font-weight: 400;
      font-size: 30px;
      line-height: 120%;
      letter-spacing: -1px;
      text-align: center;
      font-size: calc(18px + (30 - 20) * ((100vw - 300px) / (1280 - 300)));
   }

   &__subtitle {
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      text-align: center;
      align-self: center;
      font-size: calc(13px + (16 - 13) * ((100vw - 360px) / (1280 - 360)));
   }

   &__button {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 5px 0px 0px 0px;
   }

   &__txt {
      display: flex;
      justify-content: center; 
   }
} 
.form__txt a {
   text-decoration: underline;
   font-weight: 600;

    &:hover {
      color: var(--color-hover);
    }
}

@media (max-width: 991.98px) {
  .form__txt {
    padding-bottom: 50px;
    font-size: calc(13px + (16 - 13) * ((100vw - 300px) / (991.98 - 300)));
  }
  }

.forms__email,
.forms__address {
   display: flex;
   flex-direction: column;
   gap: 10px;
   position: relative;
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
      padding: 16px 16px;
      font-weight: 400;
      font-size: 14px;
      line-height: 160%;
      border: solid 1px transparent;
      transition: border-color 0.25s ease;
   }

   &__btn {
      display: flex;
      justify-content: end;
   }

   &__btn-btn {
      font-weight: 600;
      font-size: 14px;
      line-height: 130%;
      text-decoration: underline;

        &:hover {
      color: var(--color-hover);
    }
   }
}

.forms__input:focus-visible {
  border-color: var(--color-title);
}

.forms__input::placeholder {
   color: var(--color-placeholder);
}

input.error {
   border-color: var(--color-title);
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
  color: red;
  font-size: 13px;
  border: 1px solid var(--color-title);
  border-radius: 5px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.error-text::before,
.hint-text::before {
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

.error-text img,
.hint-text img {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
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

.hint-text {
  position: absolute;
  top: 100%;
  margin-top: 8px;
  padding: 6px 10px;
  width: 100%;
  font-size: 13px;
  background: var(--color-fff);
  color: var(--color-title);
  border: 1px solid var(--color-title);
  border-radius: 5px;
  box-shadow: 3px 3px 5px rgba(0,0,0,0.3);
  z-index: 9;
}

.button {

   &__registr {
      padding: 16px 0px;
      background-color: var(--color-lime);
      border-radius: var(--border-input);
      transition: background-color 0.3s ease 0s;
   }

   &__reg,
   &__log {
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

   &__login {
      padding: 17px 0px;
      background-color: var(--color-light-green);
      border: 2px solid var(--color-green);
      border-radius: var(--border-input);
      transition: background-color 0.3s ease 0s;
   }
}

.button__registr:hover,
.button__login:hover {
  background-color: var(--color-hover);
}

.button__registr:hover .button__reg,
.button__login:hover .button__log {
  color: var(--color-fff);
}


.button__registr:hover img,
.button__login:hover img {
  filter: brightness(0) invert(1);
  transition: filter 0.3s ease;
}


.button__reg img {
   position: relative;
   top: 1px;
}
</style>