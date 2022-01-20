import { Button, InputBase, Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import cx from 'classnames';
import Image from 'next/image';
import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  bellIcon,
  bellPrimaryIcon,
  pinIcon,
  replyIcon,
  sendIco,
} from '../../../../../../assets/Dashboard/Inbox';
import { avatarIco } from '../../../../../../assets/icons';
import avatar from '../../../../../../assets/icons/avatar.svg';
import { PinIcon, PinIconFilled } from '../../../../../../common/images';
import ProfileAvatar from '../../../../../../components/AvatarProfile/Avatar';
import {
  createComment,
  createDiscussion,
  createReply,
  discussionPin,
  getCommentsByPostId,
} from '../../../../../../store/discussions/actions';
import { convertToDateString } from '../../../../../../utils/helpers/helperFunctions';
import { notify } from '../../../../../../utils/helpers/notification';
import CustomInput from '../../../../../Admin/Components/Input/Input';
import {
  Comments,
  SelectLesson,
} from '../../../../../Dashboard/Inbox/CommonComponents/CommonComponents';
import useStyles from './Disscussion.styles';

const Disscussion = ({ data }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { comments, comments_requested } = useSelector(
    (state) => state.discussions
  );
  const [localLoader, setLocalLoader] = useState({});
  const loadComments = () => {
    if (data.totalCommentsCount > 0) dispatch(getCommentsByPostId(data.postId));
  };
  const [replyOpened, setReplyOpened] = useState();
  const sendComment = (comment) => {
    dispatch(createComment(data.postId, { comment }));
    setLocalLoader({ comment: true });
  };

  const sendReply = (comment, id) => {
    dispatch(createReply(data.postId, id, { comment }));
    setReplyOpened(undefined);
    setLocalLoader({ replyId: id });
  };

  const pinFn = () => {
    dispatch(discussionPin(data.postId, !data.pinned));
  };
  useEffect(() => {
    !comments_requested && setLocalLoader({});
  }, [comments_requested]);
  return (
    <Box className={styles.parent}>
      <Box className={styles.profile}>
        <ProfileAvatar user_id={data.author.id} />
      </Box>
      <Box className={styles.body}>
        <Box className={styles.header}>
          <Box sx={{ flex: 1, marginRight: 4 }}>
            <Box className={styles.secondary}>{`${
              data?.author?.name
            } posted on ${convertToDateString(data.createdTime)}`}</Box>
            <Box className={styles.heading}>{data.title}</Box>
          </Box>
          <Box className={styles.actions}>
            <Pin onClick={pinFn} status={data.pinned} />
            <Follow />
          </Box>
        </Box>
        <Box mt={1.5}>
          <Box>{data.content}</Box>
          <Box className={styles.secondary} mt={2}>
            Module (Lesson)
          </Box>
          <Box className={styles.title}>
            {data.courseDetails.moduleName} ({data.courseDetails.lessonName})
          </Box>
        </Box>
        <Box mt={2.8}>
          <Comments
            primary
            count={data.totalCommentsCount || 0}
            onClick={loadComments}
          />
          {comments_requested == data.postId && !comments[data.postId] ? (
            <Box>
              {[1, 2, 3].map((i, k) => (
                <Loader key={k} />
              ))}
            </Box>
          ) : (
            <>
              {[
                ...(comments[data.postId] || [
                  ...(data?.latestComment?.comment
                    ? [data?.latestComment]
                    : []),
                ]),
              ]?.map((item, k) => (
                <>
                  <Box key={k} className={styles.commentBox}>
                    <Box className={styles.profile}>
                      <ProfileAvatar user_id={item.author.id} />
                    </Box>
                    <Box className={styles.commentWrapper}>
                      <Box className={styles.comment}>
                        <Box>{item.author.name}</Box>
                        <Box>{item.comment}</Box>
                      </Box>
                      <Box
                        className={styles.secondary}
                        ml={1}
                        display="flex"
                        alignItems="center"
                        mt={1}
                      >
                        <Box
                          className={styles.reply}
                          display="flex"
                          alignItems="center"
                          onClick={() =>
                            setReplyOpened(
                              item.commentId == replyOpened
                                ? undefined
                                : item.commentId
                            )
                          }
                        >
                          {replyOpened == item.commentId ? (
                            <Box>Cancel</Box>
                          ) : (
                            <>
                              <Box mt={0.3}>
                                <Image src={replyIcon} />
                              </Box>{' '}
                              <Box ml={0.6}>Reply</Box>
                            </>
                          )}
                        </Box>
                        <Box ml={2}>{item.timeAgo}</Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box marginLeft={6}>
                    {replyOpened == item.commentId && (
                      <Box>
                        <InputBlock
                          onSend={(val) => sendReply(val, item.discussionId)}
                        />
                      </Box>
                    )}
                    {localLoader.replyId == item.discussionId && <Loader />}
                    {item.replies?.map((item, k) => (
                      <Box key={k} className={styles.commentBox}>
                        <Box className={styles.profile}>
                          <ProfileAvatar user_id={item.author.id} />
                        </Box>
                        <Box className={styles.commentWrapper}>
                          <Box className={styles.comment}>
                            <Box>{item.author.name}</Box>
                            <Box>{item.reply}</Box>
                          </Box>
                          <Box className={styles.secondary} ml={1}>
                            {item.timeAgo}
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </>
              ))}
              {localLoader.comment && comments[data.postId] && <Loader />}
            </>
          )}

          <InputBlock onSend={sendComment} />
        </Box>
      </Box>
    </Box>
  );
};

const InputBlock = ({ onSend }) => {
  const styles = useStyles();
  const [value, setValue] = useState('');

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      send();
    }
  };

  const send = () => {
    if (value == '' || value == undefined)
      return notify.error('Input Can not be Empty');
    onSend(value);
    setValue('');
  };
  return (
    <Box className={styles.commentBox}>
      <Box className={styles.profile}>
        <ProfileAvatar owner />
      </Box>
      <InputBase
        className={styles.input}
        placeholder="Type Here"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <Button className={styles.sendBtn} variant="contained" onClick={send}>
        <Image src={sendIco} />
      </Button>
    </Box>
  );
};

const Follow = ({ status, onClick }) => {
  const styles = useStyles();
  const icon = status ? bellPrimaryIcon : bellIcon;
  return (
    <Box
      className={cx([
        styles.followBtn,
        status ? styles.following : styles.follow,
      ])}
      onClick={onClick}
    >
      <Box>
        <Image src={icon} />
      </Box>
      <Box ml={0.7}>{status ? 'Following' : 'Follow Thread'}</Box>
    </Box>
  );
};

const Pin = ({ status, onClick }) => {
  const styles = useStyles();
  const icon = status ? PinIconFilled : PinIcon;
  return (
    <Box className={styles.pin} onClick={onClick}>
      <Image src={icon} />
    </Box>
  );
};
export default Disscussion;

export const NewDiscussion = ({ setOpened, course_id }) => {
  const styles = useStyles();
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const { course_structure } = useSelector((state) => state.discussions);

  const post = () => {
    dispatch(createDiscussion(course_id, data, setOpened));
  };
  return (
    <Box className={styles.parent}>
      <Box className={styles.profile}>
        <Image src={avatar} />
      </Box>
      <Box className={styles.body}>
        <CustomInput
          placeholder="Discussion Title"
          boxClass={styles.inputWrapper}
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <CustomInput
          value={data.content}
          onChange={(e) => setData({ ...data, content: e.target.value })}
          placeholder="What's on your mind, Edgar?"
          boxClass={styles.inputWrapper}
          multiline
          rows={3}
        />

        <Box className={styles.bottom}>
          <SelectLesson
            selected={data.lesson}
            onClick={(lesson) =>
              setData({ ...data, moduleSeqId: lesson.moduleSeqId, lesson })
            }
            modules={course_structure?.modules}
          />
          <Button variant="contained" onClick={post}>
            Post
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const Loader = () => {
  return (
    <Box display={'flex'} margin="15px 0">
      <Skeleton
        variant="circular"
        sx={{ marginRight: '15px', width: 35, height: 35 }}
      />
      <Skeleton
        variant="rectangular"
        sx={{ flex: 1, height: 50, borderRadius: '15px !important' }}
      />
    </Box>
  );
};
