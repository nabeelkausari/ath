import { LinearProgress, Menu } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { useRouter } from 'next/router';

import {
  CoursesImg,
  CurrentWeekImg,
  DiscussionImg,
  LibraryImg,
  NotesLessonsImg,
  ProjectImg,
} from '../../../../assets/Dashboard/EmptyScreens';
import courseIco from '../../../../assets/Dashboard/My-Library/Course-Hat.svg';
import dropdownDark from '../../../../assets/icons/dropdown-dark.svg';
import noResultsIcon from '../../../../assets/icons/no-results.svg';
import {
  useCourseStyles,
  useDashboardHomeProgressStyles,
  useEmStyles,
  useFilterStyles,
  useProgressStyles,
} from './DashboardComponents.styles';

export const DashboardHomeProgressBar = ({
  value = 30,
  istext = true,
  color = '#2DE352',
  style = { height: '0.78vh', width: '5.85vh' },
}) => {
  const styles = useDashboardHomeProgressStyles();
  return (
    <Box
      className={styles.progress}
      sx={{
        '& .MuiLinearProgress-bar': {
          background: color,
        },
        '& .MuiLinearProgress-root': style,
      }}
    >
      <LinearProgress variant="determinate" value={value} />
      {istext && (
        <Box className={styles.progressText}>{`${Math.round(value)}%`}</Box>
      )}
    </Box>
  );
};

export const ProgressBar = ({
  value = 30,
  istext = true,
  color = '#2DE352',
  style = { height: 6, width: 45 },
}) => {
  const styles = useProgressStyles();
  return (
    <Box
      className={styles.progress}
      sx={{
        '& .MuiLinearProgress-bar': {
          background: color,
        },
        '& .MuiLinearProgress-root': style,
      }}
    >
      <LinearProgress variant="determinate" value={value} />
      {istext && (
        <Box className={styles.progressText}>{`${Math.round(value)}%`}</Box>
      )}
    </Box>
  );
};

export const CourseBlock = ({ value }) => {
  const styles = useCourseStyles();
  return (
    <Box className={styles.parent}>
      <Image src={courseIco} />
      <Box className={styles.detail}>{value}</Box>
    </Box>
  );
};

export const MY_COURSE_FILTER = {
  ALL: 'All',
  IN_PROGRESS: 'In Progress',
  // NOT_STARTED: 'Not Started',
  COMPLETED: 'Completed',
};

export const FilterBlock = ({ filterData = {}, setFilterData, anchor }) => {
  const styles = useFilterStyles();

  return (
    <Box className={styles.parent}>
      <Box className={styles.status}>
        Status: {MY_COURSE_FILTER[filterData.selected]}
      </Box>
      <Box style={{ cursor: 'pointer' }}>
        <Image
          src={dropdownDark}
          width={12}
          id={'MY_COURSE_FILTER'}
          height={12}
          onClick={() =>
            setFilterData({
              ...filterData,
              opened: !filterData.opened,
            })
          }
        />
      </Box>
      <Menu
        className={styles.filterBody}
        id="filter-menu"
        anchorEl={anchor}
        open={filterData.opened}
        transformOrigin={{ horizontal: -10, vertical: -10 }}
        onClose={() =>
          setFilterData({
            ...filterData,
            opened: !filterData.opened,
          })
        }
      >
        {filterData.items.map((item, k) => (
          <div
            key={k}
            className={filterData.selected === item && styles.filterSelected}
            onClick={() =>
              setFilterData({ ...filterData, selected: item, opened: false })
            }
          >
            {MY_COURSE_FILTER[item] || item}
          </div>
        ))}
      </Menu>
    </Box>
  );
};

export const EmptyScreen = ({ name, style, expand, imgWidth = '7vh' }) => {
  const { title, link = {}, image, row = false, card } = emptyScreen[name];
  const router = useRouter();
  const styles = useEmStyles();
  const box = card
    ? {
        background: 'white',
        borderRadius: '1.04vh',
        boxShadow: '0px 0px 2.6vh #00000008',
      }
    : {};
  return (
    <Box
      className={styles.empty}
      style={{
        width: '100%',
        flexDirection: row ? 'row' : 'column',
        justifyContent: row ? 'flex-start' : 'center',
        ...box,
        ...style,
      }}
      sx={{ div: expand ? { margin: 1 } : {} }}
    >
      <Box width={imgWidth} marginRight={row ? '2.6vh' : 0}>
        <Image src={image} height={'100%'} />
      </Box>
      <Box style={{ textAlign: row ? 'left' : 'center' }}>
        <Box className={styles.title}>{title}</Box>
        {link && (
          <Box component="a" href={link.link} className={styles.button}>
            {link.title}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const emptyScreen = {
  SAVED_LESSON: {
    title: (
      <>
        You can bookmark the lessons across courses <br />
        you’re taking, and find them all here.
      </>
    ),
    link: {
      title: 'Explore Courses',
      link: '/my-organization/courses',
    },
    image: LibraryImg,
  },

  NOTES: {
    title: (
      <>
        You can create notes across courses <br />
        you’re taking, and find them all here.
      </>
    ),
    link: {
      title: 'Explore Courses',
      link: '/my-organization/courses',
    },
    image: LibraryImg,
  },
  DISCUSSION: {
    title: (
      <>
        For active courses, you can start a discussion or <br />
        participate in the ones started by others.
      </>
    ),
    link: {
      // title: 'Explore Courses',
      // link: '/my-organization/courses',
    },
    image: DiscussionImg,
  },
  NOTESALL: {
    title: (
      <>
        For The Courses You’re Taking, You Can Add Notes For Any Of
        <br /> The Lessons So You Can Refer To Them Later.
      </>
    ),
    link: {
      title: 'Explore Courses',
      link: '/my-organization/courses',
    },
    image: NotesLessonsImg,
  },
  PROJECTSALL: {
    title: <>You will find the projects you are actively working on here</>,
    link: {
      title: 'Explore Projects',
      link: '/my-organization/projects',
    },
    image: ProjectImg,
  },
  LESSONSALL: {
    title: (
      <>
        Currently, You Have No Saved Lessons. You Can Bookmark The Lessons
        <br />
        Across Courses You’re Taking, And Find Them All Here.
      </>
    ),
    link: {
      title: 'Explore Courses',
      link: '/my-organization/courses',
    },
    image: LibraryImg,
  },
  PROJECTS: {
    title: <>You will find the projects you are actively working on here</>,
    link: {},
    image: ProjectImg,
    row: true,
    card: true,
  },
  WEEK: {
    title: (
      <>
        For your active courses, you will find the weekly schedule to remind
        <br />
        you of upcoming due dates and live lessons.
      </>
    ),
    link: {},
    image: CurrentWeekImg,
    row: true,
    card: true,
  },
  WHERE_LEFT: {
    title: (
      <>
        You can bookmark the lessons across courses <br />
        you’re taking, and find them all here.
      </>
    ),
    link: {
      title: 'Explore Courses',
      link: '/my-organization/courses',
    },
    image: CoursesImg,
    card: true,
  },
  COURSES: {
    title: (
      <>
        Once you enroll in to courses,
        <br /> you will find your active courses here.
      </>
    ),
    link: {
      title: 'Explore Courses',
      link: '/my-organization/courses',
    },
    image: CoursesImg,
  },
  TRACKS: {
    title: (
      <>
        Once you enroll in to Learning Track,
        <br /> you will find your active Learning Tracks here.
      </>
    ),
    link: {
      title: 'Explore Learning Tracks',
      link: '/my-organization/tracks',
    },
    image: CoursesImg,
  },
};

export const NoSearchResult = () => (
  <Box
    display="flex"
    flex={1}
    width="100%"
    height="50vh"
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
  >
    <Image src={noResultsIcon} width={120} height={150} />
    <Box fontSize={24} fontWeight="medium" variant="h4">
      Sorry! No Results Found :(
    </Box>
    <Box fontSize={14} variant="p">
      Please try searching with a different keyword.
    </Box>
  </Box>
);
