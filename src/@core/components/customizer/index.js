// ** React Import
import { useState } from 'react';

// ** ScrollBar Import
import PerfectScrollbar from 'react-perfect-scrollbar';

// ** MUI Imports
import Radio from '@mui/material/Radio';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiDrawer from '@mui/material/Drawer';

// ** Icon Imports
import Icon from '../icon';

// ** Hook Imports
import { useSettings } from '../../hooks/useSettings';

const Toggler = styled(Box)(({ theme }) => ({
  right: 0,
  top: '50%',
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  zIndex: theme.zIndex.modal,
  padding: theme.spacing(2.5),
  transform: 'translateY(-50%)',
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  borderTopLeftRadius: theme.shape.borderRadius,
  borderBottomLeftRadius: theme.shape.borderRadius
}))

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: 400,
  zIndex: theme.zIndex.modal,
  '& .MuiFormControlLabel-root': {
    marginRight: '0.6875rem'
  },
  '& .MuiDrawer-paper': {
    border: 0,
    width: 400,
    zIndex: theme.zIndex.modal,
    boxShadow: theme.shadows[9]
  }
}))

const CustomizerSpacing = styled('div')(({ theme }) => ({
  padding: theme.spacing(5, 6)
}))

const ColorBox = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: 8,
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  margin: theme.spacing(0, 1.5),
  color: theme.palette.common.white,
  transition: 'box-shadow .25s ease'
}))

const Customizer = () => {
  const [open, setOpen] = useState(false)
  const { settings, saveSettings } = useSettings()

  const {
    mode,
    skin,
    appBar,
    footer,
    layout,
    navHidden,
    direction,
    appBarBlur,
    themeColor,
    navCollapsed,
    contentWidth,
    verticalNavToggleType
  } = settings

  const handleChange = (field, value) => {
    saveSettings({ ...settings, [field]: value })
  }

  return (
    <div className='customizer'>
      <Toggler className='customizer-toggler' onClick={() => setOpen(true)}>
        <Icon icon='mdi:cog-outline' fontSize={20} />
      </Toggler>
      <Drawer open={open} hideBackdrop anchor='right' variant='persistent'>
        <Box
          className='customizer-header'
          sx={{
            position: 'relative',
            p: theme => theme.spacing(3.5, 5),
            borderBottom: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
            Personalizador de tema
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Personalize e visualize em tempo real</Typography>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              right: 20,
              top: '50%',
              position: 'absolute',
              color: 'text.secondary',
              transform: 'translateY(-50%)'
            }}
          >
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        </Box>
        <PerfectScrollbar options={{ wheelPropagation: false }}>
          <CustomizerSpacing className='customizer-body'>
            <Typography
              component='p'
              variant='caption'
              sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}
            >
              Tematização
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography>Skin</Typography>
              <RadioGroup
                row
                value={skin}
                onChange={e => handleChange('skin', e.target.value)}
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '.875rem', color: 'text.secondary' } }}
              >
                <FormControlLabel value='default' label='Default' control={<Radio />} />
                <FormControlLabel value='bordered' label='Bordado' control={<Radio />} />
              </RadioGroup>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography>Visual</Typography>
              <RadioGroup
                row
                value={mode}
                onChange={e => handleChange('mode', e.target.value)}
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '.875rem', color: 'text.secondary' } }}
              >
                <FormControlLabel value='light' label='Light' control={<Radio />} />
                <FormControlLabel value='dark' label='Dark' control={<Radio />} />
                {layout === 'horizontal' ? null : (
                  <FormControlLabel value='semi-dark' label='Semi Dark' control={<Radio />} />
                )}
              </RadioGroup>
            </Box>

            <div>
              <Typography sx={{ mb: 2.5 }}>Cor primária</Typography>
              <Box sx={{ display: 'flex' }}>
                <ColorBox
                  onClick={() => handleChange('themeColor', 'primary')}
                  sx={{
                    ml: 0,
                    backgroundColor: '#007fff',
                    ...(themeColor === 'primary' ? { boxShadow: 9 } : { '&:hover': { boxShadow: 4 } })
                  }}
                >
                  {themeColor === 'primary' ? <Icon icon='mdi:check' fontSize='1.25rem' /> : null}
                </ColorBox>
                <ColorBox
                  onClick={() => handleChange('themeColor', 'secondary')}
                  sx={{
                    backgroundColor: 'secondary.main',
                    ...(themeColor === 'secondary' ? { boxShadow: 9 } : { '&:hover': { boxShadow: 4 } })
                  }}
                >
                  {themeColor === 'secondary' ? <Icon icon='mdi:check' fontSize='1.25rem' /> : null}
                </ColorBox>
                <ColorBox
                  onClick={() => handleChange('themeColor', 'success')}
                  sx={{
                    backgroundColor: 'success.main',
                    ...(themeColor === 'success' ? { boxShadow: 9 } : { '&:hover': { boxShadow: 4 } })
                  }}
                >
                  {themeColor === 'success' ? <Icon icon='mdi:check' fontSize='1.25rem' /> : null}
                </ColorBox>
                <ColorBox
                  onClick={() => handleChange('themeColor', 'error')}
                  sx={{
                    backgroundColor: 'error.main',
                    ...(themeColor === 'error' ? { boxShadow: 9 } : { '&:hover': { boxShadow: 4 } })
                  }}
                >
                  {themeColor === 'error' ? <Icon icon='mdi:check' fontSize='1.25rem' /> : null}
                </ColorBox>
                <ColorBox
                  onClick={() => handleChange('themeColor', 'warning')}
                  sx={{
                    backgroundColor: 'warning.main',
                    ...(themeColor === 'warning' ? { boxShadow: 9 } : { '&:hover': { boxShadow: 4 } })
                  }}
                >
                  {themeColor === 'warning' ? <Icon icon='mdi:check' fontSize='1.25rem' /> : null}
                </ColorBox>
                <ColorBox
                  onClick={() => handleChange('themeColor', 'info')}
                  sx={{
                    mr: 0,
                    backgroundColor: 'info.main',
                    ...(themeColor === 'info' ? { boxShadow: 9 } : { '&:hover': { boxShadow: 4 } })
                  }}
                >
                  {themeColor === 'info' ? <Icon icon='mdi:check' fontSize='1.25rem' /> : null}
                </ColorBox>
              </Box>
            </div>
          </CustomizerSpacing>

          <Divider sx={{ m: '0 !important' }} />

          <CustomizerSpacing className='customizer-body'>
            <Typography
              component='p'
              variant='caption'
              sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}
            >
              Layout
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography>Largura do conteúdo</Typography>
              <RadioGroup
                row
                value={contentWidth}
                onChange={e => handleChange('contentWidth', e.target.value)}
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '.875rem', color: 'text.secondary' } }}
              >
                <FormControlLabel value='full' label='Completo' control={<Radio />} />
                <FormControlLabel value='boxed' label='Em caixa' control={<Radio />} />
              </RadioGroup>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography>Tipo de AppBar</Typography>
              <RadioGroup
                row
                value={appBar}
                onChange={e => handleChange('appBar', e.target.value)}
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '.875rem', color: 'text.secondary' } }}
              >
                <FormControlLabel value='fixed' label='Fixo' control={<Radio />} />
                <FormControlLabel value='static' label='Estático' control={<Radio />} />
                {layout === 'horizontal' ? null : (
                  <FormControlLabel value='hidden' label='Escondido' control={<Radio />} />
                )}
              </RadioGroup>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography>Tipo de Rodapé</Typography>
              <RadioGroup
                row
                value={footer}
                onChange={e => handleChange('footer', e.target.value)}
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '.875rem', color: 'text.secondary' } }}
              >
                <FormControlLabel value='fixed' label='Fixo' control={<Radio />} />
                <FormControlLabel value='static' label='Estático' control={<Radio />} />
                <FormControlLabel value='hidden' label='Escondido' control={<Radio />} />
              </RadioGroup>
            </Box>

            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography>AppBar Blur</Typography>
              <Switch
                name='appBarBlur'
                checked={appBarBlur}
                onChange={e => handleChange('appBarBlur', e.target.checked)}
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography>RTL</Typography>
              <Switch
                name='direction'
                checked={direction === 'rtl'}
                onChange={e => handleChange('direction', e.target.checked ? 'rtl' : 'ltr')}
              />
            </Box>
          </CustomizerSpacing>

          <Divider sx={{ m: '0 !important' }} />

          <CustomizerSpacing className='customizer-body'>

            {navHidden || layout === 'horizontal' ? null : (
              <Box sx={{ mb: 4 }}>
                <Typography>Alternância de menu</Typography>
                <RadioGroup
                  row
                  value={verticalNavToggleType}
                  onChange={e => handleChange('verticalNavToggleType', e.target.value)}
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: '.875rem', color: 'text.secondary' } }}
                >
                  <FormControlLabel value='accordion' label='Accordion' control={<Radio />} />
                  <FormControlLabel value='collapse' label='Collapse' control={<Radio />} />
                </RadioGroup>
              </Box>
            )}

            {navHidden || layout === 'horizontal' ? null : (
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography>Menu Collapsed</Typography>
                <Switch
                  name='navCollapsed'
                  checked={navCollapsed}
                  onChange={e => handleChange('navCollapsed', e.target.checked)}
                />
              </Box>
            )}

            {layout === 'horizontal' && appBar === 'hidden' ? null : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography>Menu Escondido</Typography>
                <Switch
                  name='navHidden'
                  checked={navHidden}
                  onChange={e => handleChange('navHidden', e.target.checked)}
                />
              </Box>
            )}
          </CustomizerSpacing>
        </PerfectScrollbar>
      </Drawer>
    </div>
  )
}

export default Customizer
