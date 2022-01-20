import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../components/Button/Button';
import CheckBox from '../../../components/CheckBox/CheckBox';
import { getExploreAllData, searchData } from '../../../store/explore/actions';
import { showFiltersDialog } from '../../../store/global/actions';
import ShowAll from '../ShowAll/ShowAll';
import useStyles from './ExploreFilter.styles';

export const formatFilterOptions = (options) =>
  options.map(({ selected, displayName, ...t }) => ({
    ...t,
    value: selected,
    label: displayName,
  }));

export const updateQueryParams = (query, value, key) => {
  let _filters = query && query[key] ? query[key].split('|') : [];
  _filters = _filters.includes(value)
    ? _filters.filter((id) => id !== value)
    : [...new Set([..._filters, value])];

  const queryParams = { ...query, [key]: _filters.join('|') };
  if (_filters.length === 0) {
    delete queryParams[key];
  }
  return queryParams;
};

export const updateSearchParams = (query, value) => {
  const key = 'searchTag';
  const queryParams = { ...query, [key]: value };
  if (value === '') {
    delete queryParams[key];
  }
  return queryParams;
};

const ExploreFilter = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;
  const MAX_FILTERS = 6;
  const [showAllKey, setShowAllKey] = useState(null);
  const [showAllTitle, setShowAllTitle] = useState('Filter');
  const [search, setSearch] = useState('');
  const { my_profile_succeeded } = useSelector((state) => state.auth);
  const { explore_all, search_by } = useSelector((state) => state.explore);

  const handleModalOpen = ({ title, key }) => {
    setShowAllKey(key);
    setShowAllTitle(title);
    dispatch(showFiltersDialog());
  };

  useEffect(() => {
    setSearch(search_by);
  }, [search_by]);

  useEffect(() => {
    dispatch(searchData(query?.searchTag ? decodeURI(query.searchTag) : ''));
  }, [query?.searchTag]);

  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getExploreAllData(query));
    }
  }, [JSON.stringify(query), my_profile_succeeded]);

  const handleChange = (e, key) => {
    const queryParams = updateQueryParams(query, e.target.id, key);
    return router.push({
      pathname: '/explore',
      query: queryParams,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = updateSearchParams(query, encodeURI(search));
    return router.push({
      pathname: '/explore',
      query: queryParams,
    });
  };

  return (
    <>
      <div className={styles.exploreContainer}>
        <Box>
          <Typography variant="subtitle1">Search</Typography>
          <form onSubmit={handleSearch} className={styles.searchContainer}>
            <SearchIcon
              color="disabled"
              fontSize="small"
              className={styles.searchIcon}
            />
            <DebounceInput
              minLength={2}
              value={search}
              debounceTimeout={300}
              className={styles.searchInput}
              placeholder="Search by keyword"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit" className={styles.searchButton}>
              Search
            </Button>
          </form>
        </Box>
        {explore_all?.filters &&
          explore_all.filters.length > 0 &&
          explore_all.filters.map((filter, i) => {
            const options = formatFilterOptions(filter.types);
            if (filter.types.length === 0) return null;
            return (
              <Box key={i} className={styles.checkboxFilterSubSection}>
                <Typography
                  variant="subtitle2"
                  className={styles.categoryTitle}
                >
                  {filter.title}
                </Typography>
                <CheckBox
                  onChange={(e) => handleChange(e, filter.key)}
                  options={options.slice(0, MAX_FILTERS)}
                />
                {filter.types.length > MAX_FILTERS && (
                  <Button
                    variant="text"
                    onClick={() =>
                      handleModalOpen({
                        title: filter.title,
                        options,
                        key: filter.key,
                      })
                    }
                    className={styles.showAll}
                  >
                    Show All
                  </Button>
                )}
              </Box>
            );
          })}
      </div>
      <ShowAll filterKey={showAllKey} title={showAllTitle} />
    </>
  );
};

export default ExploreFilter;
