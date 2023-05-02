// ** React Import
import { useState } from 'react';

// ** Next Import
import { useRouter } from 'next/router';

// ** Context Import
import { AbilityContext } from 'src/Layout/components/acl/can';

// ** Components Imports
import NotAuthorized from 'src/pages/401'
import BlankLayout from 'src/@core/layouts/BlankLayout';

// ** Hook Auth
import { useAuth } from 'src/hooks/userAuth';

const AclGuard = props => {
    const { aclAbilities, children, guestGuard } = props
    const [ability, setAbility] = useState(undefined)

    const auth = useAuth()
    const router = useRouter()

    if (guestGuard || router.route === '/404' || router.route === '/500' || router.route === '/') {
        return <>{children}</>
    }

    if (auth.user && auth.user.role && !ability) {
        setAbility(buildAbilityFor(auth.user.role, aclAbilities.subject))
    }

    if (ability && ability.can(aclAbilities.action, aclAbilities.subject)) {
        return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    }

    return (
        <BlankLayout>
            <NotAuthorized />
        </BlankLayout>
    )
}

export default AclGuard