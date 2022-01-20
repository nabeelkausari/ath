import { NavLayout } from '../../Dashboard/DashboardLayout/dashboardLayout';

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
import {
  accessActiveIco,
  accessIco,
  centerActiveIco,
  centerIco,
  contentActiveIco,
  contentIco,
  dashboardActiveIco,
  dashboardIco,
  profileActiveIco,
  profileIco,
  rosterActiveIco,
  rosterIco,
} from '../../../assets/Admin';

const adminItems = [
  {
    name: 'Dashboard',
    icon: dashboardIco,
    activeIcon: dashboardActiveIco,
    link: '/admin/home',
  },
  {
    name: 'Roster',
    icon: rosterIco,
    activeIcon: rosterActiveIco,
    link: '/admin/roster',
  },
  {
    name: 'Content Management',
    icon: contentIco,
    activeIcon: contentActiveIco,
    link: '/admin/content-management',
  },
  {
    name: 'Access Control',
    icon: accessIco,
    activeIcon: accessActiveIco,
    link: '/admin/access-control',
  },
  {
    name: 'Reporting Center',
    icon: centerIco,
    activeIcon: centerActiveIco,
    link: '/admin/reporting-center',
  },
  {
    name: 'Organization Profile',
    icon: profileIco,
    activeIcon: profileActiveIco,
    link: '/admin/profile',
  },
];

export const AdminLayout = () => {
  return <NavLayout items={adminItems} pageLink="admin" />;
};
