import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import withStyles from '@material-ui/core/styles/withStyles';
import palette from '../theme/palette';
import Slider from '@material-ui/core/Slider';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

const AntTabs = withStyles({
  root: {
    borderBottom: `1px solid ${palette.primary.main}`,
  },
  indicator: {
    backgroundColor: `${palette.primary.main}`,
  },
})(Tabs);
const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 25,
    fontSize: 12,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(0),
    color: palette.primary.dark,
    opacity: 0.6,
    '&:hover': {
      color: `${palette.primary.main}`,
      opacity: 1,
    },
    '&$selected': {
      color: `${palette.primary.main}`,
      fontWeight: theme.typography.fontWeightMedium,
      outline: 'none',
    },
    '&:focus': {
      color: `${palette.primary.main}`,
      outline: 'none',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);
const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
  select: {
    marginTop: 3,
    minWidth: 200,
  },
  date: {
    marginTop: 3,
  },
  range: {
    marginTop: 13,
  },
}));

const Filters = (props) => {
  const {
    className,
    dateRanges,
    dateRange,
    setDateRange,
    ...rest
  } = props;

  const classes = useStyles();

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  }
 
  const handleClientChange = (event) => {
    // setSelectedClient(event.target.value);
  };

  const handleCarerChange = (event) => {
    // setSelectedClient(event.target.value);
  };

  // Dummy data for clients
  const clients = [
    { id: 1, name: 'Client A' },
    { id: 2, name: 'Client B' },
    { id: 3, name: 'Client C' },
    // ... other clients
  ];

  const carers = [
    { id: 1, name: 'Carer A' },
    { id: 2, name: 'Carer B' },
    { id: 3, name: 'Carer C' },
    // ... other carers
  ];

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid container spacing={4}>
        <Grid className={classes.select} item xs={3} sm={3} m={3} lg={3} xl={3}>
          <FormControl>
            <InputLabel className={classes.select} id="date-range-select-label">Date Range</InputLabel>
            <Select className={classes.select}
              labelId="date-range-select-label"
              id="date-range-select"
              value={dateRange}
              onChange={handleDateRangeChange}>
              {dateRanges.map((range) => (
                <MenuItem key={range} value={range.id}>
                  {range.range}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>        
        <Grid className={classes.select} item xs={3} sm={3} m={3} lg={3} xl={3}>
          <FormControl>
            <InputLabel className={classes.select} id="client-select-label">Client Name</InputLabel>
            <Select className={classes.select}
              labelId="client-select-label"
              id="client-select"
              // value={selectedClient}
              onChange={handleClientChange}
            >
              {clients.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid className={classes.select} item xs={3} sm={3} m={3} lg={3} xl={3}>
          <FormControl>
            <InputLabel className={classes.select} id="carer-select-label">Carer Name</InputLabel>
            <Select className={classes.select}
              labelId="carer-select-label"
              id="carer-select"
              // value={selectedCarer}
              onChange={handleCarerChange}
            >
              {carers.map((carer) => (
                <MenuItem key={carer.id} value={carer.id}>
                  {carer.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

Filters.propTypes = {
  className: PropTypes.string,
};

export default Filters;
