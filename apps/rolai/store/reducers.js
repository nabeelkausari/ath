import { combineReducers } from 'redux';
import adminReducer from './admin/reducer';

import authReducer from './auth/reducer';
import calendarReducer from './calendar/reducer';
import casesReducer from './cases/reducer';
import collaboratorsReducer from './collaborators/reducer';
import coursesReducer from './courses/reducer';
import dashboardReducer from './dashboard/reducer';
import DiscussionReducer from './discussions/reducer';
import exploreReducer from './explore/reducer';
import globalReducer from './global/reducer';
import materialReducer from './material/reducer';
import performanceReducer from './performance/reducer';
import tracksReducer from './tracks/reducer';
import workspaceReducer from './workspace/reducer';

const appReducer = combineReducers({
  auth: authReducer,
  courses: coursesReducer,
  cases: casesReducer,
  tracks: tracksReducer,
  global: globalReducer,
  explore: exploreReducer,
  material: materialReducer,
  dashboard: dashboardReducer,
  workspace: workspaceReducer,
  admin: adminReducer,
  performance: performanceReducer,
  discussions: DiscussionReducer,
  calendar: calendarReducer,
  collaborators: collaboratorsReducer,
});

export default appReducer;
