import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import badgeIco from '../../../../assets/Dashboard/Home/badge_icon.svg';
import badge2Ico from '../../../../assets/Dashboard/Home/Badge2.svg';
import perfIco from '../../../../assets/Dashboard/Home/performance_icon.svg';
import perf2Ico from '../../../../assets/Dashboard/Home/Performance2.svg';
import skill2Ico from '../../../../assets/Dashboard/Home/Skill2.svg';
import skillIco from '../../../../assets/Dashboard/Home/skills_icon.svg';
import {
  PALETTE_PRIMARY_MAIN,
  PALETTE_SUCCESS_MAIN,
} from '../../../../config/theme';
import { getDashboardProjects } from '../../../../store/dashboard/actions';
import CardSkeleton from '../../CardSkeleton/CardSkeleton';
import { EmptyScreen } from '../../Components/DashboardComponents/DashboardComponents';
import HeaderComponent from '../../Components/Header/header';
import DiscussionComponent from '../DiscussionComponent/DiscussionComponent';
import InfoCard from '../InfoCard/infoCard';
import LibraryComponent from '../LibraryComponent/LibraryComponent';
import ProjectCard from '../ProjectCard/ProjectCard';
import WeekSection from '../WeekSection/WeekSection';
import useStyles from './rightSection.styles';

const RightSection = ({}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { my_profile, my_profile_succeeded } = useSelector(
    (state) => state.auth
  );
  const { my_projects, my_projects_requested } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getDashboardProjects());
    }
  }, [my_profile_succeeded]);

  const data = {};

  return (
    <Box className={styles.parent}>
      <Box className={styles.topItems}>
        <InfoCard
          icon={skillIco}
          icon2={skill2Ico}
          item={{
            name: 'Skills',
            placeholder: 'No Skills Summary',
            color: PALETTE_SUCCESS_MAIN,
            value: undefined,
          }}
        />
        <InfoCard
          icon={perfIco}
          icon2={perf2Ico}
          item={{
            name: 'Skills',
            placeholder: 'No Performance Summary',
            color: '#F86423',
          }}
        />
        <InfoCard
          icon={badgeIco}
          icon2={badge2Ico}
          item={{
            name: 'Skills',
            placeholder: 'No Badges Earned Yet',
            color: PALETTE_PRIMARY_MAIN,
          }}
        />
      </Box>
      <Box className={styles.projectItems}>
        <HeaderComponent
          title={'MY PROJECTS'}
          link={my_projects[0] && '/dashboard/projects'}
        />
        {my_projects_requested ? (
          <CardSkeleton cards={3} direction="row" />
        ) : my_projects[0] ? (
          <Box className={styles.projectContainer}>
            {my_projects.map((item, k) => (
              <ProjectCard key={k} item={item} />
            ))}
          </Box>
        ) : (
          <EmptyScreen name={'PROJECTS'} />
        )}
      </Box>
      <Box className={styles.spaceBetween}>
        <LibraryComponent />
        <DiscussionComponent />
      </Box>
      <WeekSection />
    </Box>
  );
};

export default RightSection;
