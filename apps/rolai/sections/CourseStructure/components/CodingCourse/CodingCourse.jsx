import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';

import useStyles from './CodingCourse.styles';
import CodingCourseHeader from './CodingCourseHeader/CodingCourseHeader';
import ConsolePanel from './ConsolePanel/ConsolePanel';
import DescriptionPanel from './DescriptionPanel/DescriptionPanel';
import CardSkeleton from '../CodingCourse/Skeleton/Skeleton';

const CodingCourse = ({}) => {
  const styles = useStyles();
  const { coding_course:{fetch_case_succeeded} } = useSelector((state) => state.courses);

  if (!fetch_case_succeeded) return <Box className={styles.coding_container}><CardSkeleton /></Box>;

  return (
    <Box className={styles.coding_container}>
      <CodingCourseHeader />
      <Container disableGutters={true} maxWidth="xl" className={styles.panel}>
        <ConsolePanel />
        <DescriptionPanel />
      </Container>
    </Box>
  );
};

export default CodingCourse;
