import { connect } from 'react-redux';

import {
  deleteDiscussion,
  deleteReply,
  getComments,
  postComment,
  postReply,
} from '../../../../../../../store/workspace/steps/actions';

function mapStateToProps(state, ownProps) {
  const {
    cases: { project },
    workspace: {
      steps: {
        new_comment_post_succeeded,
        new_reply_post_succeeded,
        comment_delete_requested,
        comment_delete_succeeded,
        comment_delete_failed,
        reply_delete_requested,
        reply_delete_succeeded,
        reply_delete_failed,
      },
      solve,
    },
    collaborators: { list },
  } = state;

  return {
    collaborators_list: list,
    case_collaborators_list: project.case_collaborators?.list,
    new_comment_post_succeeded,
    new_reply_post_succeeded,
    comment_delete_requested,
    comment_delete_succeeded,
    comment_delete_failed,
    reply_delete_requested,
    reply_delete_succeeded,
    reply_delete_failed,
    current_case: project,
    currentSolve: solve,
  };
}

export default (comp) =>
  connect(mapStateToProps, {
    postComment,
    getComments,
    postReply,
    deleteDiscussion,
    deleteReply,
  })(comp);
