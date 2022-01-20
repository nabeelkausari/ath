import Box from '@mui/material/Box';
import React, { Component, useEffect, useState } from 'react';
import moment from 'moment';
import useStyles from './LeftSectionCalendar.styles';
import {
  eventTypes,
  getDaysInMonth,
  weekdays,
} from '../../../../utils/helpers/calendar';
import CalendarDatePicker from '../CalendarDatePicker/CalendarDatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { CheckBox, DateNavigation } from '../CommonComponents/CommonComponents';
import {
  setCalendarFilter,
  setCalendarSelected,
} from '../../../../store/calendar/actions';

const LeftSectionCalendar = () => {
  const styles = useStyles();
  const { selected, filter } = useSelector((state) => state.calendar);
  const [date, setDate] = useState(selected.date);
  const dispatch = useDispatch();

  const onNavigate = (incr) => {
    setDate(moment(date).add(incr, 'month'));
  };
  const onDateChange = (date) => {
    dispatch(setCalendarSelected({ date }));
  };
  useEffect(() => {
    setDate(selected.date);
  }, [selected.date]);

  const onChangeFilter = (obj, index) => {
    dispatch(
      setCalendarFilter({
        types: filter.types.map((i, k) => (index == k ? obj : i)),
      })
    );
  };
  return (
    <Box className={styles.parent}>
      <Box className={styles.calendar}>
        <CalendarDatePicker
          date={date}
          onDateChange={onDateChange}
          onNavigate={onNavigate}
          selectedDate={selected.date}
        />
      </Box>
      <Box className={styles.filter}>
        <Box className={styles.heading}>My Calendar</Box>
        {filter.types.map((type, index) => (
          <CheckBox
            key={index}
            onChange={(obj) => onChangeFilter(obj, index)}
            data={type}
          />
        ))}
      </Box>
    </Box>
  );
};

export default LeftSectionCalendar;
