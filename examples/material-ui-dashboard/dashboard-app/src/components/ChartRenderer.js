import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useCubeQuery } from '@cubejs-client/react';
import { useDbtSLQuery } from './useDbtSLQuery/useDbtSLQuery.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Line, Bar, Pie } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import palette from '../theme/palette';
import moment from 'moment';
import 'moment/locale/de'; // Import German locale
import { BarOptions } from '../helpers/BarOptions.js';
import numbro from 'numbro';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
// import i18n from '../i18n.js';

const COLORS_SERIES = [palette.primary.main, palette.primary.light, palette.secondary.light];

const useLocalizedMoment = () => {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    moment.locale(i18n.language);
  }, [i18n.language]);
  
  return moment;
};


const useStyles = makeStyles((theme) => ({
  palette: {
    primary: {
      main: 'rgb(173, 187, 219)',
    },
    secondary: {
      main: 'rgb(221, 225, 231)',
    }
  }
}));

const BarChartComponent = ({ resultSet, numberFormat, dateFormat }) => {
  const { i18n } = useTranslation();
  
  // Set moment's locale to the current language
  useEffect(() => {
    moment.locale(i18n.language);
  }, [i18n.language]);

  let customBarOptions = {...BarOptions};

  // Modify scales.yAxes.ticks for custom formatting
  customBarOptions.scales = {
    ...customBarOptions.scales,
    yAxes: customBarOptions.scales.yAxes.map(yAxis => ({
      ...yAxis,
      ticks: {
        ...yAxis.ticks,
        callback: function(value) {
          return numbro(value).format(numberFormat);;
        }
      }
    }))
  };

  const data = {
    labels: resultSet.data.map(item => moment(item.METRIC_TIME__DAY).format(dateFormat)),
    datasets: [
      {
        label: 'Completed Visit Count',
        data: resultSet.data.map(item => item.COMPLETED_VISIT_COUNT),
        backgroundColor: COLORS_SERIES[0],
        borderColor: COLORS_SERIES[0],
        borderWidth: 1,
        fill: false,
      }
    ]
    // labels: resultSet.categories().map((c) => moment(c.x).format(dateFormat)),
    // datasets: resultSet.series().map((s, index) => ({
    //   label: s.title,
    //   data: s.series.map((r) => r.value),
    //   backgroundColor: COLORS_SERIES[index],
    //   fill: false,
    // })),
  };


  return <Bar data={data} options={customBarOptions} />;
};

const TypeToChartComponent = {

  line: ({ resultSet }) => {
    const data = {
      labels: resultSet.categories().map((c) => c.x),
      datasets: resultSet.series().map((s, index) => ({
        label: s.title,
        data: s.series.map((r) => r.value),
        borderColor: COLORS_SERIES[index],
        fill: false,
      })),
    };
    const options = {};
    return <Line data={data} options={options} />;
  },

  bar: BarChartComponent,

  area: ({ resultSet }) => {
    const data = {
      labels: resultSet.categories().map((c) => c.x),
      datasets: resultSet.series().map((s, index) => ({
        label: s.title,
        data: s.series.map((r) => r.value),
        backgroundColor: COLORS_SERIES[index],
      })),
    };
    const options = {
      scales: {
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
    };
    return <Line data={data} options={options} />;
  },
  pie: ({ resultSet }) => {
    const data = {
      labels: resultSet.categories().map((c) => c.x),
      datasets: resultSet.series().map((s) => ({
        label: s.title,
        data: s.series.map((r) => r.value),
        backgroundColor: COLORS_SERIES,
        hoverBackgroundColor: COLORS_SERIES,
      })),
    };
    const options = {};
    return <Pie data={data} options={options} />;
  },
  number: ({ resultSet }) => (
    <Typography
      variant="h4"
      style={{
        textAlign: 'center',
      }}
    >
      {resultSet.seriesNames().map((s) => resultSet.totalRow()[s.key])}
    </Typography>
  ),
  table: ({ resultSet }) => (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          {resultSet.tableColumns().map((c) => (
            <TableCell key={c.key}>{c.title}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {resultSet.tablePivot().map((row, index) => (
          <TableRow key={index}>
            {resultSet.tableColumns().map((c) => (
              <TableCell key={c.key}>{row[c.key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
const TypeToMemoChartComponent = Object.keys(TypeToChartComponent)
  .map((key) => ({
    [key]: React.memo(TypeToChartComponent[key]),
  }))
  .reduce((a, b) => ({ ...a, ...b }));

const renderChart = (Component) => ({ resultSet, error, ...props }) =>
  (resultSet && <Component resultSet={resultSet} {...props} />) ||
  (error && error.toString()) || <CircularProgress color='secondary' />;

const ChartRenderer = ({ vizState = {} }) => {
  const { query, chartType, numberFormat, dateFormat, ...options } = vizState;
  const component = TypeToMemoChartComponent[chartType];
  const renderProps = useDbtSLQuery(query) //useCubeQuery(query);
  return component && renderChart(component)({ numberFormat, dateFormat, ...options, ...renderProps });
};

ChartRenderer.propTypes = {
  vizState: PropTypes.object,
  cubejsApi: PropTypes.object,
};
export default ChartRenderer;
