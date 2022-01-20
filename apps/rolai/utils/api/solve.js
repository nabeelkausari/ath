import { fetchLink, fetchLinkAs } from './fetch';

const sortMilestones = (getSolve) =>
  getSolve.then((solve) => ({
    ...solve,
    milestones:
      solve.milestones ||
      solve.milestones.sort((a, b) => a.sequence_number - b.sequence_number),
  }));
const getCurrentSolve = (simulation) =>
  sortMilestones(
    fetchLinkAs(simulation._links.start || simulation._links.resume)
  );
const get = (solve) => sortMilestones(fetchLinkAs(solve._links.self));
const createUserStep = (solve, data) =>
  fetchLinkAs(solve._links.create_user_step, data);
const getUserStep = (step) => fetchLinkAs(step._links.result);
const getUserSteps = (solve) => fetchLinkAs(solve._links.user_steps);
const getExpertSteps = (solve) => fetchLinkAs(solve._links.expert_steps);
const getComparison = (milestone) => fetchLinkAs(milestone._links.compare);
const getReferenceStep = (step) => fetchLinkAs(step._links.self);
const submit = (solve) =>
  solve.ltiHeaders
    ? fetchLink(solve._links.submit, undefined, solve.ltiHeaders)
    : fetchLink(solve._links.submit);
const reset = (solve) => fetchLink(solve._links.reset);
const rollback = (step) => fetchLink(step._links.rollback);
const getShowCodeTabs = (solve) => fetchLinkAs(solve._links.show_code_tabs);
const saveColumnSelection = (solve, selectionData) =>
  fetchLink(solve._links.create_column_selection, selectionData);
const updateColumnSelection = (solve, selectionData) =>
  fetchLink(solve._links.update_column_selection, selectionData);
const getAllColumnSelection = (solve) =>
  fetchLinkAs(solve._links.all_column_selection);
export const solves = {
  getCurrentSolve,
  get,
  getUserStep,
  getUserSteps,
  createUserStep,
  getExpertSteps,
  getComparison,
  getReferenceStep,
  submit,
  reset,
  rollback,
  getShowCodeTabs,
  saveColumnSelection,
  updateColumnSelection,
  getAllColumnSelection,
};
