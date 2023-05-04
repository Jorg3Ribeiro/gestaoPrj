// ** MUI Imports
import { deepmerge } from '@mui/utils'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'

// ** Direction component for LTR or RTL
import Direction from 'src/Layout/components/Direction'

// ** Theme Components Imports
import overrides from './overrides'
import typography from './typography'

// ** Theme Imports
import themeOptions from './ThemeOptions'
import UserThemeOptions from 'src/Layout/UserThemeOption'

// ** Global Styles
import GlobalStyling from './globalStyles'

const ThemeComponent = props => {
  const { settings, children } = props

  // ** ThemeOptions mesclados de Core e User
  const coreThemeConfig = themeOptions(settings)

  // ** Passe ThemeOptions para a função CreateTheme para criar um tema parcial sem substituições de componentes
  let theme = createTheme(coreThemeConfig)

  // ** Substituições de componente de mesclagem profunda de núcleo e usuário
  const mergeComponentOverrides = (theme, settings) =>
    deepmerge({ ...overrides(theme, settings) }, UserThemeOptions()?.components)

  // ** Deep Merge Tipografia do núcleo e do usuário
  const mergeTypography = theme => deepmerge(typography(theme), UserThemeOptions()?.typography)

  // ** Continue a criação do tema e passe substituições de componentes mesclados para a função CreateTheme
  theme = createTheme(theme, {
    components: { ...mergeComponentOverrides(theme, settings) },
    typography: { ...mergeTypography(theme) }
  })

  // ** Definir tamanhos de fonte responsivos como true
  if (themeConfig.responsiveFontSizes) {
    theme = responsiveFontSizes(theme)
  }

  return (
    <ThemeProvider theme={theme}>
      <Direction direction={settings.direction}>
        <CssBaseline />
        <GlobalStyles styles={() => GlobalStyling(theme)} />
        {children}
      </Direction>
    </ThemeProvider>
  )
}

export default ThemeComponent
