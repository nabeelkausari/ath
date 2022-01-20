import React, { useState } from 'react';

import Button from '../../../../../../../components/Button';
// import { ReplyIcon } from '../../../../../../../common/images';
import CommentMentions from './CommentMentions';

const ReplyComment = ({ comment, onSubmit }) => {
  const [replyActive, setReplyActive] = useState(false);
  let replyRef;

  const handleReplyComment = () => {
    onSubmit(comment._links.reply_to_discussion, getReply(), getRecipients());
    handleReplyCancel();
  };

  const onReplyClick = () => {
    setReplyActive(true);
  };

  const getReply = () =>
    replyRef && replyRef.getComment && replyRef.getComment();

  const getRecipients = () => {
    return replyRef && replyRef.getRecipients && replyRef.getRecipients();
  };

  const handleReplyCancel = () => {
    setReplyActive(false);
    replyRef && replyRef.clearValue && replyRef.clearValue();
  };

  if (!replyActive) {
    return (
      <div className="comment-card__reply-btn-wrapper">
        <Button
          variant="link"
          className="comment-card__reply-btn"
          onClick={onReplyClick}
        >
          Reply
        </Button>
      </div>
    );
  }
  return (
    <div className="comment-card__reply-wrapper">
      <div className="comment-card__text-input-wrapper">
        <CommentMentions onRef={(ref) => (replyRef = ref)} />
      </div>
      <div className="comment-card__buttons-wrapper">
        <Button
          variant="outlined"
          // className="button button--primary button--1"
          onClick={handleReplyCancel}
        >
          Cancel
        </Button>
        <Button
          // className="button button--secondary"
          onClick={handleReplyComment}
        >
          Reply
        </Button>
      </div>
    </div>
  );
};

export default ReplyComment;
