// ** React Import
import { useContext } from 'react'

// ** Context Auth Import
import { AuthContext } from 'src/context/AuthContext'

export const useAuth = () => useContext(AuthContext)