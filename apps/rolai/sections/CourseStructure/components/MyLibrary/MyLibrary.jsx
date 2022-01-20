import { MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Chip from '@mui/material/Chip';
import MuiInput from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import cx from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import deleteIcon from '../../../../assets/Dashboard/My-Library/delelte.svg';
import editIcon from '../../../../assets/Dashboard/My-Library/edit.svg';
import {
  DatasetsIcon,
  QuizIcon,
  ReadingMaterialIcon,
  VideosIcon,
} from '../../../../common/images';
import CustomButton from '../../../../components/Button';
import DialogView from '../../../../components/DialogView/DialogView';
import {
  deleteCourseNote,
  deleteLessonNote,
  getCourseBookmarks,
  getCourseNotes,
  updateCourseNote,
  updateCourseNotes,
  updateLessonNote,
} from '../../../../store/courses/actions';
import { courseType } from '../../../../utils/constants/components';
import CourseDetailsCard from '../../../CourseDetails/CourseDetailsCard/CourseDetailsCard';
import { InfoBox } from '../../../CourseDetails/CourseDetailsCard/CourseDetailsCard';
import CardSkeleton from '../MyLibrary/Skeleton/Skeleton';
import SavedLesson from '../SavedLesson/SavedLesson';
import useStyles from './MyLibrary.styles';
import StepNote from './StepNote/StepNote';
const notesTypes = [
  { label: 'General Notes', value: 'general_notes' },
  { label: 'Step Notes', value: 'step_notes' },
];
const MyLibrary = ({ course_id }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { course_notes, course_notes_succeeded, course_bookmarks } =
    useSelector((state) => state.courses);
  const { my_profile_succeeded } = useSelector((state) => state.auth);

  const [selected, setSelected] = useState('notes');

  const [notesItemSelected, setNotesItemSelected] = useState('');
  const [selectedNoteType, setSelectedNoteType] = useState('general_notes');
  const notesSelected = selected === 'notes';
  const lessonsSelected = selected === 'lessons';
  let lessonsCount = 0;
  if (course_bookmarks) {
    if (course_bookmarks?.VIDEO?.length) {
      lessonsCount += course_bookmarks.VIDEO.length;
    }
    if (course_bookmarks?.PDF?.length) {
      lessonsCount += course_bookmarks.PDF.length;
    }
  }

  useEffect(() => {
    if (course_id && my_profile_succeeded) {
      dispatch(getCourseNotes(course_id));
      dispatch(getCourseBookmarks(course_id));
    }
  }, [course_id, my_profile_succeeded]);
  useEffect(() => {
    if (course_notes_succeeded) {
      setNotesItemSelected(0);
    }
  }, [course_notes_succeeded]);

  useEffect(() => {
    !getNotes(selectedNoteType)[0] && toggleNoteType();
  }, [notesItemSelected]);

  const showStepNotes = (type) => {
    return type != 'PDF' && type != 'QUIZ' && type != 'VIDEO';
  };
  const getNotes = (val) => {
    return (
      (course_notes[notesItemSelected] &&
        course_notes[notesItemSelected][val] &&
        course_notes[notesItemSelected][val]) ||
      []
    );
  };

  const toggleNoteType = () => {
    selectedNoteType == 'general_notes'
      ? setSelectedNoteType('step_notes')
      : setSelectedNoteType('general_notes');
  };

  const callbackAfterUpdate = () => {
    dispatch(updateCourseNotes(course_id));
  };

  return (
    <Box className={styles.myLibraryContainer}>
      {course_notes_succeeded && (
        <Box display="flex" flex={1} height={70}>
          <ButtonGroup
            className={styles.buttonGroup}
            variant="outlined"
            aria-label="outlined button group"
          >
            <Button
              onClick={() => setSelected('notes')}
              className={notesSelected && styles.buttonSelected}
            >
              Notes{' '}
              <Chip
                className={cx([
                  styles.buttonGroupChip,
                  notesSelected && styles.chipSelected,
                ])}
                label={course_notes.length}
                size="small"
              />
            </Button>
            <Button
              onClick={() => setSelected('lessons')}
              className={lessonsSelected && styles.buttonSelected}
            >
              Saved Lessons{' '}
              <Chip
                className={cx([
                  styles.buttonGroupChip,
                  lessonsSelected && styles.chipSelected,
                ])}
                label={lessonsCount}
                size="small"
              />
            </Button>
          </ButtonGroup>
        </Box>
      )}
      {notesSelected &&
        (course_notes_succeeded ? (
          <Box className={styles.myLibrary}>
            {course_notes.length > 0 ? (
              <>
                <div className={styles.leftPanel}>
                  {course_notes.map((note, i) => (
                    <Box
                      onClick={() => {
                        setNotesItemSelected(i);
                      }}
                      className={cx([
                        styles.noteListItem,
                        notesItemSelected === i && styles.noteListItemSelected,
                      ])}
                      key={i}
                    >
                      <Box className={styles.noteListItemIcon}>
                        <Image
                          src={
                            courseType[note.note_parent]?.icon1 || DatasetsIcon
                          }
                          width={11}
                          height={14}
                        />
                      </Box>
                      <Typography
                        className={cx([
                          styles.noteListItemTitle,
                          notesItemSelected === note &&
                            styles.noteListItemTitleSelected,
                        ])}
                      >
                        {note?.lesson_title}
                      </Typography>
                      <Chip
                        className={styles.buttonGroupChip}
                        label={
                          (course_notes[i]?.general_notes?.length || 0) +
                          (course_notes[i]?.step_notes?.length || 0)
                        }
                        size="small"
                      />
                    </Box>
                  ))}
                </div>
                <div className={styles.rightPanel}>
                  <Box className={styles.notesHeading}>
                    <Box className={styles.notesHeadingIcon}>
                      <Image
                        src={
                          courseType[
                            course_notes[notesItemSelected || 0].note_parent
                          ]?.icon1 || ReadingMaterialIcon
                        }
                        width={16}
                        height={20}
                      />
                    </Box>
                    <Typography className={styles.notesLessonTitle}>
                      {course_notes[notesItemSelected]?.lesson_title}
                    </Typography>
                    <CustomButton
                      onClick={() =>
                        router.push(
                          `/courses/${router?.query?.course_id}/lesson/${course_notes[notesItemSelected].module_seq_id}`
                        )
                      }
                      variant="outlined"
                    >
                      View Lesson
                    </CustomButton>
                  </Box>
                  {showStepNotes(
                    course_notes[notesItemSelected]?.note_parent
                  ) && (
                    <Box paddingBottom={2}>
                      <Select
                        className={`${styles.inputField} ${styles.select}`}
                        value={selectedNoteType}
                        onChange={(e) => setSelectedNoteType(e.target.value)}
                        // displayEmpty
                        // inputProps={{ 'aria-label': 'Without label' }}
                        // MenuProps={MenuProps}
                      >
                        {notesTypes.map((item, k) => (
                          <MenuItem
                            className={styles.menuItem}
                            key={k}
                            value={item.value}
                          >
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  )}
                  {getNotes(selectedNoteType).map((note, k) => (
                    <StepNote
                      key={k}
                      note={note}
                      moduleSeqId={
                        course_notes[notesItemSelected].module_seq_id
                      }
                      callbackAfterUpdate={callbackAfterUpdate}
                      note_type={selectedNoteType}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div>No Notes Added</div>
            )}
          </Box>
        ) : (
          <CardSkeleton />
        ))}
      {lessonsSelected && (
        <Box className={styles.myLibrary}>
          {Object.keys(course_bookmarks?.VIDEO || {}).length > 0 ||
          Object.keys(course_bookmarks?.PDF || {}).length > 0 ? (
            <div>
              {Object.keys(course_bookmarks?.PDF || {}).length > 0 && (
                <>
                  <Box className={styles.heading}>
                    <Image src={ReadingMaterialIcon} width={11} height={14} />
                    <h3>Reading Materials</h3>
                    <Chip
                      className={styles.buttonGroupChip}
                      label={course_bookmarks?.PDF.length}
                      size="small"
                    />
                  </Box>
                  <div className={styles.items}>
                    {course_bookmarks.PDF.map((pdf, i) => (
                      <>
                        <SavedLesson item={pdf} key={i} />
                      </>
                    ))}
                  </div>
                </>
              )}
              {Object.keys(course_bookmarks?.VIDEO || {}).length > 0 && (
                <>
                  <Box className={styles.heading}>
                    <Image src={VideosIcon} width={11} height={14} />
                    <h3>Videos</h3>
                    <Chip
                      className={styles.buttonGroupChip}
                      label={course_bookmarks?.VIDEO.length}
                      size="small"
                    />
                  </Box>
                  <div className={styles.items}>
                    {course_bookmarks.VIDEO.map((video, i) => (
                      <SavedLesson item={video} key={i} type="video" />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div>No Lessons Saved</div>
          )}
        </Box>
      )}
    </Box>
  );
};

export default MyLibrary;
