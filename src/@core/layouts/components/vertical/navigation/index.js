// ** React Import
import { useRef, useState } from "react";

// ** MUI Imports
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';

// ** Parts Layout Imports
import PerfectScrollbar from 'react-perfect-scrollbar';
import themeConfig from "src/configs/themeConfig";

// ** Components Imports
import Drawer from "./Drawer";
import VerticalNavItems from "./VerticalNavItems";
import VerticalNavHeader from "./VerticalNavHeader";

// ** Utils Import
import { hexToRGBA } from "src/@core/utils/hex-to-rgba";

const StyledBoxForShadow = styled(Box)(({ theme }) => ({
    top: 60,
    left: -8,
    zIndex: 2,
    opacity: 0,
    position: 'absolute',
    pointerEvents: 'none',
    width: 'calc(100% + 15px)',
    height: theme.mixins.toolbar.minHeight,
    transition: 'opacity .15s ease-in-out',
    '&.scrolled': {
        opacity: 1
    }
}))

const Navigation = props => {
    const { hidden, settings, afterNavMenuContent, beforeNavMenuContent, navMenuContent: userNavMenuContent } = props

    const [navHover, setNavHover] = useState(false)
    const [groupActive, setGroupActive] = useState([])
    const [currentActiveGroup, setCurrentActiveGroup] = useState([])

    const shadowRef = useRef(null)
    const theme = useTheme()
    const { mode } = settings

    const { afterVerticalNavMenuContentPosition, beforeVerticalNavMenuContentPosition } = themeConfig

    const handleInfiniteScroll = ref => {
        if (ref) {
            ref._getBoundingClientRect = ref.getBoundingClientRect
            ref.getBoundingClientRect = () => {
                const original = ref._getBoundingClientRect()
        
                return { ...original, height: Math.floor(original.height) }
            }
        }
    }

    const scrollMenu = container => {
        if (beforeVerticalNavMenuContentPosition === 'static' || !beforeNavMenuContent) {
            container = hidden ? container.target : container
            if (shadowRef && container.scrollTop > 0) {
                if (!shadowRef.current.classList.contains('scrolled')) {
                shadowRef.current.classList.add('scrolled')
                }
            } else {
                shadowRef.current.classList.remove('scrolled')
            }
        }
    }

    const shadowBgColor = () => {
        if (mode === 'light') {
            return `linear-gradient(${theme.palette.customColors.lightBg} 5%,${hexToRGBA(
                theme.palette.customColors.lightBg,
                0.85
            )} 30%,${hexToRGBA(theme.palette.customColors.lightBg, 0.5)} 65%,${hexToRGBA(
                theme.palette.customColors.lightBg,
                0.3
            )} 75%,transparent)`
            } else {
            return `linear-gradient(${theme.palette.customColors.darkBg} 5%,${hexToRGBA(
                theme.palette.customColors.darkBg,
                0.85
            )} 30%,${hexToRGBA(theme.palette.customColors.darkBg, 0.5)} 65%,${hexToRGBA(
                theme.palette.customColors.darkBg,
                0.3
            )} 75%,transparent)`
        }
    }

    const ScrollWrapper = hidden ? Box : PerfectScrollbar

    return(
        <Drawer {...props} navHover={navHover} setNavHover={setNavHover}>
            <VerticalNavHeader {...props} navHover={navHover} />
            {beforeNavMenuContent && beforeVerticalNavMenuContentPosition === 'fixed' ? beforeNavMenuContent(props) : null}
            {(beforeVerticalNavMenuContentPosition === 'static' || !beforeNavMenuContent) && (
                <StyledBoxForShadow ref={shadowRef} sx={{ background: shadowBgColor() }} />
            )}
            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <ScrollWrapper
                    {...(hidden
                        ?   {
                                onScroll: container => scrollMenu(container),
                                sx: { height: '100%', overflowY: 'auto', overflowX: 'hidden' }
                            }
                        :   {
                                options: { wheelPropagation: false },
                                onScrollY: container => scrollMenu(container),
                                containerRef: ref => handleInfiniteScroll(ref)
                            }
                        )
                    }
                >
                    {beforeNavMenuContent && beforeVerticalNavMenuContentPosition === 'static'
                        ? beforeNavMenuContent(props)
                        : null
                    }
                    {userNavMenuContent ? (
                        userNavMenuContent(props)
                    ) : (
                        <List className='nav-items' sx={{ pt: 0, '& > :first-child': { mt: '0' } }}>
                            <VerticalNavItems
                                navHover={navHover}
                                groupActive={groupActive}
                                setGroupActive={setGroupActive}
                                currentActiveGroup={currentActiveGroup}
                                setCurrentActiveGroup={setCurrentActiveGroup}
                                {...props}
                            />
                        </List>
                    )}
                    {afterNavMenuContent && afterVerticalNavMenuContentPosition === 'static' ? afterNavMenuContent(props) : null}
                </ScrollWrapper>
            </Box>
            {afterNavMenuContent && afterVerticalNavMenuContentPosition === 'fixed' ? afterNavMenuContent(props) : null}
        </Drawer>        
    )
}

export default Navigation
