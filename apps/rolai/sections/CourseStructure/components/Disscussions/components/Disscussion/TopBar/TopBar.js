import { Button } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { commentPrimaryIcon } from '../../../../../../../assets/Dashboard/Inbox';
import { setDiscussionFilter } from '../../../../../../../store/discussions/actions';
import SortSelect, {
  discussionSortItems,
  FilterBar,
} from '../../../../../../Dashboard/Inbox/CommonComponents/CommonComponents';
import useStyles from './TopBar.styles';

const TopBar = ({ setOpened, opened }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { my_profile, my_profile_succeeded } = useSelector(
    (state) => state.auth
  );
  const { filterData } = useSelector((state) => state.discussions);
  const [filter, setFilter] = useState({});
  console.log(opened);
  useEffect(() => {
    setFilter(filterData);
  }, [filterData]);

  const apply = () => {
    dispatch(setDiscussionFilter({ ...filter, opened: false }));
  };

  const clear = () => {
    dispatch(
      setDiscussionFilter({
        module: undefined,
        lesson: undefined,
        opened: false,
      })
    );
  };
  const setSortBy = (val) => {
    dispatch(
      setDiscussionFilter({
        sortBy: val,
      })
    );
  };
  return (
    <Box className={styles.parent}>
      <Box display="flex">
        <Image src={commentPrimaryIcon} />
        <Box className={styles.heading}>Discussions</Box>
      </Box>
      <Box display="flex">
        <SortSelect
          value={filterData.sortBy || discussionSortItems[0]}
          onChange={setSortBy}
          items={discussionSortItems}
        />
        <FilterBar
          setFilterData={setFilter}
          filterData={filter}
          actions={{
            yesbtn: { text: 'Apply', onClick: apply },
            nobtn: { text: 'Clear', onClick: clear },
          }}
        />
        <Button
          variant={'contained'}
          onClick={setOpened}
          style={{ minWidth: '150px' }}
        >
          {opened ? 'Close Window' : 'Start Discussion'}
        </Button>
      </Box>
    </Box>
  );
};

export default TopBar;
