import Box from '@mui/material/Box';
import cx from 'classnames';
import moment from 'moment';
import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from 'react-transition-group';

import {
  getCalendarEvents,
  setCalendarPopper,
  setCalendarSelected,
} from '../../../../store/calendar/actions';
import {
  getCustomStyle,
  getDispalyDate,
  getSelectedRange,
  hours,
  isDatesEqual,
  weekdays,
} from '../../../../utils/helpers/calendar';
import CalendarDateBlock from '../CalendarDateBlock/CalendarDateBlock';
import CreateEvent from '../CreateEvent/CreateEvent';
import EventDetails from '../EventDetails/EventDetails';
import SearchResults from '../SearchResults/SearchResults';
import SelectionBar from '../SelectionBar/SelectionBar';
import useStyles from './RightSectionCalendar.styles';
const RightSectionCalendar = () => {
  const styles = useStyles();
  const {
    selected,
    popper,
    create_event_succeeded,
    searchFilter,
    edit_event_success,
    delete_event_success,
    refreshRequired,
  } = useSelector((state) => state.calendar);
  const [direction, setDirection] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    let range = getSelectedRange(selected);
    dispatch(setCalendarSelected({ range }));
    dispatch(
      getCalendarEvents({
        startDate: range[0].date.format('YYYY-MM-DD'),
        endDate: range[range.length - 1].date.format('YYYY-MM-DD'),
      })
    );
  }, [selected.date, selected.type]);

  useEffect(() => {
    dispatch(setCalendarPopper({ opened: false }));

    if (refreshRequired && !searchFilter.searchView) {
      dispatch(
        getCalendarEvents({
          startDate: selected.range[0].date.format('YYYY-MM-DD'),
          endDate:
            selected.range[selected.range.length - 1].date.format('YYYY-MM-DD'),
        })
      );
    }
  }, [refreshRequired]);

  const changeTypeToDay = (date) => {
    dispatch(setCalendarSelected({ date, type: 'day' }));
  };

  // useScrollDirection((val) => setDirection(val));

  // useEffect(() => {
  //   if (direction)
  //     dispatch(
  //       setCalendarSelected({
  //         date: changeSelectedDate(selected, direction),
  //         animDirection: direction,
  //       })
  //     );
  // }, [direction]);

  return (
    <Box className={styles.parent}>
      {popper.opened && popper.type == 'NEW_EVENT' && <CreateEvent />}
      {popper.opened && popper.type == 'EDIT_EVENT' && (
        <CreateEvent edit={true} />
      )}
      {popper.opened && popper.type == 'DETAILS' && <EventDetails />}
      <SelectionBar />

      {searchFilter.searchView ? (
        <SearchResults />
      ) : (
        <Box className={styles.container} id="calendar-scroll">
          <SwitchTransition>
            <CSSTransition
              key={selected.range[0] && selected.range[0].date}
              addEndListener={(node, done) => {
                node.addEventListener('transitionend', done, false);
              }}
              classNames={
                selected.animDirection == 1
                  ? styles.animateLeft
                  : styles.animateRight
              }
            >
              <Box display="flex">
                {selected.type == 'month' ? (
                  <MonthView selected={selected} />
                ) : (
                  <OtherView
                    selected={selected}
                    changeTypeToDay={changeTypeToDay}
                  />
                )}
              </Box>
            </CSSTransition>
          </SwitchTransition>
        </Box>
      )}
    </Box>
  );
};

export default RightSectionCalendar;

const MonthView = ({ selected, openPopper }) => {
  const styles = useStyles();

  return (
    <Box className={styles.calendar}>
      <Box className={styles.topWrapper}>
        <Box className={styles.days}>
          {weekdays.map((i, k) => (
            <div
              key={k}
              className={styles.block}
              style={{
                ...getCustomStyle({ index: k, selected }),
              }}
            >
              {i}
            </div>
          ))}
        </Box>
      </Box>
      <Box className={styles.wrapper}>
        <Box className={styles.dates}>
          {selected.range.map((i, k) => (
            <Box
              // onClick={() => onDateChange(i.date)}
              className={styles.block}
              key={i.date}
              style={{
                color: i.active ? 'black' : 'grey',
                ...getCustomStyle({ index: k, selected, date: true }),
              }}
            >
              <CalendarDateBlock date={i.date} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const OtherView = ({ selected, changeTypeToDay, openPopper }) => {
  const styles = useStyles();
  return (
    <Box className={styles.calendar}>
      <Box className={styles.topWrapper}>
        <Box className={styles.empty}></Box>
        <Box className={styles.days}>
          {weekdays.map((i, k) => (
            <div
              key={k}
              className={styles.block}
              style={{
                ...getCustomStyle({ index: k, selected, week: true }),
              }}
            >
              <Box>{i}</Box>

              <Box
                className={cx([
                  styles.topDate,
                  isDatesEqual(getDispalyDate(selected, k), selected.date) &&
                    styles.selectedDate,
                ])}
              >
                <span
                  onClick={() => changeTypeToDay(getDispalyDate(selected, k))}
                >
                  {getDispalyDate(selected, k).format('DD')}
                </span>
              </Box>
            </div>
          ))}
        </Box>
      </Box>
      <Box className={styles.weekWrapper}>
        <Box className={styles.hours}>
          {hours.map((i, k) => (
            <Box key={k}>{i}</Box>
          ))}
        </Box>

        <Box className={styles.dates}>
          {selected.range.map((i, k) => (
            <Box
              // onClick={() => onDateChange(i.date)}
              className={styles.block}
              key={i.date}
              style={{
                color: i.active ? 'black' : 'grey',
                ...getCustomStyle({ index: k, selected, date: true }),
              }}
            >
              <CalendarDateBlock date={i.date} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
