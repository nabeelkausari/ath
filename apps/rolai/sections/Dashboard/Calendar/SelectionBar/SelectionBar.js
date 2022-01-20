import Box from '@mui/material/Box';
import React, { Component, useEffect, useState } from 'react';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import Image from 'next/image';
import useStyles from './SelectionBar.styles';
import { searchIcon } from '../../../../common/images';
import { Input, InputBase, MenuItem, Select } from '@mui/material';
import {
  changeSelectedDate,
  changeRange,
  getDaysInMonth,
  viewTypes,
  getDateText,
  BACKEND_DF,
  eventTypes,
  YYYYMMDD,
} from '../../../../utils/helpers/calendar';
import AddIcon from '@mui/icons-material/Add';
import Button from '../../../../components/Button/Button';

import {
  clearCalendarSearchEvents,
  getCalendarEvents,
  getCalendarSearchEvents,
  setCalendarPopper,
  setCalendarSearchFilter,
  setCalendarSelected,
} from '../../../../store/calendar/actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  DateNavigation,
  FilterBar,
} from '../CommonComponents/CommonComponents';
import cx from 'classnames';
import CloseIcon from '@mui/icons-material/Close';
import { DebounceInput } from 'react-debounce-input';
import { calendarIcon } from '../../../../assets/Dashboard/Calendar';

const SelectionBar = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { selected, popper, searchFilter, refreshRequired } = useSelector(
    (state) => state.calendar
  );
  const [menuOpened, setMenuOpened] = useState(false);

  const handleChange = (obj) => {
    dispatch(setCalendarSelected(obj));
  };
  const setSearchFilter = (data) => {
    dispatch(setCalendarSearchFilter(data));
  };
  useEffect(() => {
    let startDate = moment(searchFilter.from).format(YYYYMMDD);
    let endDate = moment(searchFilter.to).format(YYYYMMDD);

    searchFilter.searchView &&
      dispatch(getCalendarEvents({ startDate, endDate }));
  }, [refreshRequired]);

  const toggleMenuOpened = () => {
    setMenuOpened((opened) => !opened);
  };
  const openPopper = (anchorEl, data) => {
    dispatch(
      setCalendarPopper({
        anchorEl,
        type: 'NEW_EVENT',
        opened: popper.opened ? false : true,
        data,
      })
    );
  };

  const changeRange = (incr) => {
    dispatch(
      setCalendarSelected({
        date: changeSelectedDate(selected, incr),
        animDirection: incr,
      })
    );
  };

  useEffect(() => {
    searchFilter.searchText?.length > 1
      ? dispatch(getCalendarSearchEvents(searchFilter))
      : dispatch(clearCalendarSearchEvents());
  }, [
    searchFilter.searchText,
    searchFilter.type,
    searchFilter.from,
    searchFilter.to,
    refreshRequired,
  ]);

  return (
    <Box className={styles.parent}>
      {!searchFilter.expanded ? (
        <Box sx={{ position: 'absolute', left: 0 }}>
          <Box
            className={styles.today}
            onClick={() => handleChange({ date: moment() })}
          >
            <Box className={styles.calendarIcon}>
              <Image src={calendarIcon} />
            </Box>
            Today
          </Box>
          <Box className={styles.date}>
            <DateNavigation
              onChange={changeRange}
              text={getDateText(selected)}
            />
          </Box>
        </Box>
      ) : (
        <Box></Box>
      )}
      <Box>
        {searchFilter.expanded && (
          <Close
            onClick={() =>
              setSearchFilter({
                expanded: false,
                searchText: '',
                searchView: false,
              })
            }
          />
        )}
        <Search
          searchFilter={searchFilter}
          updateSearchFilter={setSearchFilter}
          dispatch={dispatch}
        />
        <Select
          open={menuOpened}
          classess
          className={styles.type}
          onOpen={toggleMenuOpened}
          onClose={toggleMenuOpened}
          value={selected?.type}
          onChange={(e) => handleChange({ type: e.target.value })}
          IconComponent={() => (
            <KeyboardArrowRightRoundedIcon onClick={toggleMenuOpened} />
          )}
        >
          {viewTypes.map((item, k) => (
            <MenuItem className={styles.menuItem} key={k} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>

        <Button
          onClick={(e) => {
            openPopper(undefined, {
              date: moment(),
            });
            e.stopPropagation();
          }}
          // variant={""}
          className={styles.create}
          // style={style}
        >
          <>
            <AddIcon style={{ marginRight: 5 }} />
            Create
          </>
        </Button>
      </Box>
    </Box>
  );
};

export default SelectionBar;

const Search = ({ searchFilter, updateSearchFilter, dispatch }) => {
  const styles = useStyles();
  const { expanded, type, searchText, items } = searchFilter;
  return (
    <Box
      className={cx([styles.search, expanded && styles.searchExpand])}
      onClick={() =>
        !expanded &&
        updateSearchFilter({ expanded: !expanded, searchView: false })
      }
    >
      <Box display={'flex'} alignItems="center">
        <Box display={'flex'} alignItems="center">
          <Image src={searchIcon} width={16} height={16} />
        </Box>
        {expanded && (
          <DebounceInput
            minLength={2}
            className={styles.searchInput}
            value={searchText}
            debounceTimeout={300}
            placeholder="Search"
            onChange={(e) => {
              updateSearchFilter({
                searchText: e.target.value,
                searchView: true,
              });
              // dispatch(getCalendarEvents())
            }}
          />
        )}
      </Box>
      {expanded && (
        <>
          <Close
            onClick={() =>
              updateSearchFilter({
                searchText: '',
                type: 'ALL',
                from: undefined,
                to: undefined,
              })
            }
          />
          <FilterBar
            filterData={searchFilter}
            setFilterData={updateSearchFilter}
          />
        </>
      )}
    </Box>
  );
};

export const Close = ({ onClick }) => {
  const styles = useStyles();

  return (
    <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }}>
      <CloseIcon
        style={{
          width: 20,
          height: 20,
          marginRight: -5,
          background: '#00000011',
          borderRadius: 10,
          fill: 'grey',
          padding: 2,
        }}
        onClick={onClick}
        className={styles.close}
      />
    </Box>
  );
};
