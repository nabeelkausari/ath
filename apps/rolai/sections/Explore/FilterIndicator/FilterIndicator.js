import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { searchData } from '../../../store/explore/actions';
import { updateQueryParams } from '../ExploreFilter/ExploreFilter';
import useStyles from './FilterIndicator.styles';

const FilterIndicator = () => {
  const styles = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const { query } = router;
  const { selected_filters, search_by } = useSelector((state) => state.explore);

  if (
    (!selected_filters || selected_filters.length === 0) &&
    search_by === ''
  ) {
    return null;
  }

  const handleDelete = (filter) => {
    return router.push({
      pathname: '/explore',
      query: updateQueryParams(query, filter.type, filter.key),
    });
  };

  const handleClear = () => {
    dispatch(searchData(''));
    return router.push({
      pathname: '/explore',
    });
  };

  return (
    <Box className={styles.topBar}>
      <Typography variant="p" fontSize={14} className={styles.info}>
        Showing Results {search_by && `for "${search_by}"`}{' '}
        {selected_filters && selected_filters.length > 0 && ' in'}
      </Typography>
      <Box className={styles.chips}>
        {selected_filters.map((filter, i) => (
          <Chip
            size="small"
            className={styles.chip}
            key={i}
            label={filter.displayName}
            onDelete={() => handleDelete(filter)}
          />
        ))}
      </Box>
      <Button onClick={handleClear} className={styles.clear} variant="text">
        Clear All
      </Button>
    </Box>
  );
};

export default FilterIndicator;
