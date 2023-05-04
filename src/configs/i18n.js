// ** i18next Imports
import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n

  // Habilita o back-end i18next
  .use(Backend)

  // Ativar detecção automática de idioma
  .use(LanguageDetector)

  // Habilita o módulo de inicialização do Hook
  .use(initReactI18next)
  .init({
    lng: 'pt-br',
    backend: {
      /* caminho do arquivo de tradução */
      loadPath: '/locales/{{lng}}.json'
    },
    fallbackLng: 'pt-br',
    debug: false,
    keySeparator: false,
    react: {
      useSuspense: false
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    }
  })

export default i18n
