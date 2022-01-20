import { Card, Tab, Tabs, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getDashboardHomeLessons,
  getDashboardHomeNotes,
} from '../../../../store/dashboard/actions';
import { courseType } from '../../../../utils/constants/components';
import CardSkeleton from '../../CardSkeleton/CardSkeleton';
import { EmptyScreen } from '../../Components/DashboardComponents/DashboardComponents';
import HeaderComponent from '../../Components/Header/header';
import useStyles from './LibraryComponent.styles';

const LibraryComponent = () => {
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = React.useState('note');
  const dispatch = useDispatch();
  const { my_profile, my_profile_succeeded } = useSelector(
    (state) => state.auth
  );
  const {
    dashboard_home_notes,
    dashboard_home_lessons,
    dashboard_home_lessons_requested,
    dashboard_home_notes_requested,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getDashboardHomeNotes());
      dispatch(getDashboardHomeLessons());
    }
  }, [my_profile_succeeded]);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <Box className={styles.parent}>
      <HeaderComponent
        title={'MY LIBRARY'}
        link={
          (dashboard_home_notes.lesson_title || dashboard_home_lessons.title) &&
          '/dashboard/my-library'
        }
      />
      <Card className={styles.card}>
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            textColor="primary"
            sx={{ minHeight: 'initial' }}
            indicatorColor="primary"
            aria-label="secondary tabs example"
          >
            <Tab value="note" label="Notes" className={styles.tab} />
            <Tab value="lesson" label="Saved Lessons" className={styles.tab} />
          </Tabs>
          {dashboard_home_notes_requested ? (
            <CardSkeleton height={'18vh'} sx={{ marginTop: 2 }} />
          ) : (
            <Box marginTop={'1.43vh'}>
              {selectedTab === 'note' ? (
                <Box>
                  {dashboard_home_notes.lesson_title ? (
                    <Box>
                      <Tooltip
                        title={
                          (dashboard_home_notes &&
                            dashboard_home_notes.resource_name) ||
                          ''
                        }
                        placement="top"
                        arrow
                      >
                        <Box className={styles.heading}>
                          {dashboard_home_notes &&
                            dashboard_home_notes.resource_name}
                        </Box>
                      </Tooltip>

                      <Box className={styles.lessonTitle}>
                        {dashboard_home_notes.note_parent &&
                          courseType[dashboard_home_notes.note_parent] &&
                          courseType[dashboard_home_notes.note_parent]
                            .icon1 && (
                            <Box
                              minWidth={'1.6vh'}
                              height={'1.6vh'}
                              className={styles.img}
                            >
                              <Image
                                src={
                                  courseType[dashboard_home_notes.note_parent]
                                    .icon1
                                }
                              />
                            </Box>
                          )}
                        <span>{dashboard_home_notes.lesson_title}</span>
                      </Box>

                      <Box className={styles.description}>
                        {dashboard_home_notes.general_notes &&
                          dashboard_home_notes.general_notes[0]?.note_body}
                      </Box>
                      <Box className={styles.ago}>
                        {dashboard_home_notes.general_notes &&
                          dashboard_home_notes.general_notes[0]?.time_ago}
                      </Box>
                    </Box>
                  ) : (
                    <EmptyScreen name={'NOTES'} imgWidth={'7vh'} />
                  )}
                </Box>
              ) : (
                <Box>
                  {dashboard_home_lessons.title ? (
                    <Box>
                      <Tooltip
                        title={
                          (dashboard_home_lessons &&
                            dashboard_home_lessons.resource_name) ||
                          ''
                        }
                        placement="top"
                        arrow
                      >
                        <Box className={styles.heading}>
                          {dashboard_home_lessons &&
                            dashboard_home_lessons.resource_name}
                        </Box>
                      </Tooltip>

                      <Box className={styles.lessonTitle}>
                        {dashboard_home_lessons.note_parent &&
                          courseType[dashboard_home_lessons.note_parent]
                            .icon1 && (
                            <Box
                              minWidth={'1.6vh'}
                              height={'1.6vh'}
                              className={styles.img}
                            >
                              <Image
                                src={
                                  courseType[dashboard_home_lessons.note_parent]
                                    .icon1
                                }
                              />
                            </Box>
                          )}
                        <span>
                          {dashboard_home_lessons &&
                            dashboard_home_lessons.title}
                        </span>
                      </Box>
                    </Box>
                  ) : (
                    <EmptyScreen name={'SAVED_LESSON'} imgWidth={'7vh'} />
                  )}
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default LibraryComponent;
