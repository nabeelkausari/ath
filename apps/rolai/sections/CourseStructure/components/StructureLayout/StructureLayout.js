import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../../../components/Layout';
import { clearCourse, getCourse } from '../../../../store/courses/actions';
import ModuleTitleBar from '../ModuleTitleBar/ModuleTitleBar';
import StructureTab from '../StructureTab/StructureTab';

const useStyles = makeStyles((theme) => ({
  layout: {
    backgroundColor: `${theme.palette.background.main} !important`,
    height: '100vh',
    '& .container-holder': {
      backgroundColor: `${theme.palette.background.main} !important`,
    },
  },
  structureLayout: {
    display: 'flex !important',
    justifyContent: 'center',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
}));

function StructureLayout({ children, ...props }) {
  const styles = useStyles();
  const { course } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { my_profile_succeeded } = useSelector((state) => state.auth);

  useEffect(() => {
    if (my_profile_succeeded && query?.course_id) {
      dispatch(getCourse(query.course_id));
    }
  }, [my_profile_succeeded, query.course_id]);

  useEffect(() => {
    return () => dispatch(clearCourse());
  }, []);

  return (
    <div className={styles.layout}>
      <Layout
        isFooter={false}
        maxWidth={false}
        fixed={false}
        title={course.title ? `${course.title} | Rolai` : 'Rolai'}
        container
        className={styles.structureLayout}
        bodyClassName="body-scroll-lock"
      >
        <ModuleTitleBar />
        <Box className={styles.body}>
          <StructureTab {...props}>{children}</StructureTab>
        </Box>
      </Layout>
    </div>
  );
}

export default StructureLayout;
