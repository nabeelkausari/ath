import { fetchLink, fetchLinkAs } from '../../utils/api/fetch';
import { notify } from '../../utils/helpers/notification';
import { getUserIdFromProfile } from '../../utils/helpers/storage';
import * as types from './types';
import moment from 'moment';
import { BACKEND_DF, YYYYMMDD } from '../../utils/helpers/calendar';
let begin = moment().set({ minutes: 0, hour: 1, seconds: 0 });
import _ from 'lodash';

export const getCalendarEvents = (range) => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();

  const link = {
    href: `/calendar?startDate=${range.startDate}&endDate=${range.endDate}`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_CALENDAR_EVENTS });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.CALENDAR_EVENTS_SUCCESS,
        payload: payload,
      });
    })
    .catch((err) => {
      dispatch({ type: types.CALENDAR_EVENTS_ERROR });
      notify.error(err?.body?.message);
    });
};
export const clearCalendarSearchEvents = () => (dispatch) => {
  dispatch({ type: types.CLEAR_CALENDAR_SEARCH_EVENTS });
};

export const getCalendarSearchEvents =
  (searchFilter) => (dispatch, getState) => {
    const { from, to, searchText = '', type } = searchFilter;

    const searchParams = {
      tag: searchText,
      type: type != 'ALL' && type,
      startDate: from && moment(from).format(YYYYMMDD),
      endDate: to && moment(to).format(YYYYMMDD),
    };

    const searchParamString = Object.keys(searchParams)
      .map(
        (i) => searchParams[i] && i + '=' + encodeURIComponent(searchParams[i])
      )
      .filter((i) => i)
      .join('&');

    const link = {
      href: `/calendar/search?${searchParamString}`,
      accept: 'application/json',
    };
    dispatch({ type: types.GET_CALENDAR_SEARCH_EVENTS });
    return fetchLinkAs(link)
      .then((payload) => {
        dispatch({
          type: types.CALENDAR_SEARCH_EVENTS_SUCCESS,
          payload:
            payload &&
            _.groupBy(payload, (i) =>
              moment(i.start_time, BACKEND_DF).format('YYYY-MM')
            ),
        });
      })
      .catch((err) => {
        dispatch({ type: types.CALENDAR_SEARCH_EVENTS_ERROR });
        notify.error(err?.body?.message);
      });
  };

export const getEventDetails = (link) => (dispatch, getState) => {
  dispatch({ type: types.GET_EVENT_DETAILS });
  return fetchLinkAs(link)
    .then(async (payload) => {
      dispatch({
        type: types.EVENT_DETAILS_SUCCESS,
        payload: {
          ...payload,
          users: await getUsersDetails(payload.user_ids || []),
          ownerDetails: await getUsersDetails([payload.owner_id]),
        },
      });
    })
    .catch((err) => {
      dispatch({ type: types.EVENT_DETAILS_ERROR });
      notify.error(err?.body?.message);
    });
};

export const updateEventDetails = (range) => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/content/dashboard/user/${user_id}/lastAccessContents`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_CALENDAR_EVENTS });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.CALENDAR_EVENTS_SUCCESS,
        payload: payload,
      });
    })
    .catch((err) => {
      dispatch({ type: types.CALENDAR_EVENTS_ERROR });
      notify.error(err?.body?.message);
    });
};

export const getTimezones = () => (dispatch, getState) => {
  const link = {
    href: `/calendar/getAllTimeZones`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_TIMEZONES });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.TIMEZONES_SUCCESS,
        payload: Object.keys(payload).map((i, k) => ({
          label: payload[i],
          value: i,
        })),
      });
    })
    .catch((err) => {
      dispatch({ type: types.TIMEZONES_ERROR });
      notify.error(err?.body?.message);
    });
};

export const getEventCourses = () => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/users/${user_id}/enrolledCourses`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_EVENT_COURSES_PROJECTS });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.EVENT_COURSES_PROJECTS_SUCCESS,
        payload: payload.map((i, k) => ({
          label: i.title,
          value: i.id,
          _links: i._links,
        })),
      });
    })
    .catch((err) => {
      dispatch({ type: types.EVENT_COURSES_PROJECTS_ERROR });
      notify.error(err?.body?.message);
    });
};

export const getEventProjects = () => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/user/${user_id}/userCreatedCases`,
    accept: 'application/json',
  };
  dispatch({ type: types.GET_EVENT_COURSES_PROJECTS });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({
        type: types.EVENT_COURSES_PROJECTS_SUCCESS,
        payload: payload.map((i, k) => ({
          label: i.name,
          value: i.id,
          _links: i._links,
        })),
      });
    })
    .catch((err) => {
      dispatch({ type: types.EVENT_COURSES_PROJECTS_ERROR });
      notify.error(err?.body?.message);
    });
};

export const getUsersDetails = (ids) => {
  return fetchLinkAs(
    {
      href: '/users/user/getUsers',
      method: 'POST',
      type: 'application/json',
    },
    ids
  )
    .then((payload) => {
      return payload.map((i, k) => ({
        ...i,
        label: i.name,
        value: i.userId,
      }));
    })
    .catch((err) => {
      dispatch({ type: types.EVENT_USERS_ERROR });
      notify.error(err?.body?.message);
    });
};
export const getEventUsers = (link) => (dispatch, getState) => {
  dispatch({ type: types.GET_EVENT_USERS });
  return fetchLinkAs(link)
    .then(async (payload) => {
      dispatch({
        type: types.EVENT_USERS_SUCCESS,
        payload: await getUsersDetails(payload),
      });
    })
    .catch((err) => {
      dispatch({ type: types.EVENT_USERS_ERROR });
      notify.error(err?.body?.message);
    });
};
export const getProjectEventUsers = (link) => (dispatch, getState) => {
  dispatch({ type: types.GET_EVENT_USERS });
  return fetchLinkAs(link)
    .then(async (payload) => {
      dispatch({
        type: types.EVENT_USERS_SUCCESS,
        payload: await getUsersDetails(payload.map((i, k) => i.collaboratorId)),
      });
    })
    .catch((err) => {
      dispatch({ type: types.EVENT_USERS_ERROR });
      notify.error(err?.body?.message);
    });
};

const checkInputError = ({
  title,
  description,
  startDate,
  endDate,
  itemId,
}) => {
  const MAPPING = {
    startDate: 'start date',
    endDate: 'end date',
    itemId: 'course or project',
  };
  function error(param, data) {
    if (data == '' || !data) {
      notify.error(`${MAPPING[param] || param} cannot be empty`);
      return true;
    } else return false;
  }
  let params = { title, description, startDate, endDate, itemId };
  return Object.keys(params).some((param, k) => error(param, params[param]));
};

export const createCalendarEvent = (data) => (dispatch, getState) => {
  if (checkInputError(data)) return;
  const link = {
    href: `/calendar`,
    method: 'POST',
    type: 'application/vnd.Analyttica.TreasureHunt.CalendarEventDTO+json',
  };
  dispatch({ type: types.GET_CREATE_EVENT });
  return fetchLink(link, data)
    .then((payload) => {
      dispatch({ type: types.CREATE_EVENT_SUCCESS, payload });
      notify.success('Success', 'Successfully created event');
    })
    .catch((error) => {
      dispatch({ type: types.CREATE_EVENT_ERROR, error });
      notify.error(error.message);
    });
};

export const updateCalendarEvent = (link, data) => (dispatch, getState) => {
  // if (name === '') return notify.error('Project name cannot be empty');

  dispatch({ type: types.GET_CREATE_EVENT });
  return fetchLink(link, data)
    .then((payload) => {
      dispatch({ type: types.CREATE_EVENT_SUCCESS, payload });
      notify.success('Success', 'Successfully created event');
    })
    .catch((error) => {
      dispatch({ type: types.CREATE_EVENT_ERROR, error });
      notify.error(error.message);
    });
};

export const deleteCalendarEvent = (link, payload) => (dispatch, getState) => {
  return fetchLink(link)
    .then(() => {
      dispatch({ type: types.DELETE_EVENT_SUCCESS, payload });
      notify.success('Success', 'Successfully deleted event');
    })
    .catch((error) => {
      notify.error(error.message);
    });
};

export const setCalendarSelected = (payload) => (dispatch) => {
  dispatch({ type: types.SET_CALENDAR_SELECTED, payload });
};
export const setCalendarSearchFilter = (payload) => (dispatch) => {
  dispatch({ type: types.SET_CALENDAR_SEARCH_FILTER, payload });
};

export const setCalendarFilter = (payload) => (dispatch) => {
  dispatch({ type: types.SET_CALENDAR_FILTER, payload });
};

export const setCalendarPopper = (payload) => (dispatch) => {
  dispatch({ type: types.SET_CALENDAR_POPPER, payload });
};
