import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import jwt from 'jsonwebtoken';

import '../fonts.css';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh', // This makes the root div fill the full viewport height
    padding: theme.spacing(4),
  },
  iframe: {
    height: '100%', // This now works because the parent has a defined height
    width: '100%', // This is fine as you mentioned
  },
  sectionHeader: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(3),
    fontWeight: 100,
    fontSize: 22,
    fontFamily: "Circular-Std"
  },
  sectionSubheader: {
    marginTop: theme.spacing(0),
    marginLeft: '3px',
    marginBottom: theme.spacing(2),
    fontFamily: "Circular-Std"
  },
}));


const Dashboard = () => {

  const [embedUrl, setEmbedUrl] = useState('');
  const classes = useStyles();

  useEffect(() => {
    const LIGHTDASH_EMBED_SECRET = process.env.REACT_APP_LIGHTDASH_EMBED_SECRET;
    const projectUuid = '9f063766-e928-45ed-b502-bd17afd4024e';
    const data = {
      content: {
        type: 'dashboard',
        dashboardUuid: 'd1650e68-839b-4846-b305-5faf54fa379d', // UK dashboard
        // dashboardUuid: 'bed740d0-a3a3-4752-9668-068c1808609b', // Germany dashboard
        dashboardFiltersInteractivity: {
          enabled: true,
        },
      },
      // userAttributes: {"accessible_branch_ids":"whiteys-care-workers"},
      // userAttributes: {"accessible_branch_ids":["miguels-care-monitors-valencia","miguels-care-monitors-madrid"]},
    };
    const token = jwt.sign(data, LIGHTDASH_EMBED_SECRET, { expiresIn: '1 hour' });
    const url = `https://birdie.lightdash.cloud/embed/${projectUuid}/#${token}`;
    setEmbedUrl(url);
  }, []);

  return (
      <div className={classes.root}>
          {embedUrl && <iframe  src={embedUrl} 
                                className={classes.iframe} 
                                frameBorder="0" 
                                height="100%"
                                width="100%"></iframe>}
      </div>
  );
};

export default Dashboard;