// ** Casl Imports
import { AbilityBuilder, Ability } from "@casl/ability";

export const AppAbility = Ability

/**
 * Defina suas próprias regras de habilidade de acordo com os requisitos do aplicativo.
 * Acabamos de mostrar as regras de administrador e cliente para fins de demonstração, onde
 * admin pode gerenciar tudo e o cliente pode apenas visitar a página ACL
 */

const defineRulesFor = (role, subject) => {
    const { can, rules } = new AbilityBuilder(AppAbility)
    if(role === 'admin'){
        can('manage', 'all')
    }else if(role === 'client'){
        can(['read'], 'acl-page')
    }else {
        can(['read', 'create', 'update', 'delete'], subject)
    }

    return rules
}

export const buildAbilityFor = (role, subject) => {
    return new AppAbility(defineRulesFor(role, subject), {
        detectSubjectType: object => object.type
    })
}

export const defaultACLObj ={
    action: 'manage',
    subject: 'all'
}

export default defineRulesFor