import get from 'lodash/get';
import lowerCase from 'lodash/lowerCase';
import moment from 'moment';

import { CONFIGURED, READ_ONLY } from '../constants/userPermissions';
// import monentTz from 'moment-timezone';
import { getUserIdFromProfile } from './storage';

export const chunkArray = (array, chunk_size) => {
  return [].concat.apply(
    [],
    array.map((elem, i) => {
      return i % chunk_size ? [] : [array.slice(i, i + chunk_size)];
    })
  );
};

export const getInitials = (name) => {
  if (!name) return;
  let name_array = name.trim().split(' ');
  if (name_array.length > 1) {
    return name_array[0][0] + name_array[name_array.length - 1][0];
  } else {
    return name_array[0][0];
  }
};

export const removeUnderscores = (text) => {
  if (!text) return;
  return text.replace('_', ' ');
};

export const formatDate = (date, format) => {
  let timestamp = moment(date);
  return timestamp.format(format);
};

export const getMaskedFeature = () => {
  if (!process.env.REACT_APP_MASKED_FEATURES) return '';
  return process.env.REACT_APP_MASKED_FEATURES.split('/');
};

export const isCreator = (profile) => {
  return !!get(profile, '_links.create_course');
};
export const isCourseReviewer = (profile) => {
  return profile.roles.indexOf('COURSE_REVIEWER') >= 0;
};
export const isHackathonAdminUser = (profile) => {
  return profile.roles.indexOf('HACKATHON_ADMIN') >= 0;
};

export const getFilteredCourses = (list, is_creator = false) => {
  if (is_creator) {
    return list
      .filter((course) => get(course, '_links.editCourse') !== undefined)
      .filter(
        (course) =>
          !!get(course, 'category') &&
          get(course, 'category').toUpperCase().indexOf('COURSE') >= 0
      );
  }
  return (
    list
      .filter(
        (course) =>
          !!course.marketplace_category &&
          course.marketplace_category.toUpperCase() === 'COURSE'
      )
      .filter((course) =>
        course.isVisibilityPublic !== undefined
          ? course.isVisibilityPublic
          : true
      )
      .filter(
        (course) =>
          !!course._links.start ||
          !!course._links.resume ||
          !!course._links.redo
      ) || []
  );
};

export const isEmptyString = (value) => {
  return value === '';
};

export const isSimulab = () =>
  process.env.REACT_APP_TENANT === 'ATOMS' ||
  process.env.REACT_APP_TENANT === 'SIMULAB';

export const is3ai = () => process.env.REACT_APP_TENANT === '3AI';

export const isFirstSource = () =>
  process.env.REACT_APP_TENANT === 'FIRSTSOURCE';

export const isLeaps = () => process.env.REACT_APP_TENANT === 'LEAPS';

export const isAccenture = () => process.env.REACT_APP_TENANT === 'ACCENTURE';

export const isGacathon = () => process.env.REACT_APP_TENANT === 'GACATHON';

export const searchStartsWith = (arr, query) => {
  return arr.some((item) => {
    if (lowerCase(item).indexOf(lowerCase(query)) === 0) return true;
  });
};

// export const getGmtTime = () => {
//   return monentTz().tz('Etc/GMT');
// };
// export const convertToGmt = (date) => {
//   return monentTz(date).tz('Etc/GMT');
// };

export const getZoneName = () => {
  let zone_name = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return zone_name ? zone_name : 'Etc/GMT';
};

// export const convertToLocalTime = (date) => {
//   let zone_name = getZoneName();
//   return monentTz(date).tz(zone_name);
// };

export const convertToMoment = (date) => moment.unix(date / 1000);

// export const getLocalTime = () => {
//   let zone_name = getZoneName();
//   return monentTz().tz(zone_name);
// };

export const getCurrency = (currency) => {
  return currency === 'INR' ? '₹' : '$';
};

export const convertNumberToStr = (val) => {
  return val.toLocaleString();
};

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validateNumericChars = (value) => {
  if (value === '') return true;
  const pattern = /^[0-9]+$/;
  return pattern.test(value);
};

// Function to determine whether the sequence of the step needs to have an appended 0
export const getPrefix = (sequence_number) => {
  let string_number =
    sequence_number !== undefined && sequence_number.toString();
  // if (string_number.length === 1) return '0' + string_number;
  // else return string_number;
  return string_number;
};

export const addIndexNumbers = (steps) =>
  steps.map((step, index) => ({ ...step, index_number: index }));

export const getTableInfos = (rows) => {
  if (rows[0][0].trim().indexOf('Name:') !== 0) return [{ rows }];
  const table_rows = rows.reduce((tables, row) => {
    if (row[0].trim().indexOf('Name:') === 0) {
      tables.push({ name: row[0].trim(), rows: [] });
      return tables;
    } else {
      const last_table = tables[tables.length - 1];
      last_table.rows.push(row);
      return tables;
    }
  }, []);
  return table_rows;
};

export const getHeaders = (headers) =>
  headers[0] === '' ? [...headers] : ['', ...headers];

export const getCaseCollaborators = (
  all_collaborators_list = [],
  case_collaborators = [],
  case_creator_id
) => {
  const userId = getUserIdFromProfile();
  let _case_collaborators = case_collaborators;
  if (case_creator_id) {
    _case_collaborators = [
      ...case_collaborators,
      { collaboratorId: case_creator_id },
    ];
  }
  _case_collaborators = _case_collaborators.filter(
    (c) => c.collaboratorId && c.collaboratorId.toString() !== userId
  );
  return all_collaborators_list.filter((user) =>
    _case_collaborators.some((c_c) => c_c.collaboratorId === user.user_id)
  );
};

export const getRoundWithDecimals = (num) =>
  Math.round((num + Number.EPSILON) * 100) / 100;

export const getPlanFeatures = (list, type) => {
  return list.filter((item) => item.type.includes(type));
};

export const allowAlphaNumeric = (text) => {
  return text.replace(/[^a-z0-9]/gi, '');
};

export const allowNumeric = (text) => {
  return text.replace(/[^0-9]/gi, '');
};

export const escapeHTMLLineSlashes = (str) => {
  return str.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
};

// export const isAppliedCourse = (course) =>
//   course.course_type !== SCHOOL_60_MIN &&
//   course.course_type !== QUICK_BITE &&
//   course.course_type !== CASE_STUDY &&
//   course.course_type !== CODING_COURSE;
//
// export const isSixtyMinuteCourse = (course) =>
//   course.course_type === SCHOOL_60_MIN;
//
// export const isCodingCourse = (course) => course.course_type === CODING_COURSE;
// export const isCaseStudies = (course) => course.course_type === CASE_STUDY;

export const printResult = (component) => {
  if (typeof window === undefined) return;
  let win = window.open('', '_blank', 'height=500, width=500');
  let userStepFlyoutContent = `
        <html>
        <head>
          <style>
           td, th {
            padding: .5rem 1rem;
           }
          </style>
        </head>
        <body>${component.current.innerHTML}</body>
        </html>
        `;
  win.document.write(userStepFlyoutContent);
  win.print();
  win.close();
};

export const toHMS = (seconds) => {
  var date = new Date(null);
  date.setSeconds(+seconds);
  return date.toISOString().substr(11, 8);
};

export const toHM = (seconds) => {
  var date = new Date(null);
  date.setSeconds(+seconds);
  const hours = Number(date.toISOString().substr(11, 2)).toString();

  const mins = Number(date.toISOString().substr(14, 2)).toString();
  return (
    (hours !== '0' ? hours + (hours === '1' ? ' hour ' : ' hours ') : '') +
    (mins !== '0' ? mins + ' min' : '')
  );
};
const intervalToLevels = (interval, levels) => {
  const cbFun = (d, c) => {
    let bb = d[1] % c[0],
      aa = (d[1] - bb) / c[0];
    aa = aa > 0 ? aa + c[1] : '';

    return [d[0] + aa, bb];
  };

  let rslt = levels.scale
    .map((d, i, a) => a.slice(i).reduce((d, c) => d * c))
    .map((d, i) => [d, levels.units[i]])
    .reduce(cbFun, ['', interval]);
  return rslt[0];
};

const TimeLevels = {
  scale: [24, 60, 60, 1],
  units: ['d ', 'h ', 'm ', 's '],
};
export const secondsToString = (interval) =>
  intervalToLevels(interval, TimeLevels);

export const isReadOnlyProject = (project) =>
  project?.sample_case ||
  project.permission === READ_ONLY ||
  project.permission === CONFIGURED;

export const floor = (val, n) => {
  let i = n ? Math.pow(10, n) : 100;
  return Math.ceil(val * i) / i;
};
export const isLoading = (value) => value === null || value === true;

export const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

export const convertToDateString = (date) => {
  return moment(date, 'yyyy/MM/DD HH:mm:SS').format('D MMMM yyyy');
};

export const getUniqueListBy = (arr, key) => {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
};

export const scrollToId = (id) => {
  var elmnt = document.getElementById(id);
  elmnt && elmnt.scrollIntoView({ behavior: 'smooth' });
};
