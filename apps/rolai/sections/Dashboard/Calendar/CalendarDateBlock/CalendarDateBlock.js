import Box from '@mui/material/Box';
import React, { Component, useState } from 'react';
import moment from 'moment';

import useStyles from './CalendarDateBlock.styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  BACKEND_DF,
  DDMMYYYY,
  eventTypes,
  getEventPositionStyle,
  getEventTypeStyle,
  hours,
  isDatesEqual,
  YYYYMMDD,
} from '../../../../utils/helpers/calendar';
import cx from 'classnames';
import {
  setCalendarPopper,
  setCalendarSelected,
} from '../../../../store/calendar/actions';
import { Avatar, AvatarGroup, Popper } from '@mui/material';
import CreateEvent from '../CreateEvent/CreateEvent';
import Image from 'next/image';
import { AvatarGroupComp } from '../CommonComponents/CommonComponents';

const CalendarDateBlock = ({ date }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { selected, calendar_events, popper, filter } = useSelector(
    (state) => state.calendar
  );
  const disabled =
    moment(date).isBefore(moment()) && !isDatesEqual(date, moment());

  const events =
    calendar_events[date.format(YYYYMMDD)] &&
    calendar_events[date.format(YYYYMMDD)].filter((event, k) =>
      filter.types
        .filter((i, k) => i.checked == true)
        .map((i) => i.type)
        .includes(event.item_type)
    );
  const changeTypeToDay = (date) => {
    dispatch(setCalendarSelected({ date, type: 'day' }));
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

  const openPopperDetails = (anchorEl, data) => {
    dispatch(
      setCalendarPopper({
        anchorEl,
        type: 'DETAILS',
        opened: popper.opened ? false : true,
        data,
      })
    );
  };
  if (selected.type == 'month') {
    const moreEvents = events && events.slice(3, events.length);

    return (
      <Box className={styles.month}>
        <Box
          className={cx([
            styles.date,
            isDatesEqual(date, selected.date) && styles.selectedDate,
          ])}
        >
          <span
            onClick={(event) => {
              changeTypeToDay(date);
            }}
          >
            {moment(date).format('DD')}
          </span>
        </Box>
        <Box
          className={styles.eventWrapper}
          onClick={(event) => {
            if (disabled) return;
            openPopper(event.currentTarget, { date });
            event.stopPropagation();
          }}
        >
          {events &&
            events
              .filter((i, k) => k < 3)
              .map((i, k) => (
                <Box
                  key={k}
                  style={{
                    ...getEventTypeStyle(i.item_type || 'PROJECT'),
                  }}
                  onClick={(event) => {
                    openPopperDetails(event.currentTarget, {
                      ...i,
                    });
                    event.stopPropagation();
                  }}
                  className={styles.monthEvent}
                >
                  <Box className={styles.title}>{i.title}</Box>
                </Box>
              ))}
          {moreEvents && moreEvents[0] && (
            <Box
              className={styles.more}
              onClick={(e) => {
                changeTypeToDay(date);
                e.stopPropagation();
              }}
            >
              +{moreEvents.length} more
            </Box>
          )}
        </Box>
      </Box>
    );
  } else {
    return (
      <Box className={styles.week}>
        <Box className={styles.hours}>
          {hours.map((hour, k) => (
            <Box
              key={k}
              className={styles.block}
              onClick={(event) => {
                if (
                  disabled ||
                  (isDatesEqual(moment(), date) &&
                    moment(hour, 'h A').isSameOrBefore(moment(moment(), 'h A')))
                )
                  return;

                openPopper(event.currentTarget.firstChild, {
                  date,
                  startTime: moment(hour, 'h A').format('hh:mm A'),
                  endTime: moment(hour, 'h A')
                    .add(30, 'minutes')
                    .format('hh:mm A'),
                });
                event.stopPropagation();
              }}
            >
              <Box
                width={selected.type == 'day' ? '30%' : '30%'}
                height="100%"
              ></Box>
            </Box>
          ))}
        </Box>
        <Box className={styles.events}>
          {events &&
            events[0] &&
            events.map((i, k) => (
              <Box
                key={k}
                style={{
                  ...getEventPositionStyle(
                    moment(i.start_time, BACKEND_DF),
                    moment(i.end_time, BACKEND_DF),
                    events,
                    i.id
                  ),
                  ...getEventTypeStyle(i.item_type || 'PROJECT'),
                }}
                className={styles.event}
                onClick={(event) => {
                  openPopperDetails(event.currentTarget, {
                    ...i,
                  });
                  event.stopPropagation();
                }}
              >
                <Box display="flex">
                  <Box flex={1}>
                    <Box className={styles.title}>{i.title}</Box>
                    {selected.type == 'day' && (
                      <Box className={styles.course}>{i.item_title}</Box>
                    )}
                  </Box>
                  {selected.type == 'day' && i.user_ids && i.user_ids[0] && (
                    <AvatarGroupComp user_ids={i.user_ids} />
                  )}
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    );
  }
};

export default CalendarDateBlock;
