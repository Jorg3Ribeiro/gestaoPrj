// ** MUI Imports
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

const FooterContent = () => {
    const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

    return(
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ mr: 2 }}>
                {`© ${new Date().getFullYear()}, Feito com `}
                <Box component='span' sx={{ color: 'error.main' }}>
                    ❤️
                </Box>
                {` por `}
                <Link target='_blank' href='#'>
                    Empresa Minha
                </Link>
            </Typography>
            {hidden ? null : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
                    <Link target='_blank' href='#'>
                        Suporte
                    </Link>
                </Box>
            )}
        </Box>
    )
}

export default FooterContent
