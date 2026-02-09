<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isMobile = ref(false)
const isInfoOpen = ref(false)

let mediaQuery

function handleMediaChange(e) {
  isMobile.value = e.matches

  if (e.matches) {
    isInfoOpen.value = false
  }
}

onMounted(() => {
  mediaQuery = window.matchMedia('(max-width: 991.98px)')
  handleMediaChange(mediaQuery) 
  mediaQuery.addEventListener('change', handleMediaChange)
})

onBeforeUnmount(() => {
  mediaQuery.removeEventListener('change', handleMediaChange)
})
</script>

<template>
   <Transition name="slide-up">
      <div
       v-if="!isMobile || isInfoOpen" 
       class="info__container info--mobile">
		   <h1 class="info__title">{{ t('info.title') }}</h1>
		   <div class="info__img">
			   <img src="./icons/Frame 2125.svg" alt="img">
		   </div>
		   <ul class="info__list">
			   <li>{{ t('info.werk') }} <span>{{ t('info.werk-span') }}</span>{{ t('info.apparat') }}</li>
			   <li>{{ t('info.word') }} <span>{{ t('info.word-span') }}</span> {{ t('info.cyber') }}</li>
			   <li>{{ t('info.onze') }} <span>{{ t('info.onze-span') }}</span> {{ t('info.help') }}</li>
		   </ul>
        <button
          v-if="isMobile"
          class="info-close"
          @click="isInfoOpen = false">
          ✕
        </button>
	   </div>
   </Transition>
   <button
     v-if="isMobile && !isInfoOpen"
     class="info-toggle"
     @click="isInfoOpen = true">
     {{ t('info.info-toggle') }}
     <svg class="toggle-up" width="24" height="24" viewBox="0 0 24 24" fill="none">
       <path d="M6 14l6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
     </svg>
   </button>
</template>

<style lang="scss" scoped>
    .info {

   &__container {
      display: flex;
      flex-direction: column;
      gap: 50px;
      padding: 0px 10px;
      gap: calc(10px + (50 - 10) * (100vw - 320px) / (1280 - 320));
   }

   &__title {
      font-weight: 400;
      font-size: 26px;
      line-height: 1.2;
      text-align: center;
      color: var(--color-fff);
      font-size: calc(20px + (26 - 20) * ((100vw - 360px) / (1280 - 360)));
   }

   &__img {
      display: flex;
      justify-content: center;
   }

   &__list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      font-weight: 400;
      font-size: 20px;
      line-height: 1.5;
      color: var(--color-fff);
      font-size: calc(16px + (20 - 16) * ((100vw - 768px) / (1280 - 768)));
   }
}

.info__img img {
   max-width: 100%;
   object-fit: cover;
}

.info__list span {
   color: var(--color-lime);
}

.info__list li {
   align-self: flex-start;
   background: url('./icons/check.svg') 0 7px no-repeat;
   padding: 0px 0px 0px 27px;
}

.info--mobile {
  @media (max-width: 991.98px) {
    position: fixed;
    inset: 0;
    background: var(--color-green);
    z-index: 100;
    overflow-y: auto;
    padding-top: 100px;
    align-items: center;
  }
}

.info-toggle {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 18px;
  font-weight: 600;
  background: #BDCCBB;
  color: var(--color-green);
  border: none;
  z-index: 90;
}

.toggle-up {
  position: absolute;
  bottom: 17px;
  right: 15px;
  width: 25px;
  color: var(--color-green);
}

.info-close {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: var(--color-lime);
  color: black;
  font-size: 16px;
  font-weight: 900;
  z-index: 110;
}

.slide-up-enter-from {
  transform: translateY(100%);
}
.slide-up-enter-to {
  transform: translateY(0);
}
.slide-up-leave-to {
  transform: translateY(100%);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

</style>