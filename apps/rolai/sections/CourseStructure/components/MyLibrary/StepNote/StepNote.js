import { Chip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiInput from '@mui/material/Input';
import cx from 'classnames';
import get from 'lodash/get';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Component, useState } from 'react';
import { useDispatch } from 'react-redux';

import deleteIcon from '../../../../../assets/Dashboard/My-Library/delelte.svg';
import editIcon from '../../../../../assets/Dashboard/My-Library/edit.svg';
import DialogView from '../../../../../components/DialogView/DialogView';
import {
  deleteCourseNote,
  saveCourseNote,
  updateCourseNote,
} from '../../../../../store/courses/actions';
import { handleSave } from '../../../../../store/workspace/steps/actions';
import { notify } from '../../../../../utils/helpers/notification';
import useStyles from './StepNote.styles';
let toDeleteNote = {};

const StepNote = ({
  in_workspace = false,
  note,
  moduleSeqId,
  course_id,
  note_type,
  callbackAfterUpdate,
  results,
  secondary,
  notes,
  read_only,
}) => {
  const styles = useStyles();
  const router = useRouter();
  const [selectedNote, setSelectedNote] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const is_case = router.query?.project_id !== undefined;

  const handleModalClose = () => {
    setOpenModal(false);
  };
  const saveNote = () => {
    dispatch(
      saveCourseNote(
        query.course_id,
        {
          noteBody: newNote,
          moduleSeqId: query.seq_id,
        },
        noteCallback
      )
    );
  };

  const edit = (note) => {
    setSelectedNote(note);
  };
  const openModalView = (note) => {
    toDeleteNote = note;
    setOpenModal(true);
  };

  const deleteNote = () => {
    note_type === 'general_notes' &&
      dispatch(
        deleteCourseNote(toDeleteNote._links.delete_note, callbackAfterUpdate)
      );
    note_type === 'step_notes' &&
      dispatch(
        deleteCourseNote(
          toDeleteNote._links.delete_step_note,
          callbackAfterUpdate
        )
      );
  };
  const update = (note) => {
    if (selectedNote.note_body === '' || !selectedNote.note_body)
      return notify.error('note cannot be empty');
    note_type === 'general_notes' &&
      dispatch(
        updateCourseNote(
          note._links.edit_note,
          {
            noteBody: selectedNote.note_body,
            moduleSeqId,
          },
          callbackAfterUpdate
        )
      );
    note_type === 'step_notes' &&
      (is_case
        ? dispatch(
            handleSave(
              results,
              {
                stepNotes: [
                  {
                    sequence: get(notes, 'note.noteDetails.sequence'),
                    note: selectedNote.note_body,
                  },
                ],
              },
              null,
              secondary ? 'secondary' : 'primary'
            )
          )
        : dispatch(
            updateCourseNote(
              note._links.edit_step_note,
              {
                stepNotes: [
                  {
                    note: selectedNote.note_body,
                    sequence: note.sequence,
                  },
                ],
              },
              callbackAfterUpdate
            )
          ));
    setSelectedNote({});
  };

  const cancel = () => {
    setSelectedNote({});
  };
  const editable = () => {
    if (read_only) return false;
    if (note_type === 'general_notes')
      return note.note_id && selectedNote.note_id === note.note_id;
    if (note_type === 'step_notes')
      return (
        (note.sequence && selectedNote.sequence === note.sequence) ||
        note.note === null
      );
  };
  return (
    <Box className={cx([styles.noteItem, styles.outputNoteItem])}>
      {editable() ? (
        <Box>
          <MuiInput
            multiline
            className={styles.input}
            value={selectedNote.note_body}
            onChange={(e) =>
              setSelectedNote({
                ...selectedNote,
                note_body: e.target.value,
              })
            }
            height={200}
            placeholder={'Type Here'}
          />
          <Box className={styles.buttonGroupNote}>
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
      ) : (
        <Box className={styles.note} display="flex">
          {note.sequence && !in_workspace && (
            <Box marginLeft={-1} marginRight={1}>
              <Chip
                className={cx([styles.buttonGroupChip, styles.chipSelected])}
                label={note.sequence}
                size="small"
              />
            </Box>
          )}
          <Box>
            {note.description && (
              <Box className={styles.noteDes}>
                <Box>{note.description}</Box>
              </Box>
            )}
            <Typography className={styles.noteItemBody}>
              {note.note_body}
            </Typography>

            <Typography className={styles.noteItemTime}>
              {note.time_ago}
            </Typography>
            {!read_only && (
              <Box className={styles.noteActions}>
                <Image src={editIcon} onClick={() => edit(note)} />
                <Image src={deleteIcon} onClick={() => openModalView(note)} />
              </Box>
            )}
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

export default StepNote;
