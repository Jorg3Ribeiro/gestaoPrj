// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Components Imports
import Autocomplete from '../AutoComplete'
import ModeToggler from 'src/@core/layouts/components/sharedComponents/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/sharedComponents/UserDropdown'
import LanguageDropdown from 'src/@core/layouts/components/sharedComponents/LanguageDropdown'
import NotificationDropdown from 'src/@core/layouts/components/sharedComponents/NotificationDropdown'
import ShortcutsDropdown from 'src/@core/layouts/components/sharedComponents/ShotcutsDropdown'

const notifications = [
  {
    meta: 'Hoje',
    avatarAlt: 'Flora',
    title: 'Parabéns Flora! 🎉',
    avatarImg: '/images/defaultAvatarWoman.png',
    subtitle: 'Ganhou o distintivo de best-seller mensal'
  },
  {
    meta: 'Ontem',
    avatarColor: 'primary',
    subtitle: '5 horas atrás',
    avatarText: 'Robert Austin',
    title: 'Novo usuário registrado.'
  },
  {
    meta: '11/03/2023',
    avatarAlt: 'mensagem',
    title: 'Nova mensagem recebida 👋🏻',
    avatarImg: '/images/defaultAvatarMan.png',
    subtitle: 'Você tem 10 mensagens não lidas'
  },
  {
    meta: '25/12/2022',
    title: 'Paypal',
    avatarAlt: 'paypal',
    subtitle: 'Pagamento recebido',
    avatarColor: 'primary'
  },
  {
    meta: '19/08/2022',
    avatarAlt: 'ordem',
    title: 'Pedido recebido 📦',
    avatarImg: '/images/defaultAvatarMan.png',
    subtitle: 'Novo pedido recebido de John'
  },
  {
    meta: '27/07/2022',
    avatarAlt: 'chart',
    subtitle: '25 hrs ago',
    avatarImg: '/images/misc/chart.png',
    title: 'Finance report has been generated'
  }
]

const shortcuts = [
  {
    title: 'Calendário',
    url: '#',
    subtitle: 'Compromissos',
    icon: 'mdi:calendar-month-outline'
  },
  {
    title: 'Aplicativo de fatura',
    url: '#',
    subtitle: 'Gerenciar contas',
    icon: 'mdi:receipt-text-outline'
  },
  {
    title: 'Usuários',
    url: '#',
    subtitle: 'Gerenciar usuários',
    icon: 'mdi:account-outline'
  },
  {
    url: '#',
    title: 'Gerenciamento de funções',
    subtitle: 'Permissões',
    icon: 'mdi:shield-check-outline'
  },
  {
    url: '#',
    title: 'Dashboard',
    icon: 'mdi:chart-pie',
    subtitle: 'Painel do usuário'
  },
  {
    title: 'Configurações',
    icon: 'mdi:cog-outline',
    subtitle: 'Configurações de Conta',
    url: '#'
  },
  {
    title: 'Centro de ajuda',
    subtitle: 'FAQs & Artigos',
    icon: 'mdi:help-circle-outline',
    url: '#'
  },
  {
    title: 'Diálogos',
    subtitle: 'Diálogos Úteis',
    icon: 'mdi:window-maximize',
    url: '#'
  }
]

const AppBarContent = props => {
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden && !settings.navHidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon='mdi:menu' />
          </IconButton>
        ) : null}
        <Autocomplete hidden={hidden} settings={settings} />
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <LanguageDropdown settings={settings} saveSettings={saveSettings} />
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <ShortcutsDropdown settings={settings} shortcuts={shortcuts} />
        <NotificationDropdown settings={settings} notifications={notifications} />
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  )
}

export default AppBarContent
