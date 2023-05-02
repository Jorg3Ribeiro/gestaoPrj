// ** Icon Import
import Icon from "src/@core/components/icon";

// ** i18Next Import
import { useTranslation } from "react-i18next";

// Component Import
import OptionsMenu from "src/@core/components/option-menu";

const LanguageDropdown = ({ settings, saveSettings }) => {
    const { i18n } = useTranslation()

    const { layout } = settings

    const handleLangItemClick = lang => {
        i18n.changeLanguage(lang)
    }

    return (
        <OptionsMenu
            icon={<Icon icon='mdi:translate' />}
            menuProps={{ sx: { '& .MuiMenu-paper': { mt: 4, minWidth: 130 } } }}
            iconButtonProps={{ color: 'inherit', sx: { ...(layout === 'vertical' ? { mr: 0.75 } : { mx: 0.75 }) } }}
            options={[
                {
                    text: 'English',
                    menuItemProps: {
                        sx: { py: 2 },
                        selected: i18n.language === 'en',
                        onClick: () => {
                            handleLangItemClick('en')
                            saveSettings({ ...settings, direction: 'ltr' })
                        }
                    }
                }
            ]}
        />
    )
}

export default LanguageDropdown
