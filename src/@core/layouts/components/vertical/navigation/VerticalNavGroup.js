// ** React Import
import { useEffect, Fragment } from 'react';

// ** Next Import
import { useRouter } from 'next/router';

// ** MUI Imports
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import { styled, useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';

// ** CLSX Import
import clsx from 'clsx'

// ** Icon Import
import Icon from 'src/@core/components/icon';

// ** ThemeConfig Import
import themeConfig from 'src/configs/themeConfig';

// ** Utils Import
import { hasActiveChild, removeChildren } from 'src/@core/utils/handleURLQueries';

// ** Components Imports
import VerticalNavItems from './VerticalNavItems';
import UserIcon from 'src/Layout/components/UserIcon';
import Translations from 'src/Layout/components/Translation';
import CanViewNavGroup from 'src/Layout/components/acl/CanViewNavGroup';

const MenuItemTextWrapper = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    transition: 'opacity .25s ease-in-out',
    ...(themeConfig.menuTextTruncate && { overflow: 'hidden' })
}))

const VerticalNavGroup = props => {
    const {
        item,
        parent,
        settings,
        navHover,
        navVisible,
        isSubToSub,
        groupActive,
        setGroupActive,
        collapsedNavWidth,
        currentActiveGroup,
        setCurrentActiveGroup,
        navigationBorderWidth
    } = props

    const theme = useTheme()
    const router = useRouter()
    const currentURL = router.asPath
    const { direction, mode, navCollapsed, verticalNavToggleType } = settings

    const toggleActiveGroup = (item, parent) => {
        let openGroup = groupActive
    
        // ** Se o grupo já estiver aberto e clicado, feche o grupo
        if (openGroup.includes(item.title)) {
            openGroup.splice(openGroup.indexOf(item.title), 1)
    
            // Se o grupo clicado tiver filhos de grupo abertos, remova também esses filhos para fechar esses grupos
            if (item.children) {
                removeChildren(item.children, openGroup, currentActiveGroup)
            }
        } else if (parent) {
            // ** Se o Grupo clicado for filho de um grupo aberto, primeiro remova todos os grupos abertos sob esse pai
            if (parent.children) {
                removeChildren(parent.children, openGroup, currentActiveGroup)
            }
    
            // ** Depois de remover todos os grupos abertos sob esse pai, adicione o grupo clicado à matriz de grupos abertos
            if (!openGroup.includes(item.title)) {
                openGroup.push(item.title)
            }
        } else {
            // ** Se clicado em outro grupo que não está ativo ou aberto, crie o array openGroup do zero
            // ** Array de grupo aberto vazio
            openGroup = []
    
            // ** push grupo ativo atual para matriz de grupo aberto
            if (currentActiveGroup.every(elem => groupActive.includes(elem))) {
                openGroup.push(...currentActiveGroup)
            }
    
            // ** Empurre o item do grupo clicado atual para a matriz Open Group
            if (!openGroup.includes(item.title)) {
                openGroup.push(item.title)
            }
        }
        setGroupActive([...openGroup])
    }

    const handleGroupClick = () => {
        const openGroup = groupActive
        if (verticalNavToggleType === 'collapse') {
            if (openGroup.includes(item.title)) {
                openGroup.splice(openGroup.indexOf(item.title), 1)
            } else {
                openGroup.push(item.title)
            }
            setGroupActive([...openGroup])
        } else {
            toggleActiveGroup(item, parent)
        }
    }

    useEffect(() => {
        if (hasActiveChild(item, currentURL)) {
            if (!groupActive.includes(item.title)) groupActive.push(item.title)
        } else {
            const index = groupActive.indexOf(item.title)
            if (index > -1) groupActive.splice(index, 1)
        }
        setGroupActive([...groupActive])
        setCurrentActiveGroup([...groupActive])
    
        if (navCollapsed && !navHover) {
            setGroupActive([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.asPath])

    useEffect(() => {
        if (navCollapsed && !navHover) {
            setGroupActive([])
        }
        if ((navCollapsed && navHover) || (groupActive.length === 0 && !navCollapsed)) {
            setGroupActive([...currentActiveGroup])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navCollapsed, navHover])

    useEffect(() => {
        if (groupActive.length === 0 && !navCollapsed) {
            setGroupActive([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navHover])

    const icon = parent && !item.icon ? themeConfig.navSubItemIcon : item.icon
    const menuGroupCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 }

    const conditionalIconColor = () => {
        if (mode === 'semi-dark') {
            return {
                color: `rgba(${theme.palette.customColors.dark}, ${parent && item.children ? 0.6 : 0.87})`
            }
        } else {
            return {
                color: parent && item.children ? 'text.secondary' : 'text.primary'
            }
        }
    }

    const conditionalArrowIconColor = () => {
        if (mode === 'semi-dark') {
            return {
                color: `rgba(${theme.palette.customColors.dark}, 0.6)`
            }
        } else return {}
    }

    const conditionalBgColor = () => {
        if (mode === 'semi-dark') {
            return {
                '&:hover': {
                    backgroundColor: `rgba(${theme.palette.customColors.dark}, 0.05)`
                },
                '&.Mui-selected': {
                    backgroundColor: `rgba(${theme.palette.customColors.dark}, 0.08)`,
                '&:hover': {
                    backgroundColor: `rgba(${theme.palette.customColors.dark}, 0.08)`
                }
                }
            }
        } else {
            return {
                '&.Mui-selected': {
                    backgroundColor: 'action.selected',
                    '&:hover': {
                        backgroundColor: 'action.selected'
                    }
                }
            }
        }
    }

    return(
        <CanViewNavGroup navGroup={item}>
            <Fragment>
                <ListItem
                    disablePadding
                    className='nav-group'
                    onClick={handleGroupClick}
                    sx={{
                        mt: 1.5,
                        flexDirection: 'column',
                        transition: 'padding .25s ease-in-out',
                        px:
                            parent && item.children
                            ? '0 !important'
                            : `${theme.spacing(navCollapsed && !navHover ? 2 : 3)} !important`
                    }}
                >
                    <ListItemButton
                        className={clsx({
                            'Mui-selected': groupActive.includes(item.title) || currentActiveGroup.includes(item.title)
                        })}
                        sx={{
                            py: 2.25,
                            width: '100%',
                            borderRadius: '8px',
                            ...conditionalBgColor(),
                            transition: 'padding-left .25s ease-in-out',
                            pr: navCollapsed && !navHover ? (collapsedNavWidth - navigationBorderWidth - 24 - 16) / 8 : 3,
                            pl: navCollapsed && !navHover ? (collapsedNavWidth - navigationBorderWidth - 24 - 16) / 8 : 4,
                            '&.Mui-selected.Mui-focusVisible': {
                                backgroundColor: 'action.focus',
                                '&:hover': {
                                    backgroundColor: 'action.focus'
                                }
                            }
                        }}
                    >
                        {isSubToSub ? null : (
                            <ListItemIcon
                                sx={{
                                ...conditionalIconColor(),
                                transition: 'margin .25s ease-in-out',
                                ...(parent && navCollapsed && !navHover ? {} : { mr: 2 }),
                                ...(navCollapsed && !navHover ? { mr: 0 } : {}),
                                ...(parent && item.children ? { ml: 2, mr: 4 } : {})
                                }}
                            >
                                <UserIcon icon={icon} {...(parent && { fontSize: '0.5rem' })} />
                            </ListItemIcon>
                        )}
                        <MenuItemTextWrapper sx={{ ...menuGroupCollapsedStyles, ...(isSubToSub ? { ml: 8 } : {}) }}>
                            <Typography
                                {...((themeConfig.menuTextTruncate || (!themeConfig.menuTextTruncate && navCollapsed && !navHover)) && {
                                noWrap: true
                                })}
                            >
                                <Translations text={item.title} />
                            </Typography>
                            <Box
                                className='menu-item-meta'
                                sx={{
                                ml: 1.5,
                                display: 'flex',
                                alignItems: 'center',
                                '& svg': {
                                    ...conditionalArrowIconColor(),
                                    transition: 'transform .25s ease-in-out',
                                    ...(groupActive.includes(item.title) && {
                                    transform: direction === 'ltr' ? 'rotate(90deg)' : 'rotate(-90deg)'
                                    })
                                }
                                }}
                            >
                                {item.badgeContent ? (
                                    <Chip
                                        size='small'
                                        label={item.badgeContent}
                                        color={item.badgeColor || 'primary'}
                                        sx={{ mr: 0.75, '& .MuiChip-label': { px: 2.5, lineHeight: 1.385, textTransform: 'capitalize' } }}
                                    />
                                ) : null}
                                <Icon icon={direction === 'ltr' ? 'mdi:chevron-right' : 'mdi:chevron-left'} />
                            </Box>
                        </MenuItemTextWrapper>
                    </ListItemButton>
                    <Collapse
                        component='ul'
                        onClick={e => e.stopPropagation()}
                        in={groupActive.includes(item.title)}
                        sx={{
                            pl: 0,
                            width: '100%',
                            ...menuGroupCollapsedStyles,
                            transition: 'all 0.25s ease-in-out'
                        }}
                    >
                        <VerticalNavItems
                            {...props}
                            parent={item}
                            navVisible={navVisible}
                            verticalNavItems={item.children}
                            isSubToSub={parent && item.children ? item : undefined}
                        />
                    </Collapse>
                </ListItem>
            </Fragment>
        </CanViewNavGroup>
    )
}

export default VerticalNavGroup
