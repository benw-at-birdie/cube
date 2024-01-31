import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Divider } from '@material-ui/core';
import BarChartHeader from './BarChartHeader';
import ChartRenderer from './ChartRenderer';
// import Typography from '../theme/typography';
import Typography from '@material-ui/core/Typography';
import theme from '../theme';

const useStyles = makeStyles(() => ({
  root: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgb(205, 211, 220)',
    borderRadius: 6,
    boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.07)',
  },
  chartContainer: {
    position: 'relative',
    paddingTop: '5px',
    paddingBottom: '10px',
  },
  chartTitle: {
    fontFamily: "Circular-Std",
    fontSize: 16,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0),
    marginLeft: theme.spacing(2),
  }
}));

const BarChart = (props) => {
  const { className, query, title, numberFormat, dateFormat, ...rest } = props;
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      {/* <BarChartHeader title={title} /> */}
      <Typography variant="h4" className={classes.chartTitle}>
        {title}
      </Typography>
      {/* <Divider style={{marginLeft: '10px', marginRight: '10px'}} /> */}
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
