import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Image from 'next/image';
import React from 'react';

import {
  CollateralIcon,
  DataCasesIcon,
  QuizzesIcon,
} from '../../../common/images';
import useStyles from './Assessment.styles';

const Assessment = ({}) => {
  const styles = useStyles();
  return (
    <Box className={styles.assessment}>
      <Typography variant="h4" pb={2}>
        Assessment
      </Typography>
      <Typography variant="body2" pb={3}>
        Your performance in this applied course drives your grading and
        eligibility to get a certificate, up on your successful completion of
        the course.
      </Typography>
      <Typography variant="subtitle2">
        To get a certificate-
      </Typography>
      <Box>
        <Card className={styles.root}>
          <CardContent>
            <Box className={styles.assesmentDetails}>
              <Typography component="div" className={styles.assesmentImage}>
                <Image src={DataCasesIcon} width={20} height={20} />
              </Typography>
              <Typography component="div" className={styles.assesmentContent}>
                <Typography variant="subtitle2">{'Data Cases'}</Typography>
                <Typography
                  variant="caption"
                  component="p"
                  pb={2}
                >
                  {'You have to attempt all data cases'}
                </Typography>
              </Typography>
            </Box>
            <Box className={styles.assesmentDetails}>
              <Typography component="div" className={styles.assesmentImage}>
                <Image src={QuizzesIcon} width={20} height={20} />
              </Typography>

              <Typography component="div" className={styles.assesmentContent}>
                <Typography variant="subtitle2">{'Quizzes'}</Typography>
                <Typography
                  variant="caption"
                  component="p"
                  pb={2}
                >
                  {'Answer all the questions and complete quizzes'}
                </Typography>
              </Typography>
            </Box>
            <Box className={styles.assesmentDetails}>
              <Typography component="div" className={styles.assesmentImage}>
                <Image src={CollateralIcon} width={20} height={20} />
              </Typography>

              <Typography component="div" className={styles.assesmentContent}>
                <Typography variant="subtitle2">
                  {'Content Collateral'}
                </Typography>
                <Typography
                  variant="caption"
                  component="p"
                  pb={2}
                >
                  {
                    'Post completing the content collateral that cover the explained concepts'
                  }
                </Typography>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Typography variant="body2" py={4}>
        Unlike other assessment frameworks, LEAPS takes into account your
        understanding of the covered concepts, their successful application on
        the contextual Data Cases and attempt of the quizzes. The algorithm
        driven assessment engine takes into account your learning journey
        throughout the course, your approach to apply covered concepts on Data
        Cases and the quiz attempts, to calculate your score and decide on the
        certificate eligibility.
      </Typography>
      <Typography variant="h6" fontSize={14}>
        {' '}
        Happy Learning by Doing!
      </Typography>
    </Box>
  );
};
export default Assessment;
