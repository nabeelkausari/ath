import cx from 'classnames';
import React, { Component, Fragment } from 'react';
import { ClipLoader } from 'react-spinners';

import Avatar from '../../../../../../../components/Avatar/Avatar';
// import { DeleteIcon, EditIcon } from '../../../../../../../common/images';
import Editor from '../../../../../../../components/Editor/Editor-Minimal';
import EditorView from '../../../../../../../components/Editor/EditorView';
import { getInitials } from '../../../../../../../utils/helpers/helperFunctions';
import { getUserIdFromProfile } from '../../../../../../../utils/helpers/storage';
import { override, warnEmptyContent } from '../utils';
import ReplyComment from './ReplyComment';

class CommentCard extends Component {
  state = {
    is_comment_edit_active: false,
    sub_comment: '',
    is_posting_reply: false,
    is_posting_edited_reply: null,
    reply_edit_active_index: null,
    reply_edit_active_index_last: null,
    sub_comment_edit: '',
    edited_comment: '',
    deleting_reply: false,
    delete_reply_index: null,
    deleting_comment: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      comment_delete_succeeded,
      comment_delete_failed,
      reply_delete_succeeded,
      reply_delete_failed,
    } = this.props;

    if (
      this.props.new_reply_post_succeeded &&
      prevProps.new_reply_post_succeeded !== this.props.new_reply_post_succeeded
    ) {
      this.setState({ is_posting_reply: false, is_posting_edited_reply: null });
    }

    if (
      (reply_delete_succeeded &&
        reply_delete_succeeded !== prevProps.reply_delete_succeeded) ||
      (reply_delete_failed &&
        reply_delete_failed !== prevProps.reply_delete_failed)
    ) {
      this.setState({ deleting_reply: false, delete_reply_index: null });
    }

    if (
      (comment_delete_succeeded &&
        comment_delete_succeeded !== prevProps.comment_delete_succeeded) ||
      (comment_delete_failed &&
        comment_delete_failed !== prevProps.comment_delete_failed)
    ) {
      this.setState({ deleting_comment: false });
    }
  }

  handleReplyChange = (content) => {
    this.setState({ sub_comment: content });
  };

  postReply = (link, content, recipients = []) => {
    if (!content) {
      return warnEmptyContent();
    }
    this.toggleLoader(true);
    this.props.postReply(
      link,
      content,
      recipients,
      this.props.secondary,
      this.props.discussion_index
    );
  };

  handleReplyEditComment = (link) => {
    let { sub_comment_edit } = this.state;
    this.setState({ is_posting_edited_reply: true });
    this.postReply(link, sub_comment_edit);
    this.setState((state) => ({
      reply_edit_active_index_last: state.reply_edit_active_index,
      reply_edit_active_index: null,
      sub_comment_edit: '',
    }));
    setTimeout(
      () =>
        this.setState({
          reply_edit_active_index_last: null,
        }),
      1000
    );
  };

  handleCommentEditPost = (link) => {
    let { edited_comment } = this.state;
    this.setState({ is_posting_edited_reply: true });
    this.postReply(link, edited_comment);
    this.handleCommentEditCancel();
  };

  getCollaborator = (id) => {
    const collab = [];
    this.props.collaborators_list.forEach((user) => {
      if (user.user_id === id) {
        collab.push(<Avatar user={user} />);
      }
    });
    return collab;
  };

  getReplyCollaborator = (id) => {
    const collab = [];
    this.props.collaborators_list.forEach((user) => {
      if (user.user_id === id) {
        if (user.profile_pic_url) {
          collab.push(
            <>
              <img
                className="comment-card__profile-pic comment-card__profile-pic--1"
                src={user.profile_pic_url}
                alt=""
              />
              {/*<div className="comment-card__reply-creator">{user.name}</div>*/}
            </>
          );
        } else {
          collab.push(
            <>
              <div
                className="comment-card__initials  comment-card__initials--1"
                // style={{ backgroundColor: user.profile_color }}
              >
                {getInitials(user.name)}
              </div>
              {/*<div className="comment-card__reply-creator">{user.name}</div>*/}
            </>
          );
        }
      }
    });
    return collab;
  };

  handleReplyEdit = (reply_index, comment) => {
    this.setState({
      reply_edit_active_index: reply_index,
      sub_comment_edit: comment,
    });
  };

  handleCommentEdit = (comment) => {
    this.setState({ is_comment_edit_active: true, edited_comment: comment });
  };

  handleReplyEditCancel = () => {
    this.setState({
      reply_edit_active_index_last: null,
      reply_edit_active_index: null,
      sub_comment_edit: '',
    });
  };

  handleCommentEditCancel = () => {
    this.setState({ is_comment_edit_active: false, edited_comment: '' });
  };

  handleReplyDelete = (link, reply_index) => {
    this.setState({
      deleting_reply: true,
      delete_reply_index: reply_index - 1,
    });
    this.props.deleteReply(
      link,
      this.props.secondary,
      this.props.discussion_index,
      reply_index
    );
  };

  handleCommentDelete = (link) => {
    this.setState({ deleting_comment: true });
    this.props.deleteDiscussion(
      link,
      this.props.secondary,
      this.props.discussion_index
    );
  };

  handleReplyEditChange = (content) => {
    this.setState({ sub_comment_edit: content });
  };

  handleCommentEditChange = (content) => {
    this.setState({ edited_comment: content });
  };

  getCommentText = (comment) => {
    if (comment.status === 'EDITED') {
      let index = comment.comment.lastIndexOf('<');
      let edited_content =
        comment.comment.substring(0, index) +
        " &nbsp; &nbsp;<span style='opacity: .5'>(edited)</span> " +
        comment.comment.substring(index, comment.comment.length);
      return edited_content;
    } else {
      return comment.comment;
    }
  };

  toggleLoader = (is_posting_reply) => this.setState({ is_posting_reply });

  render() {
    const { comment } = this.props;
    const logged_in_uid = parseInt(getUserIdFromProfile());

    const {
      is_posting_reply,
      reply_edit_active_index,
      reply_edit_active_index_last,
      sub_comment_edit,
      is_posting_edited_reply,
      is_comment_edit_active,
      edited_comment,
      deleting_comment,
      deleting_reply,
      delete_reply_index,
    } = this.state;

    return (
      <div className="comment-card">
        <div className="comment-card__main-comment-wrapper">
          <div className="comment-card__username-wrapper">
            {this.getCollaborator(
              comment.comments && comment.comments[0].author
            )}
            {deleting_comment ? (
              <div className="comment-card__reply-comment-loader--1">
                <ClipLoader
                  css={override}
                  sizeUnit={'rem'}
                  size={2}
                  color={'var(--highlight-primary)'}
                  loading={deleting_comment}
                />
              </div>
            ) : (
              comment.comments[0].author === logged_in_uid &&
              !is_comment_edit_active && (
                <div className="comment-card__action-icons">
                  {/*<EditIcon*/}
                  {/*  className="comment-card__edit-icon"*/}
                  {/*  onClick={() =>*/}
                  {/*    this.handleCommentEdit(comment.comments[0].comment)*/}
                  {/*  }*/}
                  {/*/>*/}
                  {/*<DeleteIcon*/}
                  {/*  className="comment-card__delete-icon"*/}
                  {/*  onClick={() =>*/}
                  {/*    this.handleCommentDelete(comment._links.delete_discussion)*/}
                  {/*  }*/}
                  {/*/>*/}
                </div>
              )
            )}
          </div>
          {is_comment_edit_active ? (
            <div className="comment-card__reply-wrapper comment-card__reply-wrapper--1">
              <div className="comment-card__text-input-wrapper">
                <Editor
                  content={edited_comment}
                  handleContentChange={this.handleCommentEditChange}
                />
              </div>
              <div className="comment-card__buttons-wrapper comment-card__buttons-wrapper--1">
                <button
                  className="button button--primary button--2"
                  onClick={this.handleCommentEditCancel}
                >
                  Cancel
                </button>
                <button
                  className="button button--secondary"
                  disabled={edited_comment === ''}
                  onClick={() =>
                    this.handleCommentEditPost(
                      comment.comments[0]._links.edit_comment
                    )
                  }
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="comment-card__comment">
              {!is_comment_edit_active ? (
                <EditorView
                  content={this.getCommentText(comment.comments[0])}
                />
              ) : (
                <div className="comment-card__reply-comment-loader">
                  <ClipLoader
                    css={override}
                    sizeUnit={'rem'}
                    size={2}
                    color={'var(--highlight-primary)'}
                    loading={is_comment_edit_active}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        {comment.comments.length > 1 && (
          <div className="comment-card__replies-wrapper">
            {comment.comments.slice(1).map((reply, index) => {
              const is_user = logged_in_uid === reply.author;
              const is_reply_edit_active = reply_edit_active_index === index;
              const is_reply_edit_active_last =
                reply_edit_active_index_last === null
                  ? null
                  : reply_edit_active_index_last === index;
              const is_delete_reply_index = delete_reply_index === index;
              return (
                <div
                  className={cx('comment-card__reply-card', {
                    'comment-card__reply-card--1': is_reply_edit_active,
                  })}
                >
                  <div
                    className={cx('comment-card__reply-creator-wrapper', {
                      'comment-card__reply-creator-wrapper--1':
                        is_reply_edit_active,
                    })}
                  >
                    {this.getReplyCollaborator(reply.author)}
                    {!(is_delete_reply_index && deleting_reply) ? (
                      is_user &&
                      !is_reply_edit_active && (
                        <div className="comment-card__reply-icons-wrapper">
                          {/*<EditIcon*/}
                          {/*  className="comment-card__reply-edit-icon"*/}
                          {/*  onClick={() =>*/}
                          {/*    this.handleReplyEdit(index, reply.comment)*/}
                          {/*  }*/}
                          {/*/>*/}
                          {/*<DeleteIcon*/}
                          {/*  className="comment-card__reply-delete-icon"*/}
                          {/*  onClick={() =>*/}
                          {/*    this.handleReplyDelete(*/}
                          {/*      reply._links.delete_comment,*/}
                          {/*      index + 1*/}
                          {/*    )*/}
                          {/*  }*/}
                          {/*/>*/}
                        </div>
                      )
                    ) : (
                      <div className="comment-card__reply-comment-loader--1">
                        <ClipLoader
                          css={override}
                          sizeUnit={'rem'}
                          size={2}
                          color={'var(--highlight-primary)'}
                          loading={deleting_reply}
                        />
                      </div>
                    )}
                  </div>
                  {is_reply_edit_active ? (
                    <div className="comment-card__reply-wrapper comment-card__reply-wrapper--1">
                      <div className="comment-card__text-input-wrapper">
                        <Editor
                          content={sub_comment_edit}
                          handleContentChange={this.handleReplyEditChange}
                        />
                      </div>
                      <div className="comment-card__buttons-wrapper comment-card__buttons-wrapper--1">
                        <button
                          className="button button--primary button--2"
                          onClick={this.handleReplyEditCancel}
                        >
                          Cancel
                        </button>
                        <button
                          className="button button--secondary"
                          disabled={sub_comment_edit === ''}
                          onClick={() =>
                            this.handleReplyEditComment(
                              reply._links.edit_comment
                            )
                          }
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="comment-card__reply-comment">
                      {(is_posting_edited_reply === null ||
                        is_reply_edit_active_last === null ||
                        is_reply_edit_active_last === false) &&
                      is_reply_edit_active_last !== true ? (
                        <EditorView content={this.getCommentText(reply)} />
                      ) : (
                        <div className="comment-card__reply-comment-loader">
                          <ClipLoader
                            css={override}
                            sizeUnit={'rem'}
                            size={2}
                            color={'var(--highlight-primary)'}
                            loading={
                              is_posting_edited_reply ||
                              is_reply_edit_active_last
                            }
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            {is_posting_reply && (
              <div className="reply-loader">
                <ClipLoader
                  css={override}
                  sizeUnit={'rem'}
                  size={2}
                  color={'var(--highlight-primary)'}
                  loading={is_posting_reply}
                />
              </div>
            )}
          </div>
        )}
        <ReplyComment comment={comment} onSubmit={this.postReply} />
      </div>
    );
  }
}

export default CommentCard;
