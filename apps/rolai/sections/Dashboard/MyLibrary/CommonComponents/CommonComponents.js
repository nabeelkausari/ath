import { InputBase, Menu } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import React, { Component, useState } from 'react';

import BookmarkIcon from '../../../../assets/Dashboard/My-Library/bookmark.svg';
import SearchIcon from '../../../../assets/Dashboard/My-Library/bookmark.svg';
import VideoIcon from '../../../../assets/Dashboard/My-Library/Documents.svg';
import FilterIcon from '../../../../assets/Dashboard/My-Library/filter.svg';
import search from '../../../../assets/icons/search.svg';
import ClickOnOutside from '../../../../components/ClickOnOutside/ClickOnOutside';
import PopperComp from '../../../../components/Popper/Popper';
import CardChip from '../../Components/CardChip/Chip';
import {
  useBookmarkStyles,
  useCourseStyles,
  useFilterStyles,
  useHeaderStyles,
  useSearchStyles,
} from './CommonComponents.styles';
export const FilterBar = ({
  heading,
  filterData = {},
  setFilterData,
  filterItems,
  filter,
}) => {
  const styles = useFilterStyles();

  return (
    <Box className={styles.parent}>
      <Box className={styles.heading}>{heading}</Box>
      {filter && (
        <Box className={styles.filterIcon}>
          <Image
            src={FilterIcon}
            onClick={(e) => {
              setFilterData({
                ...filterData,
                opened: true,
                anchorEl: e.currentTarget,
              });
            }}
          />
        </Box>
      )}
      <Menu
        className={styles.filterBody}
        id="filter-menu"
        anchorEl={filterData.anchorEl}
        open={filterData.opened}
        transformOrigin={{ horizontal: 340, vertical: -10 }}
        onClose={() =>
          setFilterData({
            ...filterData,
            opened: !filterData.opened,
          })
        }
      >
        <Box className={styles.filterHeading}>Type</Box>
        {filterData.items.map((item, k) => (
          <div
            key={k}
            className={filterData.selected === item && styles.filterSelected}
            onClick={() => setFilterData({ ...filterData, selected: item })}
          >
            {filterItems[item]?.name || item}
          </div>
        ))}
      </Menu>
    </Box>
  );
};

export const HeaderBar = ({ heading, count, icon }) => {
  const styles = useHeaderStyles();
  return (
    <Box className={styles.parent}>
      <Image src={icon} />

      <Box className={styles.heading}>{heading}</Box>
      <Box className={styles.badge}>{count}</Box>
    </Box>
  );
};

export const CourseTitleComponent = ({ heading, value, onChange, type }) => {
  const styles = useCourseStyles();
  return (
    <Box className={styles.parent}>
      <CardChip name={type} />
      <Box className={styles.title}>
        <Box className={styles.heading}>{heading}</Box>
        <SearchBar value={value} onChange={onChange} />
      </Box>
    </Box>
  );
};

export const SearchBar = ({ value, onChange }) => {
  const styles = useSearchStyles();
  return (
    <Box className={styles.search}>
      <Box className={styles.searchIconWrapper}>
        <Image src={search} width={12} height={12} />
      </Box>
      <InputBase
        value={value}
        onChange={onChange}
        className={styles.searchInputBase}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Box>
  );
};

export const BookmarkComponent = ({ count }) => {
  const styles = useBookmarkStyles();
  return (
    <Box className={styles.parent}>
      <Box className={styles.bookmarkIcon}>
        <Image src={BookmarkIcon} />
      </Box>
      <Box className={styles.count}>{count}</Box>
    </Box>
  );
};
