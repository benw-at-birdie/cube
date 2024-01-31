import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import palette from '../../theme/palette';
import { Sidebar } from './components';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'rgb(248, 250, 255)',
    position: 'relative',
  },
  shiftContent: {
    paddingLeft: 240,
  },
}));

const Main = (props) => {
  const { children } = props;

  const classes = useStyles();
  const isDesktop = true;

  return (
    <div style={{ height: '100%' }}
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop,
      })}
    >
      <Sidebar onClose={() => {}} open variant={isDesktop ? 'persistent' : 'temporary'} />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
