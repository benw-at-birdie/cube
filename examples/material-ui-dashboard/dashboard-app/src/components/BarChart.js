import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Divider } from '@material-ui/core';
import BarChartHeader from './BarChartHeader';
import ChartRenderer from './ChartRenderer';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    position: 'relative',
    padding: '19px 0',
  },
}));

const BarChart = (props) => {
  const { className, query, title, numberFormat, dateFormat, ...rest } = props;
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <BarChartHeader title={title} />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <ChartRenderer vizState={{ query: query, chartType: 'bar', numberFormat: numberFormat, dateFormat: dateFormat }}/>
        </div>
      </CardContent>
    </Card>
  );
};

BarChart.propTypes = {
  className: PropTypes.string,
};

export default BarChart;
