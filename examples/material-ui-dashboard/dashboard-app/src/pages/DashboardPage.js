import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import BarChart from '../components/BarChart.js';
import Filters from '../components/Filters.js';
// import Typography from '../theme/typography.js';
import Typography from '@material-ui/core/Typography';
import '../fonts.css';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    
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
  const branch_id = '6a597bbe-fdd4-4b90-bbff-a38e28736b96'; // (Demo) Enterprise Demo Hub
  // const branch_id = '92ddf419-5521-4cdb-a646-9bbc705a32a8'; // Alina - Bath

  const classes = useStyles();

  const dateRanges = [
    { id: 0, range: 'Last 7 days', granularity: 'day', dateFormat: 'MMM D'},
    { id: 1, range: 'Last 13 weeks', granularity: 'week', dateFormat: 'MMM D'},
    { id: 2, range: 'Last 12 months', granularity: 'month', dateFormat: 'MMM YY'}
  ];
  const [selectedDateRange, setDateRange] = React.useState(0);
  const [selectedClient, setSelectedClient] = React.useState('All clients');
  const [selectedCarer, setSelectedCarer] = React.useState('All carers');


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
    if (selectedClient != 'All clients') {
      filters.push({
        "member": "clients.client_id",
        "operator": "equals",
        "values": [`${selectedClient}`]
      });
    }

    // Add the carer_id filter only if selectedCarer is set and not null
    if (selectedCarer != 'All carers') {
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
          Visits & hours delivered
      </Typography>

      <Grid container spacing={4}>

        {/* REPORTED VISITS TREND */}
        <Grid item xs={3} sm={6} lg={6} xl={6} >
          <BarChart
            title="Reported Visits"
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
            title="% of Scheduled Visits with Report"
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

        {/* REPORTED VISITS TREND */}
        <Grid item xs={3} sm={6} lg={6} xl={6} >
          <BarChart
            title="Reported Visits"
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
            title="% of Scheduled Visits with Report"
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

      </Grid>

      <Typography variant="h3" className={classes.sectionHeader}>
        Medication Monitoring
      </Typography>
      <Typography variant="p" className={classes.sectionHeader}>
        ...
      </Typography>
    </div>
  );
};

export default Dashboard;
