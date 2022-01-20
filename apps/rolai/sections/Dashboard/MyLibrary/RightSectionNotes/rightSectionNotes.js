import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateDashboardNoteFilter } from '../../../../store/dashboard/actions';
import CardSkeleton from '../../CardSkeleton/CardSkeleton';
import { NoSearchResult } from '../../Components/DashboardComponents/DashboardComponents';
import { CourseTitleComponent } from '../CommonComponents/CommonComponents';
import LessonNote from '../LessonNote/LessonNote';
import useStyles from './rightSectionNotes.styles';

const RightSectionNotes = ({}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [filtered, setFiltered] = useState([]);
  const { dashboard_all_notes, dashboard_all_notes_requested, note_filter } =
    useSelector((state) => state.dashboard);

  const onChange = (e) => {
    dispatch(
      updateDashboardNoteFilter({ ...note_filter, searchValue: e.target.value })
    );
  };
  const onSelect = (index) => {
    dispatch(
      updateDashboardNoteFilter({ ...note_filter, selectedLesson: index })
    );
  };

  useEffect(() => {
    dashboard_all_notes.length > 0 &&
      dashboard_all_notes[note_filter.selected]?.notes &&
      setFiltered(() => [
        ...dashboard_all_notes[note_filter.selected].notes
          .map((lesson, k) => ({
            ...lesson,
            general_notes: lesson.lesson_title
              .toLowerCase()
              .includes(note_filter.searchValue.toLowerCase())
              ? lesson.general_notes
              : lesson.general_notes.filter((i, k) =>
                  i.note_body
                    .toLowerCase()
                    .includes(note_filter.searchValue.toLowerCase())
                ),
          }))
          .filter((i, k) => i.general_notes && i.general_notes.length > 0),
      ]);
  }, [
    note_filter.searchValue,
    note_filter.selected,
    JSON.stringify(dashboard_all_notes),
  ]);

  return dashboard_all_notes_requested ? (
    <Box className={styles.parent}>
      <CardSkeleton sx={{ marginTop: 5 }} />
      <CardSkeleton height={420} sx={{ marginTop: 5 }} />
    </Box>
  ) : (
    <Card className={styles.parent}>
      <CourseTitleComponent
        type={
          dashboard_all_notes[note_filter.selected] &&
          dashboard_all_notes[note_filter.selected].type
        }
        value={note_filter.searchValue}
        onChange={onChange}
        heading={
          dashboard_all_notes[note_filter.selected] &&
          dashboard_all_notes[note_filter.selected].resource_name
        }
      />

      <Box className={styles.rightBody}>
        {filtered && filtered.length === 0 && note_filter.searchValue ? (
          <NoSearchResult />
        ) : (
          filtered.map((lesson, k) => (
            <LessonNote
              key={lesson.resource_id}
              lesson={lesson}
              index={k}
              course_id={dashboard_all_notes[note_filter.selected]?.resource_id}
              searchValue={note_filter.searchValue}
              onSelect={() => onSelect(k)}
              selected={note_filter.selectedLesson === k}
            />
          ))
        )}
      </Box>
    </Card>
  );
};

export default RightSectionNotes;
