import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import BarChart from '../components/BarChart.js';
import Filters from '../components/Filters.js';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  '@global': {
    h1: {
      marginBottom: theme.spacing(2),
    },
    h2: {
      textAlign: 'center', // Center align text for h2
      margin: theme.spacing(6, 0, 1),
    },
    h3: {
      textAlign: 'center', // Center align text for h2
      margin: theme.spacing(0, 0, 4),
      fontSize: '0.9rem',
    },
  }
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

      <h1>Care Deliver Trends</h1>

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

      <h2>Call Monitoring</h2>
      <h3>Visits & hours delivered.</h3>

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

      </Grid>
    </div>
  );
};

export default Dashboard;
