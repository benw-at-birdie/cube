import React, { useState, useEffect } from 'react';
import { useCubeQuery } from '@cubejs-client/react';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const DimensionFilter = ({ label, query, defaultValue, selectedValue, setSelectedValue }) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.white,
    },
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
      fontWeight: 300,
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
    },
  }))
  const classes = useStyles();

  const [options, setOptions] = useState([]);
  const { resultSet, error, isLoading } = useCubeQuery(query);

  const handleSelectionChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if (resultSet) {
      // Map the resultSet to the format expected by the dropdown, using the config
      const mappedOptions = resultSet.loadResponse.data.map(item => ({
        id: item[query.dimensions[0]],
        label: item[query.dimensions[1]],
      }));
      setOptions(mappedOptions);
    } else if (error) {
      // Handle the error scenario
      console.error("Error fetching data:", error);
    }
  }, [resultSet, error, query]);

  return (
    <FormControl style={{borderNone: 'none'}}>
      <InputLabel className={classes.selectTitle} id="dropdown-select-label">
        {label}
      </InputLabel>
      <Select
        className={classes.select}
        labelId="dropdown-select-label"
        id="dropdown-select"
        value={selectedValue}
        onChange={handleSelectionChange}
        style={{marginTop: 25}}
      >
        {/* Always show the "All" option */}
        <MenuItem key="all" value={defaultValue}>
          {defaultValue}
        </MenuItem>

        {/* Show the options if they are loaded, otherwise show a loading message */}
        {isLoading ? (
          <MenuItem>Loading...</MenuItem>
        ) : 
        options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DimensionFilter;
