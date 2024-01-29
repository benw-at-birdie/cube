import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import KPIChart from '../components/KPIChart';
import BarChart from '../components/BarChart.js';
import DoughnutChart from '../components/DoughnutChart.js';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
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
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        {cards.map((item, index) => {
          return (
            <Grid key={item.title + index} item lg={3} sm={6} xl={3} xs={12}>
              <KPIChart {...item} />
            </Grid>
          );
        })}
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <BarChart query={barChartQuery} />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <DoughnutChart query={doughnutChartQuery} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
