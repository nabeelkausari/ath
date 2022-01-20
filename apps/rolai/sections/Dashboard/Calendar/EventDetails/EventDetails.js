import Box from '@mui/material/Box';
import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClickOnOutside from '../../../../components/ClickOnOutside/ClickOnOutside';

import PopperComp from '../../../../components/Popper/Popper';
import {
  deleteCalendarEvent,
  getEventDetails,
  setCalendarPopper,
} from '../../../../store/calendar/actions';
import { BACKEND_DF, eventTypes } from '../../../../utils/helpers/calendar';
import avatar from '../../../../assets/icons/avatar.svg';
import Image from 'next/image';
import useStyles from './EventDetails.styles';
import Button from '../../../../components/Button/Button';
import OnClickOut from 'react-onclickoutside';
import { MenuItem, Select } from '@mui/material';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { REMINDER_DROPDOWN } from '../../../../utils/helpers/calendar';
import moment from 'moment';
import CardSkeleton from '../../CardSkeleton/CardSkeleton';
import editIcon from '../../../../assets/Dashboard/Calendar/edit-icon.svg';
import deleteIcon from '../../../../assets/Dashboard/Calendar/delete-icon.svg';
import { calendarPrimaryIcon } from '../../../../assets/Dashboard/Calendar';
const EventDetails = ({}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [menuOpened, setMenuOpened] = useState(false);
  const [reminder, setReminder] = useState('');
  const [users, setUsers] = useState([]);

  const onOutClick = () => {
    dispatch(setCalendarPopper({ opened: false }));
  };
  const {
    popper,
    event_details,
    event_details_requested,
    selected,
    event_users,
  } = useSelector((state) => state.calendar);
  useEffect(() => {
    dispatch(
      getEventDetails(popper.data._links.get_calendar_event_details_by_id)
    );
  }, []);
  return (
    <ClickOnOutside onOutClick={onOutClick}>
      <PopperComp
        anchorEl={popper.anchorEl}
        open={popper.opened}
        popperClass={styles.popperClass}
        arrow={true}
        closePopup={onOutClick}
        placement={selected.type == 'day' && 'right-start'}
      >
        <EventDetailsData />
      </PopperComp>
    </ClickOnOutside>
  );
};

export const EventDetailsData = ({}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [menuOpened, setMenuOpened] = useState(false);
  const [reminder, setReminder] = useState('');
  // const [users, setUsers] = useState([]);

  const onOutClick = () => {
    dispatch(setCalendarPopper({ opened: false }));
  };
  const {
    popper,
    event_details,
    event_details_requested,
    selected,
    event_users,
  } = useSelector((state) => state.calendar);
  const toggleMenuOpened = () => {
    setMenuOpened((opened) => !opened);
  };
  // useEffect(() => {
  //   if (
  //     event_details &&
  //     event_details.user_ids &&
  //     event_users &&
  //     event_users[0]
  //   )
  //     setUsers(
  //       event_users.filter((i, k) => event_details.user_ids.includes(i.value))
  //     );
  // }, [event_details.user_ids]);
  const deleteEvent = () => {
    dispatch(
      deleteCalendarEvent(event_details._links.delete_calendar_by_id, {
        id: event_details.id,
        // date: data.date.format('yyyy-MM-DD'),
      })
    );
  };
  const editEvent = () => {
    // dispatch(setCalendarPopper({ opened: false }));
    const {
      start_time,
      end_time,
      item_type,
      event_item_id,
      reminder_before,
      time_zone,
      user_ids,
    } = event_details;

    dispatch(
      setCalendarPopper({
        opened: true,
        edit: true,
        type: 'EDIT_EVENT',
        data: {
          ...event_details,
          startTime: moment(start_time, BACKEND_DF).format('hh:mm A'),
          endTime: moment(end_time, BACKEND_DF).format('hh:mm A'),
          date: moment(start_time, BACKEND_DF),
          type: item_type,
          typedata: event_item_id,
          reminder: reminder_before / 60,
          timezone: time_zone,
          users: user_ids || [],
        },
      })
    );
  };

  useEffect(() => {
    setReminder(event_details.reminder_before / 60);
  }, [event_details]);

  return event_details_requested ? (
    <>
      <CardSkeleton
        cards={1}
        sx={{ marginBottom: 1, padding: 2 }}
        width={'90%'}
        height={'50px'}
      />
      <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
        <CardSkeleton
          cards={4}
          sx={{ margin: 1, padding: 2, width: '70%' }}
          width={'90%'}
          height={'20px'}
        />
        <CardSkeleton
          cards={4}
          sx={{ margin: 1, padding: 2, width: '30%' }}
          width={'90%'}
          height={'20px'}
        />
      </Box>
      <CardSkeleton
        cards={1}
        sx={{ margin: 2, padding: 2 }}
        // width={'90%'}
      />
    </>
  ) : (
    <>
      <Box className={styles.topBlock}>
        <Box className={styles.badges}>
          <Badge type={event_details.item_type} />
          {event_details.reminder_before && <Badge type="REMINDER" />}
        </Box>
        <Box className={styles.heading}>{event_details.title}</Box>
        <Box className={styles.container}>
          <Box className={styles.left}>
            <Box className={styles.subText}>{event_details.description}</Box>
            <Box className={styles.title}>Course</Box>
            <Box className={styles.subText}>{event_details.item_title}</Box>
            <Box className={styles.title}>Starts on</Box>
            <Box className={styles.subText}>
              <Box className={styles.icon}>
                <Image src={calendarPrimaryIcon} width={12} />
              </Box>
              {moment(event_details.start_time, BACKEND_DF).format(
                'DD/MM/YYYY, hh:mm A'
              )}
            </Box>
          </Box>
          <Box className={styles.right}>
            <Box className={styles.subText}>Created by</Box>
            <Person
              data={event_details.ownerDetails && event_details.ownerDetails[0]}
            />
            <Box className={styles.subText} marginTop="10px">
              Shared With
            </Box>
            {event_details.users &&
              event_details.users.map((i, k) => <Person key={k} data={i} />)}
          </Box>
        </Box>
      </Box>
      <Box className={styles.buttons}>
        <Box className={styles.reminder}>
          <Box> Set Reminder</Box>
          <Select
            open={menuOpened}
            classess
            className={styles.type}
            onOpen={toggleMenuOpened}
            onClose={toggleMenuOpened}
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            IconComponent={() => (
              <KeyboardArrowRightRoundedIcon onClick={toggleMenuOpened} />
            )}
          >
            {REMINDER_DROPDOWN.map((item, k) => (
              <MenuItem className={styles.menuItem} key={k} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box display="flex">
          {/* <Button
            className={styles.primaryButton}
            onClick={onOutClick}
            variant={'text'}
          >
            close
          </Button> */}

          {event_details._links && event_details._links.edit_calendar_by_id && (
            <Box className={styles.buttonGroup}>
              <Button onClick={editEvent} variant="outlined">
                <Box className={styles.icon}>
                  <Image src={editIcon} width={11} />
                </Box>
                edit
              </Button>
              <Button
                onClick={deleteEvent}
                variant="outlined"
                style={{ marginLeft: '10px' }}
              >
                <Box className={styles.icon}>
                  <Image src={deleteIcon} width={11} />
                </Box>
                delete
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
export default EventDetails;

const Person = ({ data = {} }) => {
  const styles = useStyles();
  const { name } = data;

  return (
    <Box className={styles.person}>
      <Image src={avatar} width={'30px'} height={'30px'} />

      <Box className={styles.title}>{name}</Box>
    </Box>
  );
};

export const Badge = ({ type }) => {
  const styles = useStyles();
  const reminder = {
    type: 'REMINDER',
    label: 'Reminder',
    checked: true,
    color: '#D7DAF4',
    background: '#D7DAF4',
    textColor: 'black',
  };
  const details =
    [...eventTypes, reminder].find((i, k) => i.type == type) || {};
  return (
    <Box
      className={styles.badge}
      style={{ background: details.color, color: details.textColor }}
    >
      {type?.toLowerCase()}
    </Box>
  );
};
