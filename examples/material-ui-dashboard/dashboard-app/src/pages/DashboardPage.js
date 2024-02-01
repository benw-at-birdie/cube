import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import BarChart from '../components/BarChart.js';
import Filters from '../components/Filters.js';
// import Typography from '../theme/typography.js';
import Typography from '@material-ui/core/Typography';
import '../fonts.css';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n.js';
import { tr } from 'date-fns/locale';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    height: '100%',
    
  },
  sectionHeader: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(3),
    fontWeight: 100,
    fontSize: 22,
    fontFamily: "Circular-Std"
  },
  sectionSubheader: {
    marginTop: theme.spacing(0),
    marginLeft: '3px',
    marginBottom: theme.spacing(2),
    fontFamily: "Circular-Std"
  },
}));


const Dashboard = () => {
  // const branch_id = '6a597bbe-fdd4-4b90-bbff-a38e28736b96'; // (Demo) Enterprise Demo Hub
  const branch_id = '92ddf419-5521-4cdb-a646-9bbc705a32a8'; // Alina - Bath

  const classes = useStyles();

  const { t } = useTranslation();
  const dateRanges = [
    { id: 0, range: 'Last 7 days', granularity: 'day', dateFormat: 'MMM D', translation: t('last7Days')},
    { id: 1, range: 'Last 13 weeks', granularity: 'week', dateFormat: 'MMM D', translation: t('last13Weeks')},
    { id: 2, range: 'Last 12 months', granularity: 'month', dateFormat: 'MMM YY', translation: t('last12Months')},
  ];

  const [selectedDateRange, setDateRange] = React.useState(0);

  const [selectedClient, setSelectedClient] = useState(t('allClients'));
  const [selectedCarer, setSelectedCarer] = useState(t('allCarers'));

  // This effect runs when the component mounts and whenever the language changes
  useEffect(() => {
    setSelectedClient(t('allClients'));
    setSelectedCarer(t('allCarers'));
  }, [i18n.language, t]); // Adding t as a dependency ensures the state updates when translations have been loaded


  const currentFilters = () => {
    const filters = [
      {
        "member": "branches.branch_id",
        "operator": "equals",
        "values": [`${branch_id}`]
      }
      // ... other always-present filters
    ];

    // Add the client_id filter only if selectedClient is set and not null
    if (selectedClient != t('allClients')) {
      filters.push({
        "member": "clients.client_id",
        "operator": "equals",
        "values": [`${selectedClient}`]
      });
    }

    // Add the carer_id filter only if selectedCarer is set and not null
    if (selectedCarer != t('allCarers')) {
      filters.push({
        "member": "users.user_id",
        "operator": "equals",
        "values": [`${selectedCarer}`]
      });
    }

    return filters;
  };

  return (
      <div className={classes.root}>

      {/* DASHBOARD FILTERS */}
      <Filters
        dateRanges={dateRanges}
        selectedDateRange={selectedDateRange}
        setDateRange={setDateRange}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        selectedCarer={selectedCarer}
        setSelectedCarer={setSelectedCarer}
        branch_id={branch_id}
      />

      <Typography variant="h4" className={classes.sectionHeader}>
          {t('visitsAndHoursDelivered')}
      </Typography>

      <Grid container spacing={4}>

        {/* REPORTED VISITS TREND */}
        <Grid item xs={3} sm={6} lg={6} xl={6} >
          <BarChart
            title={t('reportedVisits')}
            numberFormat="#,##0"
            dateFormat={dateRanges[selectedDateRange].dateFormat}
            query={{
              "measures": [
                "visits.reported_visits"
              ],
              "timeDimensions": [
                {
                  "dimension": "visits.visit_date",
                  "granularity": `${dateRanges[selectedDateRange].granularity}`,
                  "dateRange": `${dateRanges[selectedDateRange].range}`
                }
              ],
              "filters": currentFilters()
            }}
          />
        </Grid>

        {/* PERCENT SCHEDULED VISITS COMPLETED */}
        <Grid item xs={3} sm={6} lg={6} xl={6} >
          <BarChart
            title={t('percentageOfScheduledVisitsWithReport')}
            numberFormat="0.0%"
            dateFormat={dateRanges[selectedDateRange].dateFormat}
            query={{
              "measures": [
                "visits.percentage_of_scheduled_visits_reported"
              ],
              "timeDimensions": [
                {
                  "dimension": "visits.visit_date",
                  "granularity": `${dateRanges[selectedDateRange].granularity}`,
                  "dateRange": `${dateRanges[selectedDateRange].range}`
                }
              ],
              "filters": currentFilters()
            }}
          />
        </Grid>

        {/* HOURS DELIVERED */}
        <Grid item xs={3} sm={6} lg={6} xl={6} >
          <BarChart
            title={t('hoursDelivered')}
            numberFormat="#,##0"
            dateFormat={dateRanges[selectedDateRange].dateFormat}
            query={{
              "measures": [
                "visits.total_reported_visit_hours"
              ],
              "timeDimensions": [
                {
                  "dimension": "visits.visit_date",
                  "granularity": `${dateRanges[selectedDateRange].granularity}`,
                  "dateRange": `${dateRanges[selectedDateRange].range}`
                }
              ],
              "filters": currentFilters()
            }}
          />
        </Grid>

        {/* PERCENT OF SCHEDULED HOURS DELIVERED*/}
        <Grid item xs={3} sm={6} lg={6} xl={6} >
          <BarChart
            title={t('percentageOfScheduledHoursDelivered')}
            numberFormat="0.0%"
            dateFormat={dateRanges[selectedDateRange].dateFormat}
            query={{
              "measures": [
                "visits.percentage_of_scheduled_hours_delivered"
              ],
              "timeDimensions": [
                {
                  "dimension": "visits.visit_date",
                  "granularity": `${dateRanges[selectedDateRange].granularity}`,
                  "dateRange": `${dateRanges[selectedDateRange].range}`
                }
              ],
              "filters": currentFilters()
            }}
          />
        </Grid>

      </Grid>

      <Typography variant="h3" className={classes.sectionHeader}>
        {t('punctuality')}
      </Typography>
      
      <Grid container spacing={4}>

        {/* PERCENTAGE OF VISITS WITHIN 15 MINS */}
        <Grid item xs={3} sm={6} lg={6} xl={6} >
          <BarChart
            title={t('percentageOfVisitsStartingWithin15Mins')}
            numberFormat="0.0%"
            dateFormat={dateRanges[selectedDateRange].dateFormat}
            query={{
              "measures": [
                "visits.percentage_of_reported_visits_starting_within_15_mins"
              ],
              "timeDimensions": [
                {
                  "dimension": "visits.visit_date",
                  "granularity": `${dateRanges[selectedDateRange].granularity}`,
                  "dateRange": `${dateRanges[selectedDateRange].range}`
                }
              ],
              "filters": currentFilters()
            }}
          />
        </Grid>
      </Grid>

      <Typography variant="h3" className={classes.sectionHeader}>
        {t('careTasksAndObservations')}
      </Typography>
      <Typography variant="p" className={classes.sectionHeader}>
        ...
      </Typography>

      <Typography variant="h3" className={classes.sectionHeader}>
        {t('medications')}
      </Typography>
      <Typography variant="p" className={classes.sectionHeader}>
        ...
      </Typography>
    </div>
  );
};

export default Dashboard;