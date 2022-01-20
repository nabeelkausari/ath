import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Image from 'next/image';
import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import SimpleCard from '../../Components/ProjectCard/SimpleCard/simpleCard';
import dropdownDark from '../../../../assets/icons/dropdown-dark.svg';
import {
  getWhereYouLeft,
  updateDashboardNoteFilter,
} from '../../../../store/dashboard/actions';
import { courseType } from '../../../../utils/constants/components';
import { scrollToId } from '../../../../utils/helpers/helperFunctions';
import CardSkeleton from '../../CardSkeleton/CardSkeleton';
import { EmptyScreen } from '../../Components/DashboardComponents/DashboardComponents';
import HeaderComponent from '../../Components/Header/header';
import SimpleCard from '../../Components/SimpleCard/simpleCard';
import { FilterBar } from '../CommonComponents/CommonComponents';
import useStyles from './leftSectionNotes.styles';

const filterItems = {
  ALL: { name: 'All' },
  LEARNING_TRACK: { name: 'Learning Track' },
  COURSE: { name: 'Courses' },
};

const LeftSectionNotes = ({}) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { my_profile, my_profile_succeeded } = useSelector(
    (state) => state.auth
  );
  const { dashboard_all_notes, dashboard_all_notes_requested, note_filter } =
    useSelector((state) => state.dashboard);

  useEffect(() => {
    if (my_profile_succeeded) {
    }
  }, [my_profile_succeeded]);

  const [filterData, setFilterData] = useState({
    opened: false,
    selected: 'ALL',
    items: [...Object.keys(filterItems)],
  });
  const onSelect = (index) => {
    dispatch(
      updateDashboardNoteFilter({
        ...note_filter,
        selected: index,
        selectedLesson: 0,
        searchValue: '',
      })
    );
  };

  const onSelectLesson = (index) => {
    scrollToId(`lesson-box-${index}`);
    dispatch(
      updateDashboardNoteFilter({ ...note_filter, selectedLesson: index })
    );
  };

  const getNotesCount = (arr) => {
    return arr
      .map((item, k) =>
        [
          ...item.notes.map(
            (i) => (i.general_notes && i.general_notes.length) || 0
          ),
        ].reduce((a, b) => a + b, 0)
      )
      .reduce((a, b) => a + b, 0);
  };

  return (
    <Box className={styles.parent}>
      {dashboard_all_notes[0] && (
        <FilterBar
          heading={`Notes (${
            getNotesCount(
              dashboard_all_notes.filter(
                (i, k) =>
                  i.type === filterData.selected ||
                  filterData.selected === 'ALL'
              )
            ) || 0
          })`}
          filterData={filterData}
          setFilterData={setFilterData}
          filterItems={filterItems}
        />
      )}
      <Box className={styles.container}>
        {dashboard_all_notes
          .filter(
            (i, k) =>
              (i.type === filterData.selected ||
                filterData.selected === 'ALL') &&
              i.notes.some((i) => i.general_notes)
          )
          .map((item, k) => (
            <SimpleCard
              key={k}
              onSelect={() => onSelect(k)}
              selected={k === note_filter.selected}
              item={{
                type: item.type,
                heading: item.resource_name,
              }}
              RightComponent={() =>
                RightComponent({
                  length: [
                    ...item.notes.map(
                      (i) => (i.general_notes && i.general_notes.length) || 0
                    ),
                  ].reduce((a, b) => a + b, 0),
                  selected: k === note_filter.selected,
                })
              }
              ExapandComponent={() =>
                ExpandComponent({
                  lessons: item.notes,
                  onSelectLesson: onSelectLesson,
                  note_filter,
                })
              }
            />
          ))}
      </Box>
    </Box>
  );
};

export default LeftSectionNotes;

const ExpandComponent = ({ lessons, onSelectLesson, note_filter }) => {
  const styles = useStyles();

  return (
    <Box className={styles.bottomComp}>
      {lessons.map((lesson, k) => (
        <Box
          key={k}
          className={[
            styles.lesson,
            note_filter.selectedLesson === k && styles.active,
          ]}
          onClick={(e) => {
            onSelectLesson(k);
            e.stopPropagation();
          }}
        >
          <Box className={styles.lesson_title}>
            {courseType[lesson.note_parent].icon1 && (
              <Box minWidth={18} className={styles.img}>
                {courseType[lesson.note_parent].icon1 && (
                  <Image
                    src={courseType[lesson.note_parent].icon1}
                    width={14}
                    height={12}
                  />
                )}
              </Box>
            )}
            <span>{lesson.lesson_title}</span>
          </Box>
          {/* <Box className={styles.noteCount}>
            {lesson.general_notes?.length} Notes
          </Box> */}
        </Box>
      ))}
    </Box>
  );
};

const RightComponent = ({ length, selected }) => {
  const styles = useStyles();

  return (
    <Box className={styles.rightComp}>
      <Box className={[styles.round, selected && styles.activeRound]}>
        {dropdownDark && <Image src={dropdownDark} />}
      </Box>
      <Box className={styles.noteCount}>{length} Notes</Box>
    </Box>
  );
};
