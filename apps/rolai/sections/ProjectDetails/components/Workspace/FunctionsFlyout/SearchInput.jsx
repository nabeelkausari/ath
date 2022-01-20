import InputBase from '@mui/material/InputBase';
import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import cx from 'classnames';
import Image from 'next/image';
import React from 'react';

import search from '../../../../../assets/icons/search.svg';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: 10,
    border: '1px solid #B0C0D2',
    backgroundColor: alpha(theme.palette.common.white, 0.85),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 1),
    },
    marginBottom: theme.spacing(2),
    width: '100%',
    height: '32px',
    '& .MuiInputBase-root': {
      width: '100%',
    },
  },
  searchIconWrapper: {
    padding: theme.spacing(0, 1.5),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputBase: {
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(0.75, 0.75, 0.75, 0),
      fontSize: '14px',
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(2.5)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      flex: 1,
    },
  },
}));

const SearchInput = ({ className = '', ...props }) => {
  const styles = useStyles();
  return (
    <div className={cx([styles.search, className])}>
      <div className={styles.searchIconWrapper}>
        <Image src={search} width={12} height={12} />
      </div>
      <InputBase
        className={styles.searchInputBase}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        {...props}
      />
    </div>
  );
};

export default SearchInput;
