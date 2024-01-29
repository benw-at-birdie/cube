import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';
import { useCubeQuery } from '@cubejs-client/react';
import FormControl from '@material-ui/core/FormControl';
import palette from '../theme/palette';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 32,
    width: '100%',
    color: palette.text.secondary,
    textClasses: {},
  },
  text: {
    color: palette.text.secondary,
    fontSize: 16,
  },
  icon: {
    color: palette.text.secondary,
  },
}));

const UserSearch = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const { resultSet, error, isLoading } = useCubeQuery({
    measures: ['users.count'],
    timeDimensions: [
      {
        dimension: 'users.created_at',
      },
    ],
    order: {
      'users.id': 'asc',
    },
    dimensions: ['users.id', 'users.first_name', 'users.last_name'],
    filters: [],
  });

  const handleChange = (value) => {
    history.push(`/user/${value.id}`);
  };

  if (isLoading) {
    return null;
  }

  if (error) {
    return <pre>{error.toString()}</pre>;
  }

  if (!resultSet) {
    return null;
  }

  const options = resultSet.tablePivot().map((item) => {
    return {
      id: item['users.id'],
      text: `${item['users.id']} - ${item['users.first_name']} ${item['users.last_name']}`,
    };
  });

  return (
    <FormControl className={classes.root}>
      <Autocomplete
        disableClearable
        onChange={(event, value) => {
          handleChange(value);
        }}
        forcePopupIcon={false}
        options={options}
        getOptionLabel={(option) => option.text}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon className={classes.icon} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ classes: { root: classes.text } }}
          />
        )}
      />
    </FormControl>
  );
};

export default UserSearch;
