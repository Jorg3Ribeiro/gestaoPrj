// ** React Import
import { useContext } from 'react'

// ** Context Import
import { SettingsContext } from 'src/@core/context/settingsContext'

export const useSettings = () => useContext(SettingsContext)
