// ** MUI Import
import Grid from '@mui/material/Grid';

// ** Styled Component Import
import ApexChartWrapper from '@/src/@core/components/styles/libs/react-apexcharts';
import KeenSliderWrapper from 'src/@core/components/styles/libs/keen-slider'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CardStatisticsVertical from 'src/@core/components/cards/card-stats-vertical'

// ** Components Imports
import CrmTable from 'src/views/pages/dashboard/admin/CrmTable';
import CrmProjectTimeline from 'src/views/pages/dashboard/admin/CrmProjectTimeline';
import AnalyticsActivityTimeline from 'src/views/pages/dashboard/admin/AnalyticsActivityTimeline';
import AnalyticsProjectStatistics from 'src/views/pages/dashboard/admin/AnalyticsProjectStatistics';
import EcommerceWeeklySalesBg from 'src/views/pages/dashboard/admin/EcommerceWeeklySalesBg'
import EcommerceMarketingSales from 'src/views/pages/dashboard/admin/EcommerceMarketingSales'

const CrmDashboard = () => {
    return(
        <ApexChartWrapper>
            <KeenSliderWrapper>
                <Grid container spacing={6} className='match-height'>
                    <Grid item xs={12} md={12}>                    
                        <CrmProjectTimeline />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <EcommerceWeeklySalesBg />
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <EcommerceMarketingSales />
                    </Grid> 
                    <Grid item xs={12} sm={6} md={4}>
                        <AnalyticsProjectStatistics />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <AnalyticsActivityTimeline />
                    </Grid>                                       
                    <Grid item xs={12} md={12}>
                        <CrmTable />
                    </Grid>
                </Grid>
            </KeenSliderWrapper>
        </ApexChartWrapper>
    )
}

export default CrmDashboard
