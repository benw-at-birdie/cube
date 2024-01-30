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
import DimensionFilter from './DimensionFilter';

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
    marginRight: 25,
    minWidth: 200,
  },
  date: {
    marginTop: 3,
  },
  range: {
    marginTop: 13,
  }
}));




const Filters = (props) => {
  const {
    className,
    dateRanges,
    selectedDateRange,
    setDateRange,
    selectedClient,
    setSelectedClient,
    selectedCarer,
    setSelectedCarer,
    branch_id,
    ...rest
  } = props;

  const classes = useStyles();

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  }

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

          <FormControl>
            <InputLabel className={classes.select} id="date-range-select-label">Date Range</InputLabel>
            <Select className={classes.select}
              labelId="date-range-select-label"
              id="date-range-select"
              value={selectedDateRange}
              onChange={handleDateRangeChange}>
              {dateRanges.map((range) => (
                <MenuItem key={range} value={range.id}>
                  {range.range}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DimensionFilter
            label='Client Name'
            defaultValue='All clients'
            query={{
              dimensions: [
                "clients.client_id",
                "clients.client_name"
              ],
              order: {
                "clients.client_name": "asc"
              },
              "filters": [
                {
                  "member": "branches.branch_id",
                  "operator": "equals",
                  "values": [`${branch_id}`]
                }
              ]
            }}
            selectedValue={selectedClient}
            setSelectedValue={setSelectedClient}
          />

          <DimensionFilter
            label='Carer Name'
            defaultValue={'All carers'}
            query={{
              dimensions: [
                "users.user_id",
                "users.user_name"
              ],
              order: {
                "users.user_name": "asc"
              },
              "filters": [
                {
                  "member": "branches.branch_id",
                  "operator": "equals",
                  "values": [`${branch_id}`]
                },
                {
                  "member": "users_to_branch_role_mapping.role",
                  "operator": "equals",
                  "values": ["caregiver", "care_manager"]
                }
              ]
            }}
            selectedValue={selectedCarer}
            setSelectedValue={setSelectedCarer}
          />

    </div>
  );
};

Filters.propTypes = {
  className: PropTypes.string,
};

export default Filters;
