import get from 'lodash/get';
import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';

import Button from '../../../../../../../components/Button';
import {
  FLYOUT_TOP,
  FLYOUT_TOP_NON_PROJECT,
} from '../../../FunctionsFlyout/FunctionsFlyout.styles';
import commentsContainer from '../container/comments';
import { override, warnEmptyContent } from '../utils';
import CommentCard from './CommentCard';
import CommentMentions from './CommentMentions';

class Comments extends Component {
  state = {
    comment: '',
    is_comment_cleared: false,
    is_comment_active: false,
    is_posting_comment: false,
  };

  commentRef;

  componentDidMount() {
    const { results } = this.props;
    if (get(results, '_links.get_comments')) {
      this.props.getComments(results._links.get_comments, false);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { new_comment_post_succeeded, results } = this.props;

    if (
      new_comment_post_succeeded &&
      prevProps.new_comment_post_succeeded !== new_comment_post_succeeded
    ) {
      this.setState({ is_posting_comment: false });
    }

    if (results.id && results.id !== prevProps.results.id) {
      this.setState({ comment: '' });
    }
  }

  handleClearComment = () => {
    this.commentRef &&
      this.commentRef.clearValue &&
      this.commentRef.clearValue();
  };

  getComment = () => {
    return (
      this.commentRef &&
      this.commentRef.getComment &&
      this.commentRef.getComment()
    );
  };

  getRecipients = () => {
    return (
      this.commentRef &&
      this.commentRef.getRecipients &&
      this.commentRef.getRecipients()
    );
  };

  handlePostComment = () => {
    let content = this.getComment();
    if (!content) {
      return warnEmptyContent();
    }
    this.setState({ is_posting_comment: true });
    this.props.postComment(
      this.props.results._links.post_comment,
      content,
      this.getRecipients(),
      this.props.secondary
    );
    this.handleClearComment();
  };

  render() {
    const { is_posting_comment } = this.state;
    const {
      results: { comments },
      is_case,
    } = this.props;

    return (
      <div
        className="comments-container"
        style={{
          height: `calc(100vh - ${
            (is_case ? FLYOUT_TOP : FLYOUT_TOP_NON_PROJECT) + 332
          }px)`,
        }}
      >
        <div className="comments-container__comments">
          {comments &&
            comments.discussion.map((data, index) => {
              return (
                <CommentCard
                  comment={data}
                  key={index}
                  discussion_index={index}
                  {...this.props}
                />
              );
            })}
          {is_posting_comment && (
            <div className="reply-loader">
              <ClipLoader
                css={override}
                sizeUnit={'rem'}
                size={2}
                color={'var(--highlight-primary)'}
                loading={is_posting_comment}
              />
            </div>
          )}
        </div>
        <div className="comments-container__reply-wrapper">
          <hr className="comments-container__reply-wrapper--divider" />
          <div className="comments-container__text-input-wrapper">
            <CommentMentions onRef={(ref) => (this.commentRef = ref)} />
          </div>
          <div className="comments-container__buttons-wrapper">
            <Button onClick={this.handleClearComment} variant="outlined">
              Clear
            </Button>
            <Button onClick={this.handlePostComment}>Comment</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default commentsContainer(Comments);
