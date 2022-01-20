import cx from 'classnames';
import get from 'lodash/get';
import React, { useState } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { useDispatch, useSelector } from 'react-redux';

import {
  addTitleToDashboardItem,
  arrangeDashboardItems,
  pinStep,
  removeDashboardItem,
  updateDashboardItem,
} from '../../../../../store/workspace/insights/actions';
import { DASHBOARD_GRID } from '../../../../../utils/constants';
import { isReadOnlyProject } from '../../../../../utils/helpers/helperFunctions';
import AddElement from './AddElement';
import { EmptyScreen } from './EmptyScreen';
import useStyles from './Insights.styles';
import ResultComponent from './ResultComponent';
import { TextHolder } from './TextHolder';

const ReactGridLayout = WidthProvider(RGL);

const Insights = ({
  className = 'dashboard',
  items = 1,
  rowHeight = 1,
  cols = DASHBOARD_GRID,
  margin = [8, 8],
  preventCollision = true,
  is_shared_dashboard = false,
}) => {
  const defaultProps = {
    className,
    items,
    rowHeight,
    cols,
    margin,
    preventCollision,
  };
  const dispatch = useDispatch();
  const styles = useStyles();
  const [fullScreenIndex, setFullScreenIndex] = useState(null);
  const { insights, solve } = useSelector((state) => state.workspace);
  const { project } = useSelector((state) => state.cases);
  const { shared_dashboard_requested, shared_dashboard } = useSelector(
    (state) => state.collaborators
  );

  const read_only = isReadOnlyProject(project) || is_shared_dashboard;
  const {
    arrange_dashboard_items_loading,
    dashboard_items: insight_items,
    remove_dashboard_item_succeeded,
    dashboard_items_loading: items_loading,
  } = insights;

  const dashboard_items = is_shared_dashboard
    ? shared_dashboard
    : insight_items;
  const dashboard_items_loading = is_shared_dashboard
    ? items_loading
    : shared_dashboard_requested;

  const full_screen_step =
    (fullScreenIndex || fullScreenIndex === 0) &&
    dashboard_items.find((item) => item.i === fullScreenIndex);
  const modify_dashboard = get(solve, '_links.modify_dashboard');
  const readonly_dashboard = read_only || !modify_dashboard;

  const handleFullScreen = (index) => {
    setFullScreenIndex(fullScreenIndex === index ? null : index);
  };

  const handleResize = (data, item, i) => {
    let [changed_item] = dashboard_items.filter((p) => p.i === item.i);
    if (changed_item.h !== i.h || changed_item.w !== i.w) {
      dispatch(arrangeDashboardItems(data));
    }
  };

  const handleDrag = (data, item, i) => {
    let [changed_item] = dashboard_items.filter((p) => p.i === item.i);
    if (changed_item.x !== i.x || changed_item.y !== i.y) {
      dispatch(arrangeDashboardItems(data));
    }
  };

  const handleSaveTitle = (title, pin) => {
    dispatch(addTitleToDashboardItem({ ...pin, title }));
  };
  const isFullScreen = fullScreenIndex || fullScreenIndex === 0;

  if (dashboard_items_loading) return null;
  return (
    <div className={styles.insights}>
      {isFullScreen && (
        <div
          key={fullScreenIndex}
          className="card-output card-output--full-screen"
        >
          <ResultComponent
            pinStep={() => dispatch(pinStep(full_screen_step, true))}
            pin={full_screen_step}
            handleFullScreen={handleFullScreen}
            handleSaveTitle={handleSaveTitle}
            full_screen
            readonly_dashboard={readonly_dashboard}
          />
        </div>
      )}
      {!isFullScreen && dashboard_items.length > 0 ? (
        <ReactGridLayout
          {...defaultProps}
          compactType={null}
          layout={dashboard_items}
          onDragStop={handleDrag}
          onResizeStop={handleResize}
          style={{ width: '100%' }}
          isDraggable={!readonly_dashboard && !arrange_dashboard_items_loading}
          isResizable={!readonly_dashboard && !arrange_dashboard_items_loading}
          draggableHandle=".draggable-element"
        >
          {dashboard_items.map((pin, i) => {
            if (pin.step_id) {
              return (
                <div key={i} className="card-output">
                  <ResultComponent
                    key={i}
                    i={i}
                    pin={pin}
                    pinStep={() => dispatch(pinStep(pin, true))}
                    handleFullScreen={handleFullScreen}
                    handleSaveTitle={handleSaveTitle}
                    readonly_dashboard={readonly_dashboard}
                  />
                </div>
              );
            } else {
              return (
                <div
                  className={cx(['text-item', read_only && 'read-only'])}
                  key={i}
                >
                  <TextHolder
                    remove={(pin) => dispatch(removeDashboardItem(pin))}
                    read_only={readonly_dashboard}
                    key={i}
                    pin={pin}
                    changeText={(detail, i) =>
                      dispatch(updateDashboardItem(detail, i))
                    }
                    remove_dashboard_item_succeeded={
                      remove_dashboard_item_succeeded
                    }
                    // showDialog={showDialog}
                  />
                </div>
              );
            }
          })}
        </ReactGridLayout>
      ) : (
        dashboard_items_loading === false && <EmptyScreen />
      )}
      {!readonly_dashboard && <AddElement />}
    </div>
  );
};
export default Insights;
