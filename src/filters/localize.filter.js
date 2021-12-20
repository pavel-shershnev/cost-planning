import store from '../store'
import ru from '../locales/ru'
import en from '../locales/en'
const locales = {
  'ru-Ru': ru,
  'en-Us': en
}

export default function localizeFilter (key) {
  const locale = store.getters.info.locale || 'ru-Ru'
  return locales[locale][key]
}
