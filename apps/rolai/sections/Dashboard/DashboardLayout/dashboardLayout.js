import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Component } from 'react';
import { useSelector } from 'react-redux';

import CalenderIco from '../../../assets/Dashboard/Home/Calendar.svg';
// import CalenderIco from "../../../assets/Dashboard/Home/Calendar.svg"
import CalenderActiveIco from '../../../assets/Dashboard/Home/CalendarActive.svg';
import DashboardIco from '../../../assets/Dashboard/Home/Dashboard.svg';
import DashboardActiveIco from '../../../assets/Dashboard/Home/DashboardActive.svg';
import InboxIco from '../../../assets/Dashboard/Home/inbox.svg';
import InboxActiveIco from '../../../assets/Dashboard/Home/inboxActive.svg';
import MylibraryIco from '../../../assets/Dashboard/Home/Library.svg';
import MylibraryActiveIco from '../../../assets/Dashboard/Home/LibraryActive.svg';
import MycourseIco from '../../../assets/Dashboard/Home/My-Courses.svg';
import MycourseActiveIco from '../../../assets/Dashboard/Home/My-CoursesActive.svg';
import PerformanceIco from '../../../assets/Dashboard/Home/Performance.svg';
import PerformanceActiveIco from '../../../assets/Dashboard/Home/PerformanceActive.svg';
import ProjectsIco from '../../../assets/Dashboard/Home/Project.svg';
import ProjectsActiveIco from '../../../assets/Dashboard/Home/ProjectActive.svg';
import { avatarIco } from '../../../assets/icons';
import avatar from '../../../assets/icons/avatar.svg';
import ActiveLink from '../../../components/ActiveLink/ActiveLink';
import Button from '../../../components/Button/Button';
import useStyles from './dashboardLayout.styles';
// import CalenderActiveIco from "../../../assets/Dashboard/Home/CalendarActive.svg"

const dashboardItems = [
  {
    name: 'Dashboard',
    icon: DashboardIco,
    activeIcon: DashboardActiveIco,
    link: '/dashboard/home',
  },
  {
    name: 'My Courses',
    icon: MycourseIco,
    activeIcon: MycourseActiveIco,
    link: '/dashboard/my-courses/courses',
  },
  {
    name: 'Projects',
    icon: ProjectsIco,
    activeIcon: ProjectsActiveIco,
    link: '/dashboard/projects',
  },
  {
    name: 'Performance',
    icon: PerformanceIco,
    activeIcon: PerformanceActiveIco,
    link: '/dashboard/performance',
  },
  {
    name: 'My Library',
    icon: MylibraryIco,
    activeIcon: MylibraryActiveIco,
    link: '/dashboard/my-library',
  },
  {
    name: 'Calendar',
    icon: CalenderIco,
    activeIcon: CalenderActiveIco,
    link: '/dashboard/calendar',
  },
  {
    name: 'Inbox',
    icon: InboxIco,
    activeIcon: InboxActiveIco,
    link: '/dashboard/inbox/messages/all',
  },
];
export const NavLayout = ({ items, pageLink }) => {
  const styles = useStyles();
  const { asPath, push } = useRouter();
  const { is_logged_in, login_succeeded, my_profile } = useSelector(
    (state) => state.auth
  );
  return (
    <Box className={styles.layout}>
      <Box className={styles.profile}>
        <Avatar alt={my_profile?.name} className={styles.avatar}>
          <Image
            src={
              my_profile?.profile_pic_url
                ? 'https:' + my_profile.profile_pic_url
                : avatarIco
            }
            width={'100%'}
            height={'100%'}
          />
        </Avatar>
        <div className={styles.name}>{my_profile?.name}</div>
        <Box
          className={styles.profileLink}
          onClick={() => push(`/${pageLink}/edit-profile`)}
        >
          Edit Profile
        </Box>
      </Box>
      {items.map((item, k) => {
        const active = asPath === item.link;
        const className = [styles.item, active && styles.active];
        return (
          <Box key={k} className={className} onClick={() => push(item.link)}>
            <Image src={active ? item.activeIcon : item.icon} width={16} />
            <Box pl={1.5}>{item.name}</Box>
          </Box>
        );
      })}
    </Box>
  );
};

export const DashboardLayout = () => {
  return <NavLayout items={dashboardItems} pageLink="dashboard" />;
};
