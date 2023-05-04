// ** Next Imports
import Head from "next/head";
import { Router } from "next/router";

// ** Service Imports
import { service } from "src/service";
import { Provider } from "react-redux";

// ** Loader Imports
import NProgress from "nprogress";

// ** Emotion Imports
import { CacheProvider } from "@emotion/react";

// ** Config Imports
import 'src/configs/i18n';
import { defaultACLObj } from "src/configs/acl";
import themeConfig from "src/configs/themeConfig";

// ** Fake-DB Imports
import 'src/@fake-db';

// ** Message Notification Imports
import { Toaster } from "react-hot-toast";

// ** Component Imports
import UserLayout from "src/Layout/UserLayout";
import AclGuard from "src/@core/components/auth/AclGuard";
import ThemeComponent from "src/@core/components/theme/ThemeComponent";
import AuthGuard from "src/@core/components/auth/AuthGuard";
import GuestGuard from "src/@core/components/auth/GuestGuard";
import WindowWrapper from "src/@core/components/window-wrapper";

// ** Spinner Components Import
import Spinner from 'src/@core/components/spinner'

// ** Contexts Imports
import { AuthProvider } from "src/context/AuthContext";
import { SettingsConsumer, SettingsProvider } from "src/@core/context/settingsContext";

// ** Styled Components Imports 
import ReactHotToast from "src/@core/components/styles/libs/react-hot-toast";

// ** Util Imports
import { createEmotionCache } from "src/@core/utils/create-emotion-cache";

// ** Prismjs Styles Imports
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style Imports
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'src/iconify-bundle/icons-bundle-react'

// ** Global CSS Styles Import
import '../../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()

// ** Page Loader
if (themeConfig.routingLoader) {
    Router.events.on('routeChangeStart', () => {
        NProgress.start()
    })
    Router.events.on('routeChangeError', () => {
        NProgress.done()
    })
    Router.events.on('routeChangeComplete', () => {
        NProgress.done()
    })
}

const Guard = ({ children, authGuard, guestGuard }) => {
    if (guestGuard) {
        return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
    } else if (!guestGuard && !authGuard) {
        return <>{children}</>
    } else {
        return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
    }
}

const App = props => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

    const contentHeightFixed = Component.contentHeightFixed ?? false

    const getLayout =
        Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)
    const setConfig = Component.setConfig ?? undefined
    const authGuard = Component.authGuard ?? true
    const guestGuard = Component.guestGuard ?? false
    const aclAbilities = Component.acl ?? defaultACLObj

    return (
        <Provider store={service}>
            <CacheProvider value={emotionCache}>
                <Head>
                    <title>{`${themeConfig.templateName} - Gestao de Projetos`}</title>
                    <meta
                        name='description'
                        content={`${themeConfig.templateName} – Gerir todso os projetos da sua empresa`}
                    />
                    <meta name='keywords' content='Gestao de Projeto, Gestao, Admin, Projetos, Empresa' />
                    <meta name='viewport' content='initial-scale=1, width=device-width' />
                </Head>
        
                <AuthProvider>
                    <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
                        <SettingsConsumer>
                            {({ settings }) => {
                                return (
                                <ThemeComponent settings={settings}>
                                    <WindowWrapper>
                                        <Guard authGuard={authGuard} guestGuard={guestGuard}>
                                            <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard}>
                                                {getLayout(<Component {...pageProps} />)}
                                            </AclGuard>
                                        </Guard>
                                    </WindowWrapper>
                                    <ReactHotToast>
                                        <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                                    </ReactHotToast>
                                </ThemeComponent>
                                )
                            }}
                        </SettingsConsumer>
                    </SettingsProvider>
                </AuthProvider>
            </CacheProvider>
        </Provider>
    )
}

export default App
