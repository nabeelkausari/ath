import { fetchLink, fetchLinkAs } from '../../utils/api/fetch';
import { API_GATEWAY_URI, MAX_IMAGE_SIZE } from '../../utils/constants';
import { notify } from '../../utils/helpers/notification';
import { getUserIdFromProfile } from '../../utils/helpers/storage';
import { getMyProfile } from '../auth/actions';
import * as types from './types';

export const getAdminProfile = () => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const link = {
    href: `/users/tenants/da49652c-ba7d-4531-b610-a50cf856d841/tenantDTO`,
    type: 'application/json',
  };
  dispatch({ type: types.GET_ADMIN_PROFILE });
  return fetchLinkAs(link)
    .then((payload) => {
      dispatch({ type: types.ADMIN_PROFILE_SUCCESS, payload });
    })
    .catch((err) => {
      dispatch({ type: types.ADMIN_PROFILE_ERROR });
      notify.error(err?.body?.message);
    });
};
export const updateAdminProfileImage = (file) => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  if (file.size > MAX_IMAGE_SIZE) {
    return notify.error(
      'File Size exceeds 1MB',
      'Please upload a smaller file'
    );
  }
  let formData = new FormData();
  formData.append('file', file);
  console.log(formData);
  const link = {
    href: `/users/tenants/da49652c-ba7d-4531-b610-a50cf856d841/uploadOrganizationLogo`,
    type: 'application/json',
    method: 'POST',
  };

  fetch(`${API_GATEWAY_URI}${link.href}`, {
    method: 'POST',
    body: formData,
  })
    .then(() => {
      dispatch({ type: types.UPDATE_ADMIN_PROFILE_IMAGE_SUCCESS });
      notify.success('Profile Image Updated Successfully');

      dispatch(getAdminProfile());
      dispatch(getMyProfile());
    })
    .catch((err) => {
      notify.error(err?.body?.message);
    });
};

export const changeUserPassword = () => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  const data = getState().global.dialog_params;

  if (!(data.password == data.confirmPassword))
    return notify.error('Passwords are not matching');
  const link = {
    href: `/password/user/${user_id}/change`,
    type: 'application/json',
    method: 'POST',
  };
  console.log(data);

  return fetchLink(link, { newPassword: data.password })
    .then(() => {
      dispatch({ type: types.UPDATE_USER_PASSWORD_SUCCESS });
      dispatch(getMyProfile());
      notify.success('Password Updated Successfully');
    })
    .catch((err) => {
      notify.error(err?.body?.message);
    });
};

export const updateUserProfileImage = (file) => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();
  if (file.size > MAX_IMAGE_SIZE) {
    return notify.error(
      'File Size exceeds 1MB',
      'Please upload a smaller file'
    );
  }
  let formData = new FormData();
  formData.append('file', file);
  console.log(formData);
  const link = {
    href: `/users/${user_id}/uploadProfilePic`,
    type: 'application/json',
    method: 'POST',
  };

  fetch(`${API_GATEWAY_URI}${link.href}`, {
    method: 'POST',
    body: formData,
  })
    .then(() => {
      dispatch({ type: types.UPDATE_ADMIN_PROFILE_IMAGE_SUCCESS });
      notify.success('Profile Image Updated Successfully');

      dispatch(getMyProfile());
    })
    .catch((err) => {
      notify.error(err?.body?.message);
    });
};

export const updateAdminProfile = (data) => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();

  const link = {
    href: `/users/tenants/da49652c-ba7d-4531-b610-a50cf856d841/updateTenantDetails`,
    type: 'application/json',
    method: 'POST',
  };
  console.log(data);
  return fetchLink(link, data)
    .then(() => {
      dispatch({ type: types.UPDATE_ADMIN_PROFILE_SUCCESS });
      dispatch(getMyProfile());
      notify.success('Profile Details Updated Successfully');
    })
    .catch((err) => {
      notify.error(err?.body?.message);
    });
};

export const updateUserProfile = (data) => (dispatch, getState) => {
  const user_id = getUserIdFromProfile();

  const link = {
    href: `/users/${user_id}/updateProfile`,
    type: 'application/vnd.Analyttica.TreasureHunt.UserProfileDTO+json',
    method: 'POST',
  };
  console.log(data);
  return fetchLink(link, data)
    .then(() => {
      dispatch({ type: types.UPDATE_USER_PROFILE_SUCCESS });
      dispatch(getMyProfile());
      notify.success('Profile Details Updated Successfully');
    })
    .catch((err) => {
      notify.error(err?.body?.message);
    });
};

export const getCities = (query, callback) => (dispatch, getState) => {
  const link = {
    href: `/cities/${query ? `?query=${query}` : ''}`,
    type: 'application/json',
  };
  dispatch({ type: types.GET_CITIES });
  return fetchLinkAs(link)
    .then((payload) => {
      const cities = payload.map((city) => ({
        value: city.id,
        label: `${city.name}, ${city.state}, ${city.country}`,
      }));

      dispatch({
        type: types.CITIES_SUCCESS,
        payload: cities,
      });
      callback(cities);
    })
    .catch((err) => {
      dispatch({ type: types.CITIES_ERROR });
      notify.error(err?.body?.message);
    });
};
