// ** React Imports
import { useContext } from 'react'

// ** Components Import
import { AbilityContext } from './can'

const CanViewNavLink = props => {
    const { children, navLink } = props

    const ability = useContext(AbilityContext)

    return ability && ability.can(navLink?.action, navLink?.subject) ? <>{children}</> : null
}

export default CanViewNavLink
