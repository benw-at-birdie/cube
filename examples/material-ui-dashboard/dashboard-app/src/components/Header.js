import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1, // This will push the navItems div to the right
  },
  navItems: {
    display: 'flex',
  },
  // ... other styles ...
}));

const Header = ({ location }) => {

  const classes = useStyles();

  return (
  <AppBar position="static" style= {{ backgroundColor: 'rgb(2, 26, 61)', boxShadow: 'none'}}>
    <Toolbar variant="dense" style={{ paddingRight: '7px' }}>

        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          <img src="/images/birdie_icon.png" alt="Birdie Logo" style={{ margin: '5px', height: '50px' }} />
        </Typography>

      <div className={classes.navItems}>
        <img src="/images/birdie_email_icon.png" alt="Support" style={{ margin: '0px', height: '55px' }} />
        <Button style={{ textTransform: 'none', fontFamily: "Circular-Std", fontWeight: '100'}} color="inherit">
            (Demo) Enterprise Demo Hub ⏷
          </Button>
        <img src="/images/birdie_user_icon.png" alt="Profile" style={{ margin: '0px', marginLeft: '5px', height: '55px' }} />
      </div>
    </Toolbar>
  </AppBar>
  );
};

export default withRouter(Header);
