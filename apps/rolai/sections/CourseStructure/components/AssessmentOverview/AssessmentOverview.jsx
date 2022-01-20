import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import queryString from 'query-string';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../../components/Button/Button';
import { showDialog } from '../../../../store/global/actions';
import { authorizer } from '../../../../utils/api/auth';
import { fetchLinkAs } from '../../../../utils/api/fetch';
import { notify } from '../../../../utils/helpers/notification';
import {
  getUserIdFromProfile,
  getUserProfileLink,
} from '../../../../utils/helpers/storage';
import AssessmentDetails from '../AssessmentDetails/AssessmentDetails';
import useStyles from './AssessmentOverview.styles';

const AssessmentOverview = () => {
  const styles = useStyles();
  const { course_syllabus_assessments } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const handleAssessment = () => {
    fetchLinkAs(course_syllabus_assessments[0]?._links.self)
      .then((payload) => {
        handleAssessmentRedirection(payload);
      })
      .catch((error) => console.log(error.message));
  };

  const confirmAssessment = () => {
    dispatch(
      showDialog({
        options: {
          title: 'Confirmation',
          message: `Are you sure you want to start assessment? Once assessment start you can’t stop it`,
          yes_button: {
            text: 'Start',
            onClick: () => {
              handleAssessment();
              return true;
            },
          },
          no_button: {
            text: 'Cancel',
          },
          items_centered: true,
        },
      })
    );
  };

  const handleAssessmentRedirection = (data) => {
    const redirect = !(
      window.location.hostname.split('.')[1] === 'rolai' ||
      window.location.hostname.split('.')[1] === 'analyttica' ||
      window.location.hostname.split('.')[0] === 'localhost'
    );
    const authorization = authorizer.getHeader();
    fetch(data['launchUrl'], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        authorization: authorization,
        redirect: redirect,
      },
      body: queryString.stringify(data['parameters']),
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        if (res?.redirectUrl && res['redirectUrl'] !== '') {
          const rolai_link =
            res['redirectUrl'] +
            `&clientId=rolai&profileLink=${JSON.stringify(
              getUserProfileLink()
            )}&userId=${getUserIdFromProfile()}`;
          window.open(rolai_link, '_blank');
        } else {
          notify.error('something went wrong');
        }
      })
      .catch((error) => {
        notify.error('Something went wrong');
      });
  };
  const assessment = course_syllabus_assessments[0];
  return (
    <Box className={styles.assessmentOverview}>
      <Typography variant="h5" fontWeight="300" py={1} fontSize="24">
        Assessment Overview
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        className={styles.overviewSubTitle}
      >
        Unlike other assessment frameworks, Rolai takes into account your
        understanding of the covered concepts, their successful application on
        the contextual Data Cases and attempt of the quizzes. The algorithm
        driven assessment engine takes into account your learning journey
        throughout the course, your approach to apply covered concepts on Data
        Cases and the quiz attempts, to calculate your score and decide on the
        certificate eligibility.
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <AssessmentDetails
            customClass={styles.count}
            assessment={assessment}
          />
          <Button
            onClick={
              assessment.progress_status === 'NOT_STARTED'
                ? confirmAssessment
                : handleAssessment
            }
          >
            {assessment.progress_status === 'NOT_STARTED'
              ? 'Start Assessment'
              : 'View Report'}
          </Button>
        </Box>
      </Typography>
    </Box>
  );
};

export default AssessmentOverview;
