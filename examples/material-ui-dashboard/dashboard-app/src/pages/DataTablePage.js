import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import Toolbar from '../components/Toolbar.js';
import Table from '../components/Table.js';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  content: {
    marginTop: 15,
  },
}));

const DataTablePage = () => {
  const classes = useStyles();
  const tabs = ['All', 'Shipped', 'Processing', 'Completed'];
  const [statusFilter, setStatusFilter] = React.useState(0);
  const [startDate, setStartDate] = React.useState(new Date('2019-01-01T00:00:00'));
  const [finishDate, setFinishDate] = React.useState(new Date('2019-12-31T00:00:00'));
  const [priceFilter, setPriceFilter] = React.useState([0, 200]);
  const [sorting, setSorting] = React.useState(['orders.created_at', 'desc']);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const query = {
    limit: rowsPerPage,
    offset: rowsPerPage * page,
    order: {
      [`${sorting[0]}`]: sorting[1],
    },
    timeDimensions: [
      {
        dimension: 'orders.created_at',
        dateRange: [startDate, finishDate],
        granularity: null,
      },
    ],
    dimensions: [
      'users.id',
      'orders.id',
      'orders.number',
      'users.first_name',
      'users.city',
      'orders.status',
      'orders.created_at',
    ],
    filters: [
      {
        dimension: 'orders.status',
        operator: tabs[statusFilter] !== 'All' ? 'equals' : 'set',
        values: [`${tabs[statusFilter].toLowerCase()}`],
      }
    ],
  };
  const countQuery = {
    order: {
      [`${sorting[0]}`]: sorting[1],
    },
    timeDimensions: [
      {
        dimension: 'orders.created_at',
        dateRange: [startDate, finishDate],
        granularity: null,
      },
    ],
    measures: ['orders.count'],
    filters: [
      {
        dimension: 'orders.status',
        operator: tabs[statusFilter] !== 'All' ? 'equals' : 'set',
        values: [`${tabs[statusFilter].toLowerCase()}`],
      },
      {
        dimension: 'orders.price',
        operator: 'gt',
        values: [`${priceFilter[0]}`],
      },
      {
        dimension: 'orders.price',
        operator: 'lt',
        values: [`${priceFilter[1]}`],
      },
    ],
  };

  return (
    <div className={classes.root}>
      <Toolbar
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
      <div className={classes.content}>
        <Table
          sorting={sorting}
          setSorting={setSorting}
          query={query}
          countQuery={countQuery}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default DataTablePage;
