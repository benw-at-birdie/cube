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
import { useTranslation } from 'react-i18next';

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
  selectTitle: {
    fontFamily: "Circular-Std",
    fontSize: 18,
    fontWeight: 500,
    marginLeft: 3
  },
  select: {
    marginTop: 30,
    marginRight: 25,
    minWidth: 200,
    backgroundColor: theme.palette.white,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgb(208, 214, 225)',
    borderRadius: 6,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: '4px',
    paddingBottom: '4px',
    fontWeight: 400,
    '&:before': {
      borderBottom: 'none',
    },
    '&:after': {
      borderBottom: 'none',
    },
    fontFamily: "Circular-Std",
    fontSize: 16
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

  const { t } = useTranslation();

  return (
    <div {...rest} className={clsx(classes.root, className)}>

          <FormControl style={{borderBottom: 'none'}}>
            <InputLabel className={classes.selectTitle} id="date-range-select-label">{t('dateRange')}</InputLabel>
            <Select className={classes.select}
              labelId="date-range-select-label"
              id="date-range-select"
              value={selectedDateRange}
              onChange={handleDateRangeChange}
              style={{marginTop: 25}}>
              {dateRanges.map((range) => (
                <MenuItem key={range} value={range.id}>
                  {range.translation}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DimensionFilter
            label={t('clientName')}
            defaultValue={t('allClients')}
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
            label={t('carerName')}
            defaultValue={t('allCarers')}
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
