const navigation = () => {
    return [
        {
            title: 'Dashboards',
            icon: 'mdi:home-outline',
            badgeContent: 'new',
            badgeColor: 'error',
            children: [
                {
                    title: 'CRM',
                    path: '/dashboards/crm'
                },
                {
                    title: 'Analytics',
                    path: '/dashboards/analytics'
                },
                {
                    title: 'eCommerce',
                    path: '/dashboards/ecommerce'
                }
            ]
        },
        {
            sectionTitle: 'Apps & Pages'
        },
        {
            title: 'Email',
            icon: 'mdi:email-outline',
            path: '/apps/email'
        },
        {
            title: 'Chat',
            icon: 'mdi:message-outline',
            path: '/apps/chat'
        },
        {
            title: 'Calendar',
            icon: 'mdi:calendar-blank-outline',
            path: '/apps/calendar'
        }
    ]
}

export default navigation
