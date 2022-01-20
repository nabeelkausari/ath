import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Popup from '../../../../../sections/CourseStructure/components/Popup/Popup';
import CardSkeleton from '../../../../../sections/CourseStructure/components/Skeleton/Skeleton';
import StructureCard from '../../../../../sections/CourseStructure/components/StructureCard/StructureCard';
import StructureLayout from '../../../../../sections/CourseStructure/components/StructureLayout/StructureLayout';
import StructureList from '../../../../../sections/CourseStructure/components/StructureList/StructureList';
import {
  getCourseSyllabus,
  toggleCourseNotesPopup,
  updateLastAccessTrack,
} from '../../../../../store/courses/actions';

const useStyles = makeStyles((theme) => ({
  listLayoutLeft: {
    minWidth: 420,
    maxWidth: 470,
    backgroundColor: '#FAFBFF',
    zIndex: 1,
    overflow: 'auto',
    height: 'calc(100vh - 182px)',
    // overflow: 'hidden',
    // height: '100%',
    // position: 'fixed',
  },
  listLayoutRight: {
    flex: 1,
    display: 'flex',
    margin: theme.spacing(4, 8),
    // marginLeft: theme.spacing(65),
    justifyContent: 'center',
    background: alpha(theme.palette.common.white, 1),
    height: 'calc(100vh - 248px)',
    overflow: 'auto',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    paddingTop: theme.spacing(1),
    background: alpha(theme.palette.common.white, 1),
  },
}));

function Modules() {
  const dispatch = useDispatch();
  const styles = useStyles();
  const { query } = useRouter();

  const { course_succeeded, course_notes_popup, course_syllabus_succeeded } =
    useSelector((state) => state.courses);

  useEffect(() => {
    if (course_succeeded) {
      dispatch(getCourseSyllabus());
    }
  }, [course_succeeded]);
  useEffect(() => {
    dispatch(toggleCourseNotesPopup(false));
  }, [query.seq_id]);
  useEffect(() => {
    query.course_id && dispatch(updateLastAccessTrack(query.course_id));
  }, [query.course_id]);

  useEffect(() => {
    if (document) {
      document.getElementsByTagName('body')[0].className = 'body-scroll-lock';
    }
    return () => {
      document.getElementsByTagName('body')[0].className = '';
    };
  }, []);
  return (
    <StructureLayout>
      {!course_syllabus_succeeded ? (
        <CardSkeleton />
      ) : (
        <Box className={styles.main}>
          <div className={styles.listLayoutLeft}>
            <StructureList />
          </div>
          <div className={styles.listLayoutRight}>
            <StructureCard />
          </div>
          {course_notes_popup && <Popup />}
        </Box>
      )}
    </StructureLayout>
  );
}

export default Modules;
