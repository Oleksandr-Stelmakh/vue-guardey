<script setup>
import {} from 'vue'
import { useRouter } from 'vue-router'
import { useFormStore } from '@/stores/formStore'

const formStore = useFormStore()

const router = useRouter()
</script>

<template>
   <div class="form__container">
      <div class="form__img">
         <img src="./icons/Step_02.svg" alt="img">
      </div>
      <h1 class="form__title">Verifieer dat jij het bent</h1>
      <div class="form__subtitle">
         <p>Nog een klein dingetje voordat je kan beginnen!</p>
         <div>
            We hebben je op <span>{{ formStore.email }}</span> een email gestuurd met daarin 6 cijferige code.
            Vul deze code hieronder in.
         </div>
      </div>
      <form action="#" method="post" class="forms">
         <div class="forms__code">
            <label for="text" class="forms__lable">Verificatiecode:</label>
            <input 
            type="text"
            inputmode="numeric"
            maxlength="6"
            autocomplete="one-time-code" 
            class="forms__input" 
            placeholder="Vul hier je zescijferige code in">
        </div>
      </form>
      <div class="form__button button button-row">
         <button type="button" class="button__registr">
            <span class="button__reg">
               Volgende
               <span class="button__icon">
                  <img src="./icons/Variant.svg" alt="img">
               </span>
            </span>
         </button>
      </div>
      <div class="forms__txt">
         <a href="#">Verzend code opnieuw</a>
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
      width: 100%;
      padding: 16px 0px;
      background-color: var(--color-lime);
      border-radius: var(--border-input);
      transition: background-color 0.3s ease 0s;
      border: none;
      cursor: pointer;
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

</style>