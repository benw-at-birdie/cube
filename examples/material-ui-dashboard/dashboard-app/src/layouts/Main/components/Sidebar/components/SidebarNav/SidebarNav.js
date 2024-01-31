/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
    margin: 0
  },
  button: {
    color: '#888',
    padding: '10px 16px',
    marginBottom: 4,
    marginRight: 4,
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '92%',
    fontSize: 14,
    fontWeight: 500,
    '&:hover': {
      color: 'rgb(2, 26, 61)',
      backgroundColor: 'rgb(237, 241, 250)'
    },
    fontFamily: "Circular-Std, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
  active: {
    color: 'rgb(2, 26, 61)',
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: 'rgb(2, 26, 61)'
    },
    backgroundColor: 'rgb(237, 241, 250)',
    borderLeftColor: 'rgb(3, 45, 101)',
    borderLeftWidth: 4,
    borderLeftStyle: 'solid',
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const SidebarNav = (props) => {
  const { pages, className, ...rest } = props;

  const classes = useStyles();

  return (
    <List {...rest} style= {{ margin: 0}}>
      {pages.map((page) => (
        <ListItem className={classes.item} disableGutters key={page.title}>
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            to={page.href}
          >
            {/* <div className={classes.icon}>{page.icon}</div> */}
            {page.title}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired,
};

export default SidebarNav;
