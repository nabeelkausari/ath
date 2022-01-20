import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import cx from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import TabPanel from '../../../../../components/TabPanel/TabPanel';
import Notes from '../../../../CourseStructure/components/Popup/Popup';
import Overview from './Overview';
import Steps from './Steps/Steps';
import StepsFooter from './StepsFooter';
import useStyles from './StepsPanel.styles';

const StepsPanel = ({ stepsOpen, setStepsOpen }) => {
  const styles = useStyles();
  const router = useRouter();
  const [stepsFooterOpen, setStepsFooterOpen] = useState(true);
  const [tabs, setTabs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { lesson_notes, current_lesson } = useSelector(
    (state) => state.courses
  );
  const { functions } = useSelector((state) => state.workspace);

  const function_execution_succeeded = functions?.function_execution_succeeded;

  const is_case = router.query?.project_id !== undefined;
  const is_apply = current_lesson?.type?.toUpperCase() === 'APPLY';

  useEffect(() => {
    if (function_execution_succeeded) {
      setCurrentIndex(!is_case && is_apply ? 1 : 0);
      setTimeout(() => setCurrentIndex(undefined), 1000);
    }
  }, [function_execution_succeeded]);

  useEffect(() => {
    if (stepsOpen) {
      setTimeout(() => setStepsFooterOpen(true), 200);
    } else {
      setStepsFooterOpen(false);
    }
  }, [stepsOpen]);

  useEffect(() => {
    const _tabs = [
      {
        label: StepsLabel,
        body: <Steps />,
        className: cx([
          styles.tabPanelWrapper,
          !is_case && styles.tabPanelWrapperNonProject,
        ]),
      },
      {
        label: NotesLabel,
        body: <Notes />,
        className: cx([
          styles.tabPanelWrapper,
          !is_case && styles.tabPanelWrapperNonProject,
        ]),
      },
    ];
    if (!is_case && is_apply) {
      setTabs([
        {
          label: OverviewLabel,
          body: <Overview />,
          className: cx([
            styles.tabPanelWrapper,
            !is_case && styles.tabPanelWrapperNonProject,
          ]),
        },
        ..._tabs,
      ]);
    } else {
      setTabs(_tabs);
    }
  }, [JSON.stringify(current_lesson)]);

  const StepsLabel = (
    <Box display="flex" alignItems="center">
      <Typography>Steps</Typography>
      {/*{lesson_notes?.general_notes && lesson_notes?.general_notes?.length > 0 && (*/}
      {/*  <Typography className={styles.notesCount} ml={0.5}>*/}
      {/*    {lesson_notes?.general_notes?.length}*/}
      {/*  </Typography>*/}
      {/*)}*/}
    </Box>
  );

  const OverviewLabel = (
    <Box display="flex" alignItems="center">
      <Typography>Overview</Typography>
    </Box>
  );

  const NotesLabel = (
    <Box display="flex" alignItems="center">
      <Typography>Notes</Typography>
      {lesson_notes?.general_notes && lesson_notes?.general_notes?.length > 0 && (
        <Typography className={styles.notesCount} ml={0.5}>
          {lesson_notes?.general_notes?.length}
        </Typography>
      )}
    </Box>
  );
  return (
    <Box
      className={cx([
        styles.stepsPanelWrapper,
        !is_case && styles.stepsPanelWrapperNonProject,
        !stepsOpen && styles.stepsPanelWrapperClosed,
      ])}
    >
      <Box
        onClick={() => setStepsOpen(!stepsOpen)}
        className={cx([
          styles.stepsToggleBtn,
          !stepsOpen && styles.stepsToggleBtnClosed,
        ])}
      >
        <ArrowBackIosIcon
          className={cx([
            styles.stepsToggleIcon,
            !stepsOpen && styles.stepsToggleIconClosed,
          ])}
        />
      </Box>
      <TabPanel currentIndex={currentIndex} tabs={tabs} variant="fullWidth" />
      {stepsFooterOpen && <StepsFooter />}
    </Box>
  );
};

export default StepsPanel;
