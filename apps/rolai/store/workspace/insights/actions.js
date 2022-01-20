import get from 'lodash/get';
import maxBy from 'lodash/maxBy';

import { fetchLink, fetchLinkAs } from '../../../utils/api/fetch';
import { DASHBOARD_SIZES } from '../../../utils/constants';
import { notify } from '../../../utils/helpers/notification';
import * as types from './types';

export const pinStep = (step, from_dashboard) => (dispatch, getState) => {
  dispatch({ type: types.PIN_OUTPUT_REQUESTED });
  const {
    workspace: {
      insights: { dashboard_items },
      scenario,
    },
  } = getState();
  const step_id = from_dashboard ? step.step_id : step.id;
  let pin_index = dashboard_items.findIndex(
    (d) => d.detail_type === 'STEP' && d.step_id === step_id
  );
  let lastPositionedItem = maxBy(dashboard_items, 'y');

  if (pin_index >= 0) {
    let updated_dashboard_items = [
      ...dashboard_items.slice(0, pin_index),
      ...dashboard_items.slice(pin_index + 1),
    ];

    updated_dashboard_items = updated_dashboard_items.map((item, i) => ({
      ...item,
      i: String(i),
      detail: JSON.stringify(item.detail),
    }));

    return fetchLink(
      get(scenario, '_links.update_dashboard_components'),
      updated_dashboard_items
    )
      .then(() => {
        dispatch({
          type: types.PIN_OUTPUT_SUCCEEDED,
          payload: {
            dashboard_items: updated_dashboard_items.map((item) => ({
              ...item,
              detail: JSON.parse(item.detail),
            })),
          },
        });

        notify.info('Step removed from insights');
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    let pinned_step = {
      detail: {
        step_id: step.id,
        step: {
          results: step.results,
          sequence_number: step.sequence_number,
          operation_name: step.operation_name,
        },
      },
      detail_type: 'STEP',
      step_id: step.id,
      x: 0,
      y: lastPositionedItem ? lastPositionedItem.y + lastPositionedItem.h : 0,
      w: 32,
      h: 54,
      minW: DASHBOARD_SIZES.STEP.w,
      minH: DASHBOARD_SIZES.STEP.h,
      i: String(dashboard_items.length),
    };

    return fetchLink(get(step, '_links.pin_step_result'), {
      ...pinned_step,
      detail: JSON.stringify(pinned_step.detail),
    })
      .then(() => {
        dispatch({
          type: types.PIN_OUTPUT_SUCCEEDED,
          payload: {
            dashboard_items: [...dashboard_items, pinned_step],
          },
        });

        notify.info(`Step ${step.sequence_number} pinned to insights`);
      })
      .catch((error) => {
        dispatch({ type: types.PIN_OUTPUT_FAILED, error });
      });
  }
};

export const removeDashboardItem = (item) => (dispatch, getState) => {
  dispatch({ type: types.REMOVE_DASHBOARD_ITEM_REQUESTED });
  const {
    workspace: {
      insights: { dashboard_items },
      scenario,
    },
  } = getState();
  let pin_index = dashboard_items.findIndex((d) => d.id === item.id);

  if (pin_index < 0) return;

  let updated_dashboard_items = [
    ...dashboard_items.slice(0, pin_index),
    ...dashboard_items.slice(pin_index + 1),
  ];

  updated_dashboard_items = updated_dashboard_items.map((item, i) => ({
    ...item,
    i: String(i),
    detail: JSON.stringify(item.detail),
  }));

  return fetchLink(
    get(scenario, '_links.update_dashboard_components'),
    updated_dashboard_items
  )
    .then(() => {
      dispatch({
        type: types.REMOVE_DASHBOARD_ITEM_SUCCEEDED,
        payload: updated_dashboard_items.map((item) => ({
          ...item,
          detail: JSON.parse(item.detail),
        })),
      });

      notify.info(`${item.detail.type} removed from insights`);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addDashboardItem =
  ({ type, value }) =>
  (dispatch, getState) => {
    const {
      workspace: {
        insights: { dashboard_items },
        scenario,
      },
    } = getState();

    dispatch({ type: types.ADD_DASHBOARD_ITEM_REQUESTED });
    let lastPositionedItem = maxBy(dashboard_items, 'y');

    let item = {
      detail: { type, value },
      x: 0,
      y: lastPositionedItem ? lastPositionedItem.y + lastPositionedItem.h : 0,
      w: DASHBOARD_SIZES.CASE[type].w,
      h: DASHBOARD_SIZES.CASE[type].h,
      minW: DASHBOARD_SIZES.CASE[type].w,
      minH: DASHBOARD_SIZES.CASE[type].h,
      i: String(dashboard_items.length),
      detail_type: 'CASE',
    };

    return fetchLinkAs(scenario?._links?.add_dashboard_component, {
      ...item,
      detail: JSON.stringify(item.detail),
    })
      .then((res) => {
        res.detail = JSON.parse(res.detail);
        dispatch({
          type: types.ADD_DASHBOARD_ITEM_SUCCEEDED,
          payload: [...dashboard_items, res],
        });
        dispatch(getDashboardItems());
      })
      .catch((error) => {
        dispatch({ type: types.UPDATE_DASHBOARD_ITEM_FAILED, error });
      });
  };

export const updateDashboardItem = (detail, i) => (dispatch, getState) => {
  const {
    workspace: {
      insights: { dashboard_items },
    },
  } = getState();
  dispatch({ type: types.UPDATE_DASHBOARD_ITEM_REQUESTED });

  let index = dashboard_items.findIndex((d) => d.i === i);

  return fetchLinkAs(
    dashboard_items[index]._links.update_dashboard_component_detail,
    {
      ...dashboard_items[index],
      detail: JSON.stringify(detail),
    }
  )
    .then((payload) => {
      let temp = dashboard_items;
      temp.forEach((item, i) => {
        if (item.id === payload.id) {
          temp[i] = payload;
        }
      });
      dispatch({ type: types.UPDATE_DASHBOARD_ITEM_SUCCEEDED, payload: temp });
    })
    .catch((error) => {
      dispatch({ type: types.UPDATE_DASHBOARD_ITEM_FAILED, error });
    });
};

export const arrangeDashboardItems = (data) => (dispatch, getState) => {
  dispatch({ type: types.ARRANGE_DASHBOARD_ITEMS_REQUESTED });

  const {
    workspace: {
      insights: { dashboard_items },
      scenario,
    },
  } = getState();

  let payload = [];
  data.forEach(({ x, y, h, w, i }) => {
    dashboard_items.forEach((item) => {
      if (item.i === i) {
        let updated_item = {
          ...item,
          x,
          y,
          h,
          w,
          i,
        };
        payload.push(updated_item);
      }
    });
  });

  return fetchLinkAs(scenario?._links?.update_dashboard_position, payload)
    .then(() =>
      dispatch({ type: types.ARRANGE_DASHBOARD_ITEMS_SUCCEEDED, payload })
    )
    .catch((error) => {
      dispatch({ type: types.ARRANGE_DASHBOARD_ITEMS_FAILED, error });
    });
};

export const getDashboardItems = () => (dispatch, getState) => {
  const {
    workspace: { scenario },
  } = getState();
  dispatch({ type: types.GET_DASHBOARD_ITEMS_REQUESTED });
  if (!scenario) return;
  return fetchLinkAs(scenario?._links?.get_dashboard_component)
    .then((res) => {
      let dashboard_items = [];
      res.forEach(({ detail, detail_type, ...item }) => {
        let type = DASHBOARD_SIZES[detail_type];
        let new_item = {
          ...item,
          detail_type,
          minW:
            detail_type === 'CASE'
              ? get(type[JSON.parse(detail).type], 'w')
              : type.w,
          minH:
            detail_type === 'CASE'
              ? get(type[JSON.parse(detail).type], 'h')
              : type.h,
        };
        if (detail) {
          new_item['detail'] = JSON.parse(detail);
        }
        dashboard_items.push(new_item);
      });

      dispatch({
        type: types.GET_DASHBOARD_ITEMS_SUCCEEDED,
        payload: dashboard_items,
      });
      return null;
    })
    .catch((payload) =>
      dispatch({ type: types.GET_DASHBOARD_ITEMS_FAILED, payload })
    );
};

export const addTitleToDashboardItem = (data) => (dispatch, getState) => {
  const {
    workspace: {
      insights: { dashboard_items },
    },
  } = getState();

  const new_item_index = dashboard_items.findIndex((item) => item.i === data.i);

  let payload = [
    ...dashboard_items.slice(0, new_item_index),
    {
      ...data,
    },
    ...dashboard_items.slice(new_item_index + 1),
  ];

  return dispatch({ type: types.ADD_TITLE_TO_DASHBOARD_ITEM, payload });
};
