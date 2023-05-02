// ** MUI Imports
import useMediaQuery from "@mui/material/useMediaQuery";

// ** Layout Imports
import Layout from "src/@core/layouts/Layout";

// ** Navigation Imports
import VerticalNavItems from "src/navigation/vertical";
import HorizontalNavItems from "src/navigation/horizontal";

// ** Components Impots
import VerticalAppBarContent from "./components/vertical/AppBarContent";
import HorizontalAppBarContent from "./components/horizontal/AppBarContent";

// ** Hook Settings Import
import { useSettings } from "src/@core/hooks/useSettings";

const UserLayout = ({ children, contentHeightFixed }) => {
    const { settings, saveSettings } = useSettings()

    const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
    if (hidden && settings.layout === 'horizontal') {
        settings.layout = 'vertical'
    }

    return (
        <Layout
            hidden={hidden}
            settings={settings}
            saveSettings={saveSettings}
            contentHeightFixed={contentHeightFixed}
            verticalLayoutProps={{
                navMenu: {
                    navItems: VerticalNavItems()
                },
                appBar: {
                    content: props => (
                        <VerticalAppBarContent
                            hidden={hidden}
                            settings={settings}
                            saveSettings={saveSettings}
                            toggleNavVisibility={props.toggleNavVisibility}
                        />
                    )
                }
            }}
            {...(settings.layout === 'horizontal' && {
                horizontalLayoutProps: {
                    navMenu: {
                        navItems: HorizontalNavItems()
                    },
                    appBar: {
                        content: () => <HorizontalAppBarContent hidden={hidden} settings={settings} saveSettings={saveSettings} />
                    }
                }
            })}
        >
            {children}
        </Layout>
    )
}

export default UserLayout
