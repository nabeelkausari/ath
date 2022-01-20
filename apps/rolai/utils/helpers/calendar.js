import moment from 'moment';
import { PALETTE_PRIMARY_MAIN } from '../../config/theme';
export const getDaysInMonth = (date) => {
  let initMonth = date.month();
  let startDate = moment(date).set({
    date: 1,
    day: 0,
  });
  let allDates = new Array(42).fill('').map((v, i) => {
    let date = moment(startDate).add({ day: i });
    return {
      date,
      day: date.day(),
      active: date.month() === initMonth,
    };
  });

  return allDates.some((i, k) => k > 7 && !i.active && i.date.day() == 0)
    ? allDates.slice(0, 35)
    : allDates;
};

export const getDaysInWeek = (date) => {
  let startDate = moment(date).set({
    day: 0,
  });
  return new Array(7).fill('').map((v, i) => {
    let date = moment(startDate).add({ day: i });
    return {
      date,
      day: date.day(),
      active: true,
    };
  });
};

export const changeSelectedDate = (selected, incr) => {
  let activeDays = selected.range.filter(
    (i) => i.active == undefined || i.active == true
  );
  let activeDay =
    incr == 1
      ? moment(activeDays[activeDays.length - 1].date)
      : moment(activeDays[0].date);

  return getFirstDate(selected.type, activeDay, incr);
};

const getFirstDate = (type, activeDay, incr) => {
  switch (type) {
    case 'month':
      return moment(activeDay).set({
        month: activeDay.month() + incr,
        date: 1,
      });
    case 'week':
      return moment(activeDay).set({
        week: activeDay.week() + incr,
        day: 0,
      });
    case 'work':
      return moment(activeDay).set({
        week: activeDay.week() + incr,
        day: 1,
      });
    default:
      return moment(activeDay).set({
        date: activeDay.date() + incr,
      });
  }
};

export const getSelectedRange = ({ type, date }) => {
  switch (type) {
    case 'month':
      return getDaysInMonth(date);
    case 'week':
      return getDaysInWeek(date);
    case 'work':
      return getDaysInWeek(date);
    default:
      return [{ date, active: true }];
  }
};

export const isDatesEqual = (date1, date2) =>
  date1.format('DD/MM/YYYY') == date2.format('DD/MM/YYYY');

export const getCustomStyle = ({ index, selected, date, week }) => {
  switch (selected.type) {
    case 'month':
      return {
        width: 'calc(100% / 7)',
        height: date ? '170px' : '30px',
      };
    case 'week':
      return {
        width: 'calc(100% / 7)',
        height: date ? 'initial' : '75px',
        borderBottom: !date && '1px solid #E6E7EB',
      };
    case 'work':
      return {
        width: 'calc(100% / 5)',
        height: date ? 'initial' : '75px',
        borderBottom: !date && '1px solid #E6E7EB',

        display:
          selected.type == 'work' && (index === 0 || index == 6)
            ? 'none'
            : 'block',
      };
    default:
      return {
        width: 'calc(100%)',
        height: date ? 'initial' : '75px',
        borderBottom: !date && '1px solid #E6E7EB',

        display: selected.date.day() == index || date ? 'block' : 'none',
      };
  }
};

export const getDateText = ({ type, range, date }) => {
  switch (type) {
    case 'day':
      return date.format('DD MMM YYYY');
    case 'work':
      return range[5] && range[1]
        ? `${range[1].date.format('MMM DD')} - ${range[5].date.format(
            'MMM DD'
          )}`
        : '';
    case 'week':
      return range[0] && range[6]
        ? `${range[0].date.format('MMM DD')} - ${range[6].date.format(
            'MMM DD'
          )}`
        : '';
    case 'month':
      return date.format('MMM YYYY');

    default:
      return date.format('MMMM YYYY');
  }
};
export const getDispalyDate = (selected, index) => {
  if (selected.range[0] && selected.type == 'day')
    return selected.range[0].date;
  else if (selected.range[index]) return selected.range[index].date;
  else return moment();
};

export const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const viewTypes = ['month', 'week', 'work', 'day'];

export const eventTypes = [
  {
    type: 'ADMIN',
    label: 'Admin Task',
    checked: true,
    color: PALETTE_PRIMARY_MAIN,
    background: '#DDE0FA',
  },
  {
    type: 'COURSE',
    label: 'Course Task',
    checked: true,
    color: '#BF0D6D',
    background: '#F0CEE1',
  },
  {
    type: 'PROJECT',
    label: 'Projects Task',
    checked: true,
    color: '#BFA10D',
    background: '#FEF1B4',
  },
];

export const getEventPositionStyle = (start, end, events, id) => {
  let begin = moment(start).set({ minutes: 0, hour: 0, seconds: 0 });

  let num = events.filter(
    (i, k) =>
      moment(i.start_time, BACKEND_DF).format('hh-mm') ==
      moment(start).format('hh-mm')
  );

  let index = num ? num.findIndex((i) => i.id == id) : 1;

  return {
    height: `${(end.diff(start, 'minutes') / 60) * HEIGHT_HOUR_BLOCK}px`,
    marginTop: `${(start.diff(begin, 'minutes') / 60) * HEIGHT_HOUR_BLOCK}px`,
    width: `calc(100% / ${num.length})`,
    marginLeft: `calc(${(100 / num.length) * index}%)`,
  };
};

export const getEventTypeStyle = (type) => {
  let { background, color } = eventTypes.find((i) => i.type == type);
  return {
    background,
    borderLeft: `6px solid ${color}`,
    borderTop: `1px solid ${color}33`,
    borderBottom: `1px solid ${color}33`,
    borderRight: `1px solid ${color}33`,
  };
};

export const HHMMAA = 'hh-mm-AA';
export const DDMMYYYY = 'DD-MM-YYYY';
export const YYYYMMDD = 'YYYY-MM-DD';
export const BACKEND_DF = 'YYYY-MM-DD HH:mm:ss';
export const HEIGHT_HOUR_BLOCK = 100;
let beginDate = moment().set({ hour: 0, minutes: 0 });
export const hours = new Array(24)
  .fill('')
  .map((i, k) => moment(beginDate).add({ hour: k }).format('h A'));

export const HOURS_DROPDOWN = new Array(24 * 4).fill('').map((i, k) =>
  moment(beginDate)
    .add({ minutes: k * 15 })
    .format('hh:mm A')
);

export const REMINDER_DROPDOWN = new Array(10)
  .fill('')
  .map((i, k) => ({ label: `${k + 1} hour`, value: k + 1 }));
