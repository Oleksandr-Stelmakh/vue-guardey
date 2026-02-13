<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const countries = [
  { code: 'NL', flag: '/flags/nl.svg', lang: 'nl' },
  { code: 'UK', flag: '/flags/gb.svg', lang: 'uk' },
  { code: 'EN', flag: '/flags/us.svg', lang: 'en' },
  { code: 'DE', flag: '/flags/de.svg', lang: 'de' },
  { code: 'FR', flag: '/flags/fr.svg', lang: 'fr' },
  { code: 'PL', flag: '/flags/pl.svg', lang: 'pl' },
  { code: 'UA', flag: '/flags/ua.svg', lang: 'ua' },
]

const showList = ref(false)
const selectRef = ref(null)

const selected = computed(() => {
  return countries.find(c => c.lang === locale.value) || countries[0]
})


const selectCountry = (country) => {
  locale.value = country.lang 
  localStorage.setItem('locale', country.lang)
  showList.value = false
}

const handleClickOutside = (e) => {
  if (selectRef.value && !selectRef.value.contains(e.target)) {
    showList.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <header class="header">
    <a href="#" class="header__logo">
      <img src="./icons/logo.svg" alt="logo">
    </a>

    <nav class="header__menu">
      <div class="custom-select" ref="selectRef">
        <div class="selected" @click="showList = !showList">
          <img :src="selected.flag" :alt="selected.code" class="flag" />
			    <span>{{ selected.code }}</span>
        </div>

        <ul v-if="showList" class="options">
          <li
            v-for="c in countries"
            :key="c.code"
            class="option"
				    @click.stop="selectCountry(c)" 
            >
            <img :src="c.flag" :alt="c.code" class="flag" />
            <span>{{ c.code }}</span>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 40px;
	min-height: 72px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: #fff;
}

.custom-select {
  position: relative;
  width: 60px;
  height: 40px;
  font-size: 13px;
  font-weight: 600;
  user-select: none;
}

.selected {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--color-border);
  border-radius: var(--border-country);
  padding: 7px 5px;
  cursor: pointer;
  background-color: #fff;
}

.flag {
	position: relative;
  width: 20px;
  height: 16px;
  object-fit: cover;
  margin-right: 8px;
}

.options {
  position: absolute;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  margin-top: 5px;
  z-index: 10;
}

.option {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
}

.option:hover {
  background: #f2f2f2;
}

@media (max-width: 991.98px) {
  .header {
    padding: 0 20px;
	  min-height: 52px;
  }
  }
</style>
