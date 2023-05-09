// ** React Import
import { useState, forwardRef } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Fade from '@mui/material/Fade';
import DialogContent from '@mui/material/DialogContent';

// ** YUP Imports
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

// ** Icon Import
import Icon from 'src/@core/components/icon';

// ** Hook Imports
import { useSettings } from '@/src/@core/hooks/useSettings';

const showErrors = (field, valueLen, min) => {
    if (valueLen === 0) {
        return `${field} field is required`
    } else if (valueLen > 0 && valueLen < min) {
        return `${field} must be at least ${min} characters`
    } else {
        return ''
    }
}

const schema = yup.object().shape({
    company: yup.string().required(),
    country: yup.string().required(),
    email: yup.string().email().required(),
    contact: yup
        .number()
        .typeError('Contact Number field is required')
        .min(10, obj => showErrors('Contact Number', obj.value.length, obj.min))
        .required(),
    fullName: yup
        .string()
        .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
        .required(),
    username: yup
        .string()
        .min(3, obj => showErrors('Username', obj.value.length, obj.min))
        .required()
})

const Transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
})

const TabLabel = props => {
    const { icon, title, subtitle, active } = props

    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                    variant='rounded'
                    sx={{
                        mr: 3.5,
                        ...(active ? { color: 'common.white', backgroundColor: 'primary.main' } : { color: 'text.primary' })
                    }}
                >
                    {icon}
                </Avatar>
                <Box sx={{ textAlign: 'left' }}>
                    <Typography variant='body2'>{title}</Typography>
                    <Typography variant='caption' sx={{ color: 'text.disabled', textTransform: 'none' }}>
                        {subtitle}
                    </Typography>
                </Box>
            </Box>
        </div>
    )
}
const tabsArr = ['detailsTab', 'frameworkTab', 'DatabaseTab', 'paymentTab', 'submitTab']

const defaultValues = {
    email: '',
    company: '',
    country: '',
    fullName: '',
    username: '',
    contact: Number('')
}

const AddProjectDrawer = props => {
    const { open, toggle } = props
    const [activeTab, setActiveTab] = useState('detailsTab')

    const { settings } = useSettings()

    const { direction } = settings

    const {
        reset,
        control,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    const handleClose = () => {
        setActiveTab('detailsTab')
        toggle()
        reset()
    }
    
    const nextArrow = direction === 'ltr' ? 'mdi:arrow-right' : 'mdi:arrow-left'
    const previousArrow = direction === 'ltr' ? 'mdi:arrow-left' : 'mdi:arrow-right'
    
    const renderTabFooter = () => {
        const prevTab = tabsArr[tabsArr.indexOf(activeTab) - 1]
        const nextTab = tabsArr[tabsArr.indexOf(activeTab) + 1]

        return (
        <Box sx={{ mt: 8.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
                variant='outlined'
                color='secondary'
                disabled={activeTab === 'detailsTab'}
                onClick={() => setActiveTab(prevTab)}
                startIcon={<Icon icon={previousArrow} />}
            >
                Previous
            </Button>
            <Button
                variant='contained'
                color={activeTab === 'submitTab' ? 'success' : 'primary'}
                endIcon={<Icon icon={activeTab === 'submitTab' ? 'mdi:check' : nextArrow} />}
                onClick={() => {
                    if (activeTab !== 'submitTab') {
                        setActiveTab(nextTab)
                    } else {
                        handleClose()
                    }
                }}
            >
                {activeTab === 'submitTab' ? 'Submit' : 'Next'}
            </Button>
        </Box>
        )
    }

    return (
        <Card>
            <Dialog
                fullWidth
                open={open}
                scroll='body'
                maxWidth='md'
                onClose={handleClose}
                onBackdropClick={handleClose}
                TransitionComponent={Transition}
            >
                <DialogContent
                    sx={{
                        position: 'relative',
                        pr: { xs: 5, sm: 12 },
                        pl: { xs: 4, sm: 11 },
                        pt: { xs: 8, sm: 12.5 },
                        pb: { xs: 5, sm: 12.5 }
                    }}
                >
                    <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
                        <Icon icon='mdi:close' />
                    </IconButton>
                    <Box sx={{ mb: 3, textAlign: 'center' }}>
                        <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                            Criação do Projeto
                        </Typography>
                        <Typography variant='body2'>Forneça dados com este formulário para criar seu projeto.</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                        <TabContext value={activeTab}>
                            <TabList
                                orientation='vertical'
                                onChange={(e, newValue) => setActiveTab(newValue)}
                                sx={{
                                border: 0,
                                minWidth: 200,
                                '& .MuiTabs-indicator': { display: 'none' },
                                '& .MuiTabs-flexContainer': {
                                    alignItems: 'flex-start',
                                    '& .MuiTab-root': {
                                    width: '100%',
                                    alignItems: 'flex-start'
                                    }
                                }
                                }}
                            >
                                <Tab
                                    disableRipple
                                    value='detailsTab'
                                    label={
                                        <TabLabel
                                        title='Details'
                                        subtitle='Enter Details'
                                        icon={<Icon icon='mdi:clipboard-outline' />}
                                        active={activeTab === 'detailsTab'}
                                        />
                                    }
                                />
                                <Tab
                                    disableRipple
                                    value='frameworkTab'
                                    label={
                                        <TabLabel
                                        title='Frameworks'
                                        icon={<Icon icon='mdi:star-outline' />}
                                        subtitle='Select Framework'
                                        active={activeTab === 'frameworkTab'}
                                        />
                                    }
                                />
                                <Tab
                                    disableRipple
                                    value='DatabaseTab'
                                    label={
                                        <TabLabel
                                        title='Database'
                                        active={activeTab === 'DatabaseTab'}
                                        subtitle='Select Database'
                                        icon={<Icon icon='mdi:chart-donut' />}
                                        />
                                    }
                                />
                                <Tab
                                    disableRipple
                                    value='paymentTab'
                                    label={
                                        <TabLabel
                                        title='Billing'
                                        active={activeTab === 'paymentTab'}
                                        subtitle='Payment details'
                                        icon={<Icon icon='mdi:credit-card-outline' />}
                                        />
                                    }
                                />
                                <Tab
                                    disableRipple
                                    value='submitTab'
                                    label={
                                        <TabLabel
                                        title='Submit'
                                        subtitle='Submit'
                                        icon={<Icon icon='mdi:check' />}
                                        active={activeTab === 'submitTab'}
                                        />
                                    }
                                />
                            </TabList>
                            <TabPanel value='detailsTab' sx={{ flexGrow: 1 }}>
                                {/* <DialogTabDetails /> */}
                                {renderTabFooter()}
                            </TabPanel>
                            <TabPanel value='frameworkTab' sx={{ flexGrow: 1 }}>
                                {/* <DialogTabFramework /> */}
                                {renderTabFooter()}
                            </TabPanel>
                            <TabPanel value='DatabaseTab' sx={{ flexGrow: 1 }}>
                                {/* <DialogTabDatabase /> */}
                                {renderTabFooter()}
                            </TabPanel>
                            <TabPanel value='paymentTab' sx={{ flexGrow: 1 }}>
                                {/* <DialogTabBilling /> */}
                                {renderTabFooter()}
                            </TabPanel>
                            <TabPanel value='submitTab' sx={{ flexGrow: 1 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant='h6'>Submit</Typography>
                                    <Typography variant='body2'>Submit to kickstart your project.</Typography>

                                    <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
                                        <img alt='submit-img' src={`/images/pages/create-app-dialog-illustration-${settings.mode}.png`} />
                                    </Box>
                                </Box>
                                {renderTabFooter()}
                            </TabPanel>
                        </TabContext>
                    </Box>
                </DialogContent>
            </Dialog>
        </Card>
    )
}

export default AddProjectDrawer
