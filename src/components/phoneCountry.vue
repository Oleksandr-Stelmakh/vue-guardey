<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isCountryOpen = ref(false)

const countries = [
  { name: 'NL', code: '+31', flag: '/flags/nl.svg' },
  { name: 'UK',code: '+44', flag: '/flags/gb.svg' },
  { name: 'USA', code: '+1', flag: '/flags/us.svg' },
  { name: 'Germany', code: '+49', flag: '/flags/de.svg' },
  { name: 'France', code: '+33', flag: '/flags/fr.svg' },
  { name: 'Poland', code: '+48', flag: '/flags/pl.svg' },
  { name: 'Ukraine', code: '+380', flag: '/flags/ua.svg' },
]

const selectedCountry = ref(
  countries.find(country => country.code === '+31') || countries[0]
)


function toggleCountry() {
  isCountryOpen.value = !isCountryOpen.value
}

function selectCountry(country) {
  selectedCountry.value = country
  isCountryOpen.value = false
}

function handleClickOutside(e) {
  if (!e.target.closest('.phone')) {
    isCountryOpen.value = false
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

<div class="phone" title="Заполните это поле">
  <div class="phone__wrapper">
    <button
      type="button"
      class="phone__country"
      @click.stop="toggleCountry">
    
      <img
        class="phone__flag"
        :src="selectedCountry.flag"
        alt="flag"
      />

      <span
        class="phone__arrow"
        :class="{ open: isCountryOpen }"
      >
        ▼
      </span>
    </button>
  </div>

  <div v-if="isCountryOpen" class="phone__dropdown">
    <div
      v-for="country in countries"
      :key="country.code"
      class="phone__option"
      @click="selectCountry(country)"
    >
      
      <img
       class="phone__flag"
       :src="country.flag"
       alt="flag"
      />
      <span class="phone__code">{{ country.code }}</span>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>

  .phone {
  position: absolute;
  top: 69%;
  left: 2px;
  transform: translateY(-50%);
  width: 100%;
  z-index: 50;
  pointer-events: none;

  &__wrapper {
    display: flex;
    align-items: center;
    border-radius: 50px 0px 0px 50px;
    height: 55px;
    width: 10%;
  }

  &__country {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 100%;
    padding: 0px 3px 0px 7px;
    background: transparent;
    border: none;
    cursor: pointer;
    pointer-events: auto;
  }

  &__flag {
    width: 18px;
    height: 12px;
    object-fit: cover;
    border-radius: 2px;
  }

  &__arrow {
    font-size: 10px;
    transition: transform 0.25s ease;

    &.open {
      transform: rotate(180deg);
    }
  }

  &__input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 14px;
    line-height: 160%;
    padding-left: 10px;
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + 3px);
    left: 0;
    width: 100%;
    background: var(--color-fff);
    max-height: 240px;
    overflow-y: auto;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    pointer-events: auto;
    z-index: 30;
  }

  &__option {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    font-size: 14px;
    cursor: pointer;
    pointer-events: auto;

    &:hover {
      background: #f4f4f4;
    }
  }

  &__name {
    flex: 1;
  }

  &__code {
    opacity: 0.6;
  }
}

.phone__wrapper:hover {
   background-color: rgb(240, 240, 240);
}

</style>