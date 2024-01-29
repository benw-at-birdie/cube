import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

// import KPIChart from '../components/KPIChart';
import BarChart from '../components/BarChart.js';
// import DoughnutChart from '../components/DoughnutChart.js';
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


const cards = [
  {
    title: 'ORDERS',
    query: { measures: ['orders.count'] },
    difference: 'orders',
    duration: 1.25,
  },
  {
    title: 'TOTAL USERS',
    query: { measures: ['users.count'] },
    difference: 'users',
    duration: 1.5,
  },
  {
    title: 'COMPLETED ORDERS',
    query: { measures: ['orders.completed_orders'] },
    progress: true,
    duration: 1.75,
  },
  {
    title: 'AVERAGE ORDER SIZE',
    query: { measures: ['orders.average_order_size'] },
    duration: 2.25,
  },
];
const barChartQuery = {
  measures: ['orders.count'],
  timeDimensions: [
    {
      dimension: 'orders.created_at',
      granularity: 'week',
      dateRange: ["2019-01-01", "2019-12-31"],
    },
  ],
  dimensions: ['orders.status'],
  filters: [
    {
      dimension: 'orders.status',
      operator: 'notEquals',
      values: ['completed'],
    },
  ],
};
const doughnutChartQuery = {
  measures: ['orders.count'],
  timeDimensions: [
    {
      dimension: 'orders.created_at',
    },
  ],
  filters: [],
  dimensions: ['orders.status'],
};

const Dashboard = () => {
  const classes = useStyles();
  const tabs = ['All', 'Shipped', 'Processing', 'Completed'];
  const [statusFilter, setStatusFilter] = React.useState(0);
  const [startDate, setStartDate] = React.useState(new Date('2019-01-01T00:00:00'));
  const [finishDate, setFinishDate] = React.useState(new Date('2019-12-31T00:00:00'));
  const [priceFilter, setPriceFilter] = React.useState([0, 200]);

  return (
    <div className={classes.root}>
      <h1>Care Deliver Trends</h1>
      <Filters
        startDate={startDate}
        setStartDate={setStartDate}
        finishDate={finishDate}
        setFinishDate={setFinishDate}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        tabs={tabs}
      />
      <h2>Call Monitoring</h2>
      <h3>Visits & hours delivered.</h3>
      <Grid container spacing={4}>
        {/* {cards.map((item, index) => {
          return (
            <Grid key={item.title + index} item lg={3} sm={6} xl={3} xs={12}>
              <KPIChart {...item} />
            </Grid>
          );
        })} */}
        <Grid item xs={3} sm={6} lg={6} xl={6} >
          <BarChart query={barChartQuery} />
        </Grid>
        <Grid item xs={3} sm={6} lg={6} xl={6} >
          <BarChart query={barChartQuery} />
        </Grid>
        <Grid item xs={3} sm={6} lg={6} xl={6} >
          <BarChart query={barChartQuery} />
        </Grid>
        <Grid item xs={3} sm={6} lg={6} xl={6} >
          <BarChart query={barChartQuery} />
        </Grid>
        {/* <Grid item lg={4} md={6} xl={3} xs={12}>
          <DoughnutChart query={doughnutChartQuery} />
        </Grid> */}
      </Grid>
    </div>
  );
};

export default Dashboard;
