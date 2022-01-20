import Box from '@mui/material/Box';
import React, { Component } from 'react';
import {
  getDateText,
  getDaysInMonth,
  isDatesEqual,
  weekdays,
} from '../../../../utils/helpers/calendar';
import moment from 'moment';
import useStyles from './CalendarDatePicker.styles';
import { DateNavigation } from '../CommonComponents/CommonComponents';
import cx from 'classnames';
const CalendarDatePicker = ({
  date,
  onNavigate,
  onDateChange,
  selectedDate,
  minDate,
  maxDate,
  yearNavigation,
}) => {
  const styles = useStyles();

  return (
    <Box className={styles.calendarPicker}>
      <DateNavigation
        yearNavigation={yearNavigation}
        onChange={onNavigate}
        text={getDateText({ date })}
        className={cx(['date-navigation', styles.dateNavigation])}
      />
      <Box className={styles.days}>
        {weekdays.map((i, k) => (
          <span key={k} className={styles.block}>
            {i}
          </span>
        ))}
      </Box>
      <Box className={styles.dates}>
        {getDaysInMonth(date).map((i, k) => {
          const disabled =
            (minDate
              ? moment(i.date).isBefore(minDate) &&
                !isDatesEqual(i.date, minDate)
              : false) ||
            (maxDate
              ? moment(i.date).isAfter(maxDate) &&
                !isDatesEqual(i.date, maxDate)
              : false);
          return (
            <span
              onClick={() => !disabled && onDateChange(i.date)}
              className={cx([
                styles.block,
                isDatesEqual(selectedDate, i.date) && styles.selectedDate,
              ])}
              key={k}
              style={{
                color: i.active && !disabled ? 'black' : 'grey',
                cursor: disabled ? 'not-allowed' : 'pointer',
              }}
            >
              <span>{moment(i.date).format('DD')}</span>
            </span>
          );
        })}
      </Box>
    </Box>
  );
};

export default CalendarDatePicker;
