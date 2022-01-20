import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MuiInput from '@mui/material/Input';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import deleteIcon from '../../../../assets/Dashboard/My-Library/delelte.svg';
import editIcon from '../../../../assets/Dashboard/My-Library/edit.svg';
import videoIcon from '../../../../assets/Dashboard/My-Library/Video.svg';
import DialogView from '../../../../components/DialogView/DialogView';
import {
  deleteDashboardNote,
  updateDashboardNote,
} from '../../../../store/dashboard/actions';
import { courseType } from '../../../../utils/constants/components';
import { notify } from '../../../../utils/helpers/notification';
import useStyles from './LessonNote.styles';

const LessonNote = ({
  lesson = {},
  searchValue,
  selected,
  onSelect,
  course_id,
  index,
}) => {
  const styles = useStyles();
  const router = useRouter();

  return (
    <Box
      className={styles.parent}
      onClick={onSelect}
      id={`lesson-box-${index}`}
    >
      <Box className={styles.parentIcon}>
        {courseType[lesson.note_parent].icon1 && (
          <Image
            src={courseType[lesson.note_parent].icon1}
            height={17}
            width={17}
          />
        )}
      </Box>
      <Box className={styles.parentBody}>
        <Box className={styles.header}>
          <Box className={styles.heading}>
            <Box className={[selected && styles.selectedNote]}>
              {lesson.lesson_title}
            </Box>
            <Box className={styles.count}>
              {lesson.general_notes.length} Notes
            </Box>
          </Box>
          <Action course_id={course_id} lesson={lesson} />
        </Box>
        <Box className={styles.allNotes}>
          {lesson.general_notes.map((note, k) => (
            <Note
              key={k}
              note={note}
              selected={selected}
              module_seq_id={lesson.module_seq_id}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LessonNote;

const Action = ({ course_id, lesson }) => {
  const styles = useStyles();
  const router = useRouter();
  let link, text;
  if (lesson.note_parent === 'CASE') {
    link = `/projects/${lesson.sequence}/workspace/${lesson.sequence}/datasets`;
    text = 'Project';
  } else {
    link = `/courses/${course_id}/lesson/${lesson.module_seq_id}`;
    text = 'Lesson';
  }

  return (
    <Box className={styles.viewButton} onClick={() => router.push(link)}>
      View {text}
    </Box>
  );
};

const Note = ({ note: initNote, selected, module_seq_id }) => {
  const styles = useStyles();
  const [note, setNote] = useState({});

  useEffect(() => {
    setNote({
      ...initNote,
      seeMore: initNote.note_body.length > 200,
      selected: false,
    });
  }, [initNote]);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const edit = () => {
    setNote({ ...note, selected: true });
  };
  const openModalView = (note) => {
    setOpenModal(true);
  };

  const deleteNote = () => {
    dispatch(deleteDashboardNote(note._links.delete_note));
  };
  const update = (note) => {
    if (note.note_body == '' || !note.note_body) {
      setNote({ ...note, note_body: initNote.note_body, selected: false });
      return notify.error('note cannot be empty');
    }

    dispatch(
      updateDashboardNote(note._links.edit_note, {
        noteBody: note.note_body,
        moduleSeqId: module_seq_id,
      })
    );
    setNote({ ...note, selected: false });
  };

  const cancel = () => {
    setNote({ ...note, note_body: initNote.note_body, selected: false });
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };
  return (
    <Box>
      {note.selected ? (
        <Box className={styles.selected}>
          <Box>
            <MuiInput
              multiline
              className={styles.input}
              value={note.note_body}
              onChange={(e) =>
                setNote({
                  ...note,
                  note_body: e.target.value,
                })
              }
              height={200}
              placeholder={'Type Here'}
            />
            <Box className={styles.buttonGroup}>
              <Button
                onClick={() => cancel(note)}
                className={styles.primaryButton}
                variant="text"
              >
                Cancel
              </Button>
              <Button
                onClick={() => update(note)}
                className={styles.primaryButton}
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className={styles.note}>
          <Box className={styles.noteBody}>
            {note.expanded && note.note_body
              ? note.note_body
              : note.note_body?.slice(0, 200)}
            {note.seeMore && (
              <span
                onClick={() => setNote({ ...note, expanded: !note.expanded })}
              >
                {note.expanded ? 'Show Less' : 'Show More'}
              </span>
            )}
          </Box>
          <Box className={styles.ago}>{note.time_ago}</Box>
          <Box
            className={styles.actions}
            style={{ display: selected && 'block' }}
          >
            <Image src={editIcon} onClick={() => edit()} />
            <Image src={deleteIcon} onClick={() => openModalView()} />
          </Box>
        </Box>
      )}

      <DialogView
        is_dialog_open={openModal}
        hideDialog={handleModalClose}
        dialog_options={{ title: 'Confirmation' }}
        noButton={{ onClick: handleModalClose, text: 'Cancel' }}
        yesButton={{ onClick: deleteNote, text: 'Delete' }}
      >
        <Typography>
          Are you sure you want to delete this note? <br />
          It will be deleted from this course and your library.
        </Typography>
      </DialogView>
    </Box>
  );
};
