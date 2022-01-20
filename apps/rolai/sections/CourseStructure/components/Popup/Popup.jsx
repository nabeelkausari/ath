import CloseIcon from '@mui/icons-material/Close';
import { Chip, Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import MuiInput from '@mui/material/Input';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import deleteIcon from '../../../../assets/Dashboard/My-Library/delelte.svg';
import editIcon from '../../../../assets/Dashboard/My-Library/edit.svg';
import Button from '../../../../components/Button/Button';
import DialogView from '../../../../components/DialogView/DialogView';
import {
  deleteCaseNote,
  saveCaseNote,
  updateCaseNote,
} from '../../../../store/cases/actions';
import {
  clearLessonNotes,
  deleteLessonNote,
  getLessonNotes,
  saveCourseNote,
  toggleCourseNotesPopup,
  updateLessonNote,
} from '../../../../store/courses/actions';
import { isReadOnlyProject } from '../../../../utils/helpers/helperFunctions';
import { getCookie } from '../../../../utils/helpers/storage';
import useStyles from './Popup.styles';

let toDeleteNote = '';

const NoteItem = ({
  selected,
  setSelected,
  note,
  updateNote,
  cancelNote,
  editNote,
  deleteNote,
}) => {
  const styles = useStyles();
  return (
    <>
      {selected.note_id === note.note_id ? (
        <Box className={styles.editNote}>
          <MuiInput
            multiline
            className={styles.input}
            value={selected.note_body}
            onChange={(e) =>
              setSelected({ ...selected, note_body: e.target.value })
            }
            height={200}
            placeholder={'Type Here'}
          />
          <Box className={styles.buttonGroup}>
            <Button
              onClick={() => cancelNote(note)}
              className={styles.primaryButton}
              variant="text"
            >
              Cancel
            </Button>
            <Button
              onClick={() => updateNote(note)}
              className={styles.primaryButton}
            >
              Save
            </Button>
          </Box>
        </Box>
      ) : (
        <Box className={styles.note}>
          <Typography className={styles.noteBody}>{note.note_body}</Typography>
          <Typography className={styles.timeAgo}>{note.time_ago}</Typography>
          <Divider className={styles.divider} />
          <Box className={styles.noteActions}>
            <Image
              src={editIcon}
              onClick={() => editNote(note)}
              color={'grey'}
              className={styles.pointer}
            />

            <Image
              src={deleteIcon}
              onClick={() => deleteNote(note)}
              className={styles.pointer}
              color={'grey'}
            />
          </Box>
        </Box>
      )}
    </>
  );
};
const Popup = () => {
  const styles = useStyles();
  const { query } = useRouter();

  const dispatch = useDispatch();

  const [selected, setSelected] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [newNote, setNewNote] = useState('');

  const { lesson_notes } = useSelector((state) => state.courses);
  const { my_profile_succeeded } = useSelector((state) => state.auth);
  const { project, case_notes } = useSelector((state) => state.cases);

  const read_only = isReadOnlyProject(project);
  useEffect(() => {
    setNewNote('');
  }, [lesson_notes]);
  useEffect(() => {
    return () => {
      dispatch(clearLessonNotes());
    };
  }, []);
  useEffect(() => {
    if (query.course_id && my_profile_succeeded) {
      dispatch(getLessonNotes(query.course_id, query.seq_id));
    }
    if (getCookie('LESSON_TYPE') === 'CODING_CASE') {
      const course_id = getCookie('COURSE_ID');
      const seq_id = getCookie('LESSON_ID');
      dispatch(getLessonNotes(course_id, seq_id));
    }
  }, [query.course_id, my_profile_succeeded]);

  const closePopup = () => {
    dispatch(toggleCourseNotesPopup());
  };

  const noteCallback = () => {
    dispatch(getLessonNotes(query.course_id, query.seq_id));
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };
  const saveNote = () => {
    if (getCookie('LESSON_TYPE') === 'CODING_CASE') {
      dispatch(
        saveCourseNote(
          getCookie('COURSE_ID'),
          {
            noteBody: newNote,
            moduleSeqId: getCookie('LESSON_ID'),
          },
          noteCallback
        )
      );
    } else if (query?.project_id) {
      dispatch(saveCaseNote({ noteBody: newNote }));
      setNewNote('');
      setSelected({});
    } else {
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
    }
  };

  const edit = (note) => {
    setSelected(note);
  };
  const openModalView = (note) => {
    toDeleteNote = note;
    setOpenModal(true);
  };

  const deleteNote = () => {
    query.project_id
      ? dispatch(deleteCaseNote(toDeleteNote._links.delete_note, toDeleteNote))
      : dispatch(
          deleteLessonNote(toDeleteNote._links.delete_note, toDeleteNote)
        );
  };
  const update = (note) => {
    query.project_id
      ? dispatch(
          updateCaseNote(note._links.edit_note, {
            noteBody: selected.note_body,
          })
        )
      : dispatch(
          updateLessonNote(note._links.edit_note, {
            noteBody: selected.note_body,
            moduleSeqId: query.seq_id,
          })
        );
    setSelected({});
  };

  const cancel = () => {
    setSelected({});
  };

  const notes = query.project_id
    ? case_notes
    : lesson_notes?.general_notes || [];

  return (
    <Card className={styles.baseCard}>
      {!read_only && (
        <Box className={styles.header}>
          <Box
            display="flex"
            flex={1}
            justifyContent="space-between"
            mb={'10px'}
          >
            <Typography xs={10} variant="subtitle2" fontSize={14}>
              Add Note
            </Typography>

            <CloseIcon onClick={closePopup} className={styles.pointer} />
          </Box>

          <Box>
            <MuiInput
              multiline
              className={styles.input}
              height={90}
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder={'Type Here'}
            />
            <Box className={styles.buttonGroup}>
              <Button onClick={saveNote} className={styles.primaryButton}>
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      <Box display="flex" margin={'8px 20px'}>
        <Typography xs={10} variant="subtitle2" mr={1}>
          Saved Notes
        </Typography>
        {notes && notes.length > 0 && (
          <Chip
            label={notes && notes.length}
            className={styles.chip}
            size="small"
          />
        )}
      </Box>
      <Box>
        {notes &&
          notes.map((note, k) => (
            <NoteItem
              key={k}
              note={note}
              selected={selected}
              deleteNote={openModalView}
              cancelNote={cancel}
              editNote={edit}
              updateNote={update}
              setSelected={setSelected}
            />
          ))}
      </Box>

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
    </Card>
  );
};

export default Popup;
