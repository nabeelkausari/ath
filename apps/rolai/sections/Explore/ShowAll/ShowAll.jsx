import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CheckBox from '../../../components/CheckBox/CheckBox';
import DialogView from '../../../components/DialogView/DialogView';
import { hideFiltersDialog } from '../../../store/global/actions';
import {
  formatFilterOptions,
  updateQueryParams,
} from '../ExploreFilter/ExploreFilter';
import useStyles from './ShowAll.styles';

const ShowAll = ({ filterKey, title }) => {
  const styles = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const [queryParams, setQueryParams] = useState(null);
  const [options, setOptions] = useState([]);
  const { query } = router;
  const { explore_all, explore_all_succeeded } = useSelector(
    (state) => state.explore
  );
  const { is_filters_dialog_open } = useSelector((state) => state.global);
  const handleClose = () => {
    dispatch(hideFiltersDialog());
  };
  const half = Math.ceil(options?.length / 2);

  useEffect(() => {
    if (query && Object.keys(query).length > 0) {
      setQueryParams(query);
    }
  }, [JSON.stringify(query)]);

  useEffect(() => {
    if (explore_all_succeeded) {
      setOptions(
        formatFilterOptions(
          explore_all?.filters?.find((f) => f.key === filterKey)?.types || []
        )
      );
    }
  }, [explore_all_succeeded, filterKey]);

  const yesButton = {
    text: 'Apply',
    onClick: () => {
      return router.push({
        pathname: '/explore',
        query: queryParams,
      });
    },
  };
  const noButton = {
    text: 'Close',
    onClick: () => {
      setQueryParams(query);
      setOptions(
        formatFilterOptions(
          explore_all?.filters?.find((f) => f.key === filterKey)?.types || []
        )
      );
      return true;
    },
  };
  const headerButton = {
    text: 'Clear All',
    onClick: () => {
      const { ...queryCopy } = query;
      delete queryCopy[filterKey];

      const updatedOptions = options.map((o) => ({
        ...o,
        value: false,
      }));
      setQueryParams(queryCopy);
      setOptions(updatedOptions);
    },
  };

  const handleChange = (e) => {
    const updatedParams = updateQueryParams(
      queryParams,
      e.target.id,
      filterKey
    );
    const updatedOptions = options.map((o) => ({
      ...o,
      value: e.target.id === o.type ? e.target.checked : o.value,
    }));
    setQueryParams(updatedParams);
    setOptions(updatedOptions);
  };

  return (
    <DialogView
      hide_header={false}
      hide_footer={false}
      yesButton={yesButton}
      noButton={noButton}
      headerButton={headerButton}
      dialog_options={{ title }}
      is_dialog_open={is_filters_dialog_open}
      hideDialog={handleClose}
      size="large"
    >
      <Box className={styles.checkboxFilterSubSection}>
        <Box flex={1}>
          <CheckBox
            options={[...options.slice(0, half)]}
            onChange={handleChange}
          />
        </Box>
        <Box flex={1}>
          <CheckBox
            options={[...options.slice(half)]}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </DialogView>
  );
};

export default ShowAll;
