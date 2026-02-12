<script setup>
import { useFormStore } from '@/stores/formStore'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const formStore = useFormStore()

</script>

<template>
   <div class="form__container">
      <div class="form__img">
         <img src="./icons/Step_02.svg" alt="img">
      </div>
      <h1 class="form__title">{{ t('FormAir16.title') }}</h1>
      <div class="form__subtitle">
         <p>{{ t('FormAir16.subtitle') }}</p>
         <div>
            {{ t('FormAir16.subtitlefirst') }} <span>{{ formStore.email }}</span> {{ t('FormAir16.subtitlelast') }}
         </div>
      </div>
      <form action="#" method="post" class="forms">
         <div class="forms__code">
            <label for="text" class="forms__lable">{{ t('FormAir16.firstCodeLabel') }}</label>
            <input 
            :title="t('FormAir16.required-field')"
            type="text"
            inputmode="numeric"
            maxlength="6"
            autocomplete="one-time-code" 
            class="forms__input" 
            :placeholder="t('FormAir16.firstCodePlaceholder')" >
        </div>
        <button type="button" class="button__registr">
              {{ t('FormAir16.buttonNext') }}
                 <img src="./icons/Variant.svg" alt="img">
        </button>
      </form>
      <div class="forms__txt">
         <a href="#">{{ t('FormAir16.forms-txt') }}</a>
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

   &__img {
      display: flex;
      justify-content: center;
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
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      p {
         padding: 0px 0px 25px 0px
      }

      span {
         font-weight: 600;
      }
   }
}

.form__img img {
   max-width: 100%;
   object-fit: cover;
}

span:hover {
   color: var(--color-hover);
}

.forms {
   display: flex;
   flex-direction: column;
   gap: 20px;

   &__code {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
   }

    &__lable {
      font-size: 14px;
      line-height: 160%;
   }

   &__input {
      background: var(--color-input);
      border-radius: var(--border-input);
      padding: 16px 30px 16px 13px;
      font-size: 14px;
      line-height: 160%;
      border: solid 1px transparent;
      transition: border-color 0.25s ease;
   }

   &__txt {
      font-weight: 600;
      font-size: 14px;
      text-align: center;
      padding: 0px 0px 22px 0px;
      color: var(--color-green);
   }
}

.forms__input:focus-visible {
  border-color: var(--color-title);
}

.forms__txt a:hover {
   color: var(--color-hover);
}

.button {
   display: flex;
   gap: 16px;
   padding: 5px 0px 0px 0px;

   &__registr {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-weight: 600;
      width: 100%;
      height: 100%;
      color: var(--color-green);
      padding: 16px 0px;
      background-color: var(--color-lime);
      border-radius: var(--border-input);
      transition: background-color 0.3s ease, color 0.3s ease;
      border: none;
      cursor: pointer;
   }
}

.button__registr img {
   position: relative;
   top: 2px;
}

.button__registr:hover {
  background-color: var(--color-hover);
  color: var(--color-fff);
}

.button__registr:hover img {
  filter: brightness(0) invert(1);
  transition: filter 0.3s ease;
}

</style>