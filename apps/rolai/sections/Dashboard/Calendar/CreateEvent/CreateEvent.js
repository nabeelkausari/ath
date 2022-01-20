import MomentUtils from '@date-io/moment';
import CloseIcon from '@mui/icons-material/Close';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  FormControlLabel,
  Input,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import cx from 'classnames';
import moment from 'moment';
import Image from 'next/image';
import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MultiSelect, { components } from 'react-select';

import { calendarIcon, clockIcon } from '../../../../assets/Dashboard/Calendar';
import { droopdownIcon } from '../../../../assets/Dashboard/Inbox';
import avatar from '../../../../assets/icons/avatar.svg';
import Button from '../../../../components/Button/Button';
import ClickOnOutside from '../../../../components/ClickOnOutside/ClickOnOutside';
import PopperComp from '../../../../components/Popper/Popper';
import {
  createCalendarEvent,
  deleteCalendarEvent,
  getEventCourses,
  getEventProjects,
  getEventUsers,
  getProjectEventUsers,
  getTimezones,
  setCalendarPopper,
  updateCalendarEvent,
} from '../../../../store/calendar/actions';
import {
  HOURS_DROPDOWN,
  isDatesEqual,
  REMINDER_DROPDOWN,
} from '../../../../utils/helpers/calendar';
import { TIMEZONES } from '../../../../utils/helpers/timezone';
import CalendarDatePicker from '../CalendarDatePicker/CalendarDatePicker';
import useStyles from './CreateEvent.styles';
const CreateEvent = ({ anchorEl, open, setOpen, edit = false }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const onOutClick = () => {
    dispatch(setCalendarPopper({ opened: false }));
  };

  const { popper, timezones, event_courses_projects, event_users } =
    useSelector((state) => state.calendar);
  const [data, setData] = useState({
    date: moment(),
    type: 'COURSE',
    startTime: moment().add(1, 'hours').format('hh:00 A'),
    endTime: moment().add(2, 'hours').format('hh:00 A'),
    users: [],
    ...popper?.data,
  });

  const updateData = (key, value) => {
    const toUpdate = {
      users: key == 'typedata' || key == 'type' ? [] : data.users,
      typedata: key == 'type' ? undefined : data.typedata,
      [key]: value,
    };
    setData({ ...data, ...toUpdate });
  };

  const createEvent = () => {
    const { title, description } = data;
    const body = {
      title,
      description,
      eventItemType: data.type,
      itemId: data.typedata,
      startDate: `${data.date.format('yyyy-MM-DD')} ${moment(
        data.startTime,
        'hh:mm A'
      ).format('HH:mm:ss')}`,
      endDate: `${data.date.format('yyyy-MM-DD')} ${moment(
        data.endTime,
        'hh:mm A'
      ).format('HH:mm:ss')}`,
      reminderBefore: data.reminder * 60,
      userIds: data.users.map((i, k) => i.value),
      timeZone: data.timezone,
    };
    edit
      ? dispatch(
          updateCalendarEvent(popper.data._links.edit_calendar_by_id, body)
        )
      : dispatch(createCalendarEvent(body));
  };

  useEffect(() => {
    if (data.type == 'COURSE') dispatch(getEventCourses());
    else dispatch(getEventProjects());
  }, [data.type]);

  useEffect(() => {
    if (data.typedata && event_courses_projects[0]) {
      let link = {};
      if (data.type == 'COURSE') {
        link = event_courses_projects.find((i) => i.value == data.typedata)
          ?._links.enrolledUsersByCourseId;
        dispatch(getEventUsers(link));
      } else {
        link = event_courses_projects.find((i) => i.value == data.typedata)
          ?._links.get_existing_collaborators;
        dispatch(getProjectEventUsers(link));
      }
    }
  }, [data.typedata, event_courses_projects]);

  useEffect(() => {
    dispatch(getTimezones());
  }, []);

  useEffect(() => {
    if (
      event_users &&
      event_users[0] &&
      data.users &&
      data.users[0] &&
      !isNaN(data.users[0])
    )
      updateData(
        'users',
        event_users.filter((i, k) => data.users.includes(i.value))
      );
  }, [event_users]);

  const deleteEvent = () => {
    dispatch(
      deleteCalendarEvent(popper.data._links.delete_calendar_by_id, {
        id: popper.data.id,
        // date: data.date.format('yyyy-MM-DD'),
      })
    );
  };

  return (
    <ClickOnOutside onOutClick={onOutClick}>
      <PopperComp
        closePopup={onOutClick}
        anchorEl={popper.anchorEl}
        open={popper.opened}
        popperClass={styles.popperClass}
        arrow={true}
      >
        <Box className={styles.topBlock}>
          <Box className={styles.heading}>{edit ? 'Edit' : 'Create'} Task</Box>
          <Label>Task Title</Label>
          <Input
            className={styles.input}
            value={data.title}
            placeholder={'Enter Title'}
            onChange={(e) => updateData('title', e.target.value)}
          />
          <Label>Description</Label>
          <Input
            className={cx([styles.input, styles.textArea])}
            multiline={4}
            value={data.description}
            placeholder={"What's on your mind, Edgar?"}
            onChange={(e) => updateData('description', e.target.value)}
          />
          <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
            <FormControlLabel
              value="course"
              control={<Radio checked={data.type == 'COURSE'} />}
              label="Course"
              onChange={(e) => e.target.checked && updateData('type', 'COURSE')}
              classes={{ label: styles.radioLabel }}
            />
            <FormControlLabel
              value="project"
              control={<Radio checked={data.type == 'PROJECT'} />}
              onChange={(e) =>
                e.target.checked && updateData('type', 'PROJECT')
              }
              label="Project"
              classes={{ label: styles.radioLabel }}
            />
          </RadioGroup>

          <SelectComp
            style={{ marginTop: 0 }}
            items={event_courses_projects}
            placeholder={`Select ${data.type.toLowerCase()}`}
            onChange={(val) => {
              updateData('typedata', val);
            }}
            value={data.typedata}
          />
          <Box className={styles.dateBar}>
            <CalendarInput
              value={data.date}
              onChange={(val) => updateData('date', val)}
              minDate={moment()}
            />

            <SelectComp
              label="Start Time"
              icon={clockIcon}
              items={HOURS_DROPDOWN.map((i, k) => ({
                label: i,
                value: i,
              })).filter((i) =>
                isDatesEqual(moment(), data.date)
                  ? !moment(i.value, 'hh:mm A').isSameOrBefore(
                      moment(moment(), 'hh:mm A')
                    )
                  : true
              )}
              onChange={(val) => {
                updateData('startTime', val);
              }}
              value={data.startTime}
            />
            <SelectComp
              label="End Time"
              icon={clockIcon}
              items={HOURS_DROPDOWN.map((i, k) => ({
                label: i,
                value: i,
              })).filter(
                (i) =>
                  !moment(i.value, 'hh:mm A').isSameOrBefore(
                    moment(data.startTime, 'hh:mm A')
                  )
              )}
              onChange={(val) => {
                updateData('endTime', val);
              }}
              value={data.endTime}
            />
          </Box>

          {/* <Label>Timezone</Label>

          <SelectComp
            items={timezones || []}
            placeholder="Select Timezone"
            onChange={(val) => {
              updateData('timezone', val);
            }}
            value={data.timezone}
          /> */}
          <Box className={styles.flexBox}>
            {/* <SelectComp
              label="Repeat"
              items={REMINDER_DROPDOWN.map((i, k) => ({ label: i, value: i }))}
              onChange={(val) => {
                updateData('typedata', val);
              }}
              value={data.typedata}
            /> */}
            <SelectComp
              label="Set Reminder"
              items={REMINDER_DROPDOWN}
              onChange={(val) => {
                updateData('reminder', val);
              }}
              value={data.reminder}
            />
          </Box>
          <Label>Share With</Label>

          <MultiSelect
            isMulti={true}
            closeMenuOnSelect={true}
            classNamePrefix="share"
            value={data.users}
            className={styles.multi}
            placeholder="Type name to search"
            menuPlacement="auto"
            onChange={(val) => updateData('users', val)}
            options={event_users}
            components={{ Option, MultiValueLabel }}
          />
        </Box>
        <Box className={styles.buttons}>
          {edit ? (
            <Button
              onClick={deleteEvent}
              className={styles.primaryButton}
              variant="outlined"
            >
              delete
            </Button>
          ) : (
            <Box></Box>
          )}
          <Box>
            <Box className={styles.buttonGroup}>
              <Button
                onClick={onOutClick}
                className={styles.primaryButton}
                variant="text"
              >
                Cancel
              </Button>
              <Button onClick={createEvent} className={styles.primaryButton}>
                {edit ? 'Save' : 'Create'}
              </Button>
            </Box>
          </Box>
        </Box>
      </PopperComp>
    </ClickOnOutside>
  );
};

export default CreateEvent;

const Label = ({ children }) => {
  const styles = useStyles();

  return <Box className={styles.label}>{children}</Box>;
};

const MultiValueLabel = (props) => {
  const { data } = props;
  return (
    <components.MultiValueLabel {...props}>
      {data.label}
    </components.MultiValueLabel>
  );
};

const Option = (props) => {
  const { data } = props;
  //
  return (
    <components.Option {...props}>
      <Box
        display="flex"
        sx={
          {
            // padding: '8px',
            // ':hover': { background: theme.palette.secondary.main },
            // cursor: 'pointer',
          }
        }
      >
        <Image src={avatar} width={'30px'} height={'30px'} />
        <Box paddingLeft={1}>
          <Box sx={{ fontSize: 13 }}>{data.name}</Box>
          <Box sx={{ opacity: '.5', fontSize: 12 }}>{data.emailId}</Box>
        </Box>
      </Box>
    </components.Option>
  );
};

export const SelectComp = ({
  label,
  items,
  onChange,
  value = 'unset',
  placeholder,
  icon,
}) => {
  const styles = useStyles();

  const IconComponent = ({ className, ...props }) =>
    icon ? (
      <Box
        style={{ width: '14px', minWidth: '14px', marginRight: '5px' }}
        {...props}
      >
        <Image src={icon} width={15} />
      </Box>
    ) : (
      <Box
        style={{
          width: '14px',
          minWidth: '14px',
          marginRight: '5px',
          marginTop: -2.5,
        }}
        className={className}
        {...props}
      >
        <Image src={droopdownIcon} width={15} />
      </Box>
    );

  return (
    <Box className={styles.selectBox}>
      {label && <Label>{label}</Label>}
      <Select
        onOpen={(e) => e.stopPropagation()}
        className={cx([styles.input, styles.select])}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        // displayEmpty
        // inputProps={{ 'aria-label': 'Without label' }}
        renderValue={(val) =>
          val === 'unset' ? (
            <span style={{ color: '#00000044' }}>{placeholder}</span>
          ) : (
            items.find((i, k) => i.value === val)?.label
          )
        }
        MenuProps={MenuProps}
        IconComponent={IconComponent}
      >
        {/* <MenuItem value="" className={styles.menuItem}>
          <em>None</em>
        </MenuItem> */}
        <option
          value="unset"
          selected
          disabled
          hidden
          style={{ color: '#00000044' }}
        >
          {placeholder}
        </option>
        {items.map((item, k) => (
          <MenuItem
            className={styles.menuItem}
            key={k}
            value={item.value}
            disabled={item.disabled}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

const MenuProps = {
  PaperProps: {
    style: {
      borderRadius: 10,
      maxHeight: 220,
      maxWidth: '400px',
    },
  },
};

export const CalendarInput = ({
  value,
  onChange,
  label = 'Event Date',
  LabelComp,
  minDate,
  yearNavigation,
  maxDate,
  style = { popup: {} },
}) => {
  const [datePickerOpened, setDatePickerOpened] = useState(false);
  const styles = useStyles();
  const [date, setDate] = useState(moment());

  const onNavigate = (incr, type = 'month') => {
    setDate(moment(date).add(incr, type));
  };
  const openCalendar = (e) => {
    setDatePickerOpened((prev) => !prev);
    e.stopPropagation();
  };
  return (
    <Box className={styles.date}>
      {LabelComp ? <LabelComp /> : <Label>{label}</Label>}

      <Box
        className={cx(['calendar-input', styles.calendarInput])}
        style={{ marginBottom: 12 }}
      >
        <Input
          className={styles.input}
          style={{ marginBottom: 0 }}
          value={value?.format('DD/MM/YYYY')}
          onClick={openCalendar}
        />
        <Box className={styles.calendarIcon} onClick={openCalendar}>
          <Image src={calendarIcon} />
        </Box>
      </Box>

      {datePickerOpened && (
        <ClickOnOutside onOutClick={() => setDatePickerOpened(false)}>
          <Box className={styles.datePicker} style={style.popup}>
            <CalendarDatePicker
              maxDate={maxDate}
              yearNavigation={yearNavigation}
              date={date}
              onDateChange={(val) => {
                onChange(val);
                setDate(val);
                setDatePickerOpened(false);
              }}
              minDate={minDate}
              onNavigate={onNavigate}
              selectedDate={value || moment()}
            />
          </Box>
        </ClickOnOutside>
      )}
    </Box>
  );
};
