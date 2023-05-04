// ** React Import
import { useState } from 'react';

// ** Next Import
import Link from 'next/link';

// ** MUI Components
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import useMediaQuery from '@mui/material/useMediaQuery';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled, useTheme } from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import MuiFormControlLabel from '@mui/material/FormControlLabel';

// ** Icon Import
import Icon from 'src/@core/components/icon';

// ** Yup Imports
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// ** Hooks Imports
import { useAuth } from 'src/hooks/userAuth';
import { useSettings } from 'src/@core/hooks/useSettings';

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig';

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout';

// ** Footer Import
import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations';

const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(20),
    paddingRight: '0 !important',
    [theme.breakpoints.down('lg')]: {
        padding: theme.spacing(10)
    }
}))

const LoginIllustration = styled('img')(({ theme }) => ({
    maxWidth: '68rem',
    [theme.breakpoints.down('xl')]: {
        maxWidth: '48rem'
    },
    [theme.breakpoints.down('lg')]: {
        maxWidth: '30rem'
    }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.up('md')]: {
        maxWidth: 400
    },
    [theme.breakpoints.up('lg')]: {
        maxWidth: 450
    }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.down('md')]: {
        maxWidth: 400
    }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    letterSpacing: '0.18px',
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
    '& .MuiFormControlLabel-label': {
        fontSize: '0.875rem',
        color: theme.palette.text.secondary
    }
}))

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required()
})

const LoginPage = () => {
    const [rememberMe, setRememberMe] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    const auth = useAuth()
    const theme = useTheme()
    const { settings } = useSettings()
    const hidden = useMediaQuery(theme.breakpoints.down('md'))
    const { skin } = settings

    const {
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const onSubmit = data => {
        const { email, password } = data
        auth.login({ email, password, rememberMe }, () => {
            setError('email', {
                type: 'manual',
                message: 'E-mail ou senha é inválido'
            })
        })
    }

    const imageSource = skin === 'bordered' ? 'gestaoProjeto-bordered' : 'gestaoProjeto'

    return (
        <Box className='content-right'>
            {!hidden ? (
                <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                    <LoginIllustrationWrapper>
                        <LoginIllustration
                        alt='login-illustration'
                        src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
                        />
                    </LoginIllustrationWrapper>
                    <FooterIllustrations />
                </Box>
            ) : null}
            <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
                <Box
                    sx={{
                        p: 7,
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'background.paper'
                    }}
                >
                    <BoxWrapper>
                        <Box
                            sx={{
                                top: 30,
                                left: 40,
                                display: 'flex',
                                position: 'absolute',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <img alt='error-illustration' src='/images/logo.png' style={{ width: 44, height: 47 }} />
                            <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
                                {themeConfig.templateName}
                            </Typography>
                        </Box>
                        <Box sx={{ mb: 6 }}>
                            <TypographyStyled variant='h5'>{`Bem-vindo ao ${themeConfig.templateName}! 👋🏻`}</TypographyStyled>
                            <Typography variant='body2'>Por favor, entre na sua conta e comece a aventura</Typography>
                        </Box>
                        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='email'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                        autoFocus
                                        label='Email'
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        error={Boolean(errors.email)}
                                        placeholder='johndoe@gmail.com'
                                        />
                                    )}
                                />
                                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel htmlFor='authLoginPassword' error={Boolean(errors.password)}>
                                    Password
                                </InputLabel>
                                <Controller
                                    name='password'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <OutlinedInput
                                            value={value}
                                            onBlur={onBlur}
                                            label='Password'
                                            onChange={onChange}
                                            id='authLoginPassword'
                                            error={Boolean(errors.password)}
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                <IconButton
                                                    edge='end'
                                                    onMouseDown={e => e.preventDefault()}
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                                                </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    )}
                                />
                                {errors.password && (
                                    <FormHelperText sx={{ color: 'error.main' }} id=''>
                                        {errors.password.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <Box
                                sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
                            >
                                <FormControlLabel
                                    label='Lembre de mim'
                                    control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                                />
                                <Typography
                                    variant='body2'
                                    component={Link}
                                    href='/forgot-password'
                                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                                >
                                    Esqueceu sua senha?
                                </Typography>
                            </Box>
                            <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                                Entrar
                            </Button>
                            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <Typography sx={{ mr: 2, color: 'text.secondary' }}>Novo em nossa plataforma?</Typography>
                                <Typography href='/register' component={Link} sx={{ color: 'primary.main', textDecoration: 'none' }}>
                                    Crie a sua conta aqui
                                </Typography>
                            </Box>
                            <Divider
                                sx={{
                                    '& .MuiDivider-wrapper': { px: 4 },
                                    mt: theme => `${theme.spacing(5)} !important`,
                                    mb: theme => `${theme.spacing(7.5)} !important`
                                }}
                            >
                                ou
                            </Divider>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={e => e.preventDefault()}>
                                    <Icon icon='mdi:facebook' />
                                </IconButton>
                                <IconButton href='/' component={Link} sx={{ color: '#1da1f2' }} onClick={e => e.preventDefault()}>
                                    <Icon icon='mdi:twitter' />
                                </IconButton>
                                <IconButton
                                    href='/'
                                    component={Link}
                                    onClick={e => e.preventDefault()}
                                    sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
                                >
                                    <Icon icon='mdi:github' />
                                </IconButton>
                                <IconButton href='/' component={Link} sx={{ color: '#db4437' }} onClick={e => e.preventDefault()}>
                                    <Icon icon='mdi:google' />
                                </IconButton>
                            </Box>
                        </form>
                    </BoxWrapper>
                </Box>
            </RightWrapper>
        </Box>
    )
}

LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
