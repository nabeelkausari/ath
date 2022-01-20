import Box from '@mui/material/Box';
import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BACKEND_DF, YYYYMMDD } from '../../../../utils/helpers/calendar';
import { Badge, EventDetailsData } from '../EventDetails/EventDetails';
import moment from 'moment';
import useStyles from './SearchResults.styles';
import { getEventDetails } from '../../../../store/calendar/actions';
import cx from 'classnames';
import Image from 'next/image';
import {
  SearchBlankImg,
  SelectBlankImg,
} from '../../../../assets/Dashboard/EmptyScreens';
import CardSkeleton from '../../CardSkeleton/CardSkeleton';
const SearchResults = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState({});
  const {
    edit_event_success,
    calendar_search_events,
    delete_event_success,
    searchFilter,
    calendar_search_events_requested,
    refreshRequired,
  } = useSelector((state) => state.calendar);

  const getEvDetails = (event) => {
    dispatch(getEventDetails(event._links.get_calendar_event_details_by_id));
  };

  useEffect(() => {
    if (selected.id) {
      getEvDetails(selected);
    }
  }, [selected, refreshRequired]);

  useEffect(() => {
    setSelected({});
  }, [searchFilter]);

  return (
    <Box className={styles.parent}>
      <Box className={styles.left}>
        <Box className={styles.title}>Results</Box>
        {calendar_search_events_requested ? (
          <Box>
            <CardSkeleton cards={5} sx={{ padding: 2 }} />
          </Box>
        ) : Object.keys(calendar_search_events).length > 0 ? (
          Object.keys(calendar_search_events).map((month, k) => {
            const monthEvents = calendar_search_events[month];
            return (
              <Box key={k}>
                <Box className={styles.monthTitle}>
                  {moment(month, YYYYMMDD).format('MMM YYYY')}
                </Box>
                {monthEvents &&
                  monthEvents[0] &&
                  monthEvents.map((event, k) => (
                    <EventBlock
                      key={k}
                      event={event}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  ))}
              </Box>
            );
          })
        ) : (
          <Box className={styles.blank}>
            <Image src={SearchBlankImg} />
            <Box sx={{ opacity: 0.7 }}>{"We didn't find anything"}</Box>
          </Box>
        )}
      </Box>
      <Box className={styles.right}>
        {selected.id ? (
          <EventDetailsData />
        ) : (
          Object.keys(calendar_search_events).length > 0 && (
            <Box className={styles.blank}>
              <Image src={SelectBlankImg} />
              <Box mt={2} sx={{ opacity: 0.7 }}>
                Select an event to view
              </Box>
            </Box>
          )
        )}
      </Box>
    </Box>
  );
};

export default SearchResults;

const EventBlock = ({ event, selected = {}, setSelected }) => {
  const styles = useStyles();

  return (
    <Box
      className={cx([styles.event, selected.id == event.id && styles.selected])}
      onClick={() => setSelected(event)}
    >
      <Box display="flex">
        <Box className={styles.date}>
          <Box>{moment(event.start_time, BACKEND_DF).format('DD')}</Box>
          <Box>{moment(event.start_time, BACKEND_DF).format('ddd')}</Box>
        </Box>
        <Box className={styles.details}>
          <Box>{event.title}</Box>
          <Box>{event.item_title}</Box>
          <Box>
            {moment(event.start_time, BACKEND_DF).format('hh:mm A')} -{' '}
            {moment(event.end_time, BACKEND_DF).format('hh:mm A')}
          </Box>
        </Box>
      </Box>
      <Box className={styles.type}>
        <Badge type={event.item_type} />
      </Box>
    </Box>
  );
};
