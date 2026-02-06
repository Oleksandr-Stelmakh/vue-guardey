import { createI18n } from 'vue-i18n'
import uk from './locales/uk.json'
import en from './locales/en.json'
import nl from './locales/nl.json'
import de from './locales/de.json'
import fr from './locales/fr.json'
import pl from './locales/pl.json'
import ua from './locales/ua.json'

const savedLocale = localStorage.getItem('locale') || 'en'

export const i18n = createI18n({
   legacy: false,
   globalInjection: true,
   locale: savedLocale,
   fallbackLocale: 'en',
   messages: {
      uk,
      en,
      nl,
      de,
      fr,
      pl,
      ua
   }
})

