import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Ensure you've installed react-router-dom
import { useTranslation } from 'react-i18next';
import './i18n'; // Importing the i18n config
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import cubejs from '@cubejs-client/core';
import { CubeProvider } from '@cubejs-client/react';
import theme from './theme';
import 'typeface-roboto';
import { Main } from './layouts';
import Header from './components/Header';

const cubejsApi = cubejs(process.env.REACT_APP_CUBEJS_TOKEN, {
  apiUrl: process.env.REACT_APP_API_URL
});


const useStyles = makeStyles((theme) => ({
  root: {
    padding: 32,
    backgroundColor: 'rgb(248, 249, 250)',
    height: '100%',
  },
}));

const AppLayout = ({ children }) => {
  const classes = useStyles();

  const location = useLocation(); // This hook provides access to the location object
  const { i18n } = useTranslation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const lang = searchParams.get('lang');
    if (lang) {
      console.log('lang', lang);
      i18n.changeLanguage(lang);
    }
  }, [location, i18n]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Main>
        <div className={classes.root}>
          <div>{children}</div>
        </div>
      </Main>
    </ThemeProvider>
  );
};

const App = ({ children }) => (
  <CubeProvider cubejsApi={cubejsApi}>
    <AppLayout>{children}</AppLayout>
  </CubeProvider>
);

export default App;
