// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const TableHeader = props => {
    const { handleFilter, toggle, value } = props

    return (
        <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ mr: 4, mb: 2 }}>
                <TextField
                    size='small'
                    value={value}
                    sx={{ mr: 6, mb: 2 }}
                    placeholder='Procurar Projeto'
                    onChange={e => handleFilter(e.target.value)}
                />
            </Box>
            <Button sx={{ mb: 2 }} onClick={toggle} variant='contained'>
                Criar Projeto
            </Button>
        </Box>
    )
}

export default TableHeader
