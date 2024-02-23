import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { SidebarNav } from './components';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 230,
    position: "absolute",
    top: 0,
    height: '100%',
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(1, 2, 0, 2),
    width: theme.spacing(24),
    backgroundColor: 'rgb(208, 214, 225)',
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
  sectionHeader: {
    fontSize: 14,
    color: 'rgb(87, 93, 101)',
    fontWeight: 500,
    lineHeight: '20px',
    marginTop: 25,
    marginLeft: 15,
    marginBottom: 10,
    padding: 0,
    textAlign: 'left',
    fontFamily: "Circular-Std, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
  },
}));

const Sidebar = (props) => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const { t } = useTranslation();

  const weeklyUpdatesPages = [
    {
      title: t('deliveryTrends'),
      href: '/dashboard',
      // icon: <DashboardIcon />,
    },
    {
      title: t('deliveryByClient'),
      href: '/orders',
      // icon: <DashboardIcon />,
    },
    {
      title: t('deliveryByCarer'),
      href: '/orders',
      // icon: <DashboardIcon />,
    },
    {
      title: t('managementTrends'),
      href: '/orders',
      // icon: <AssignmentIcon />,
    },
    {
      title: t('managementByClient'),
      href: '/orders',
      // icon: <AssignmentIcon />,
    },
  ];

  const monitoringAndAuditingPages = [
    {
      title: t('qScoreSummary'),
      href: '/orders',
      // icon: <AssignmentIcon />,
    },
    {
      title: t('activeClientTrends'),
      href: '/orders',
      // icon: <AssignmentIcon />,
    },
    {
      title: t('actions'),
      href: '/orders',
      // icon: <DashboardIcon />,
    },
    {
      title: t('setupAndTraining'),
      href: '/orders',
      // icon: <AssignmentIcon />,
    },
    {
      title: t('clientProfiles'),
      href: '/orders',
      // icon: <AssignmentIcon />,
    },
  ];


  return (
    <Drawer anchor="left" classes={{ paper: classes.drawer }} onClose={onClose} open={open} variant={variant}>
      <h3 className={classes.sectionHeader}>{t('weeklyUpdates')}</h3>
      <div {...rest} className={clsx(classes.root, className)}>
        <SidebarNav className={classes.nav} pages={weeklyUpdatesPages} />
      </div>
      <Divider className={classes.divider} />
      <h3 className={classes.sectionHeader}>{t('monitoringAndAuditing')}</h3>
      <div {...rest} className={clsx(classes.root, className)}>
        <SidebarNav className={classes.nav} pages={monitoringAndAuditingPages} />
      </div>
    </Drawer>

  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
