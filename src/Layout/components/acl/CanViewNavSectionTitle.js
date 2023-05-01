// ** React Imports
import { useContext } from 'react'

// ** Components Import
import { AbilityContext } from './can'

const CanViewNavSectionTitle = props => {
    const { children, navTitle } = props

    const ability = useContext(AbilityContext)

    return ability && ability.can(navTitle?.action, navTitle?.subject) ? <>{children}</> : null
}

export default CanViewNavSectionTitle
