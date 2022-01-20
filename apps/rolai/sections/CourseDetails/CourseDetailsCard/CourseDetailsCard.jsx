import { Typography, useMediaQuery } from '@mui/material';
import Container from '@mui/material/Container';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Element, Link } from 'react-scroll';

import CardTitle from '../../../components/CardTitle/CardTitle';
import ContentCount from '../../../components/ContentCount/ContentCount';
import CourseEnroller from '../../../components/Course/CourseEnroller';
import About from '../About/About';
import Accreditation from '../Accreditation/Accreditation';
import Assessment from '../Assessment/Assessment';
import CardDetails from '../CardDetails/CardDetails';
import Instructors from '../Instructors/Instructors';
import ReviewsAndFaq from '../ReviewsAndFaq/ReviewsAndFaq';
import CardSkeleton from '../Skeleton/Skeleton';
import Syllabus from '../Syllabus/Syllabus';
import useStyles from './CourseDetailsCard.styles';

export const InfoBox = ({ isCourseInfo = false, course }) => {
  const styles = useStyles();
  const CourseNav = isCourseInfo ? styles.CourseNav : '';
  const courseNavLink = isCourseInfo ? styles.courseNavLink : '';
  const [navLinks, setNavLinks] = useState([
    { to: 'about', title: 'About' },
    { to: 'syllabus', title: 'Syllabus' },
    { to: 'assessment', title: 'Assessment' },
    { to: 'accreditation', title: 'Accreditation' },
    { to: 'reviews', title: 'Reviews and FAQ' },
  ]);
  useEffect(() => {
    document.getElementsByClassName('nav-links')[0]?.classList.add('active');
    if (course && !course.has_certificate) {
      setNavLinks(navLinks.filter((link) => link.to !== 'accreditation'));
    }
  }, []);

  return (
    <div className={cx(styles.NavFixed, CourseNav)}>
      <Container fixed disableGutters={true} maxWidth="md">
        <nav className={cx(styles.navLink, courseNavLink)}>
          {navLinks.map((link) => (
            <Link
              key={link.title}
              className="nav-links"
              activeClass="active"
              to={link.to}
              spy={true}
              smooth={true}
              offset={-164}
              duration={600}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </Container>
    </div>
  );
};
const TitleBar = ({ course }) => {
  const styles = useStyles();

  return (
    <div className={cx(styles.titleHeader, styles.FixedTitleHeader)}>
      <Typography component="div" className={cx(styles.titleHeader)}>
        <CardTitle title={course?.title} customClass={styles.cardTitle} />
        <ContentCount
          course={course}
          customClass={styles.count}
          displayTitle={false}
        />
      </Typography>
      <CourseEnroller course={course} />
    </div>
  );
};

const CourseDetailsCard = ({ isCourseInfo = false, ...props }) => {
  const styles = useStyles();
  const [showSticky, setShowSticky] = useState(false);
  const courseTab = isCourseInfo ? styles.courseTab : '';
  const xl = useMediaQuery('(min-height:1080px)');
  const { course_succeeded, course, course_syllabus, course_reviews } =
    useSelector((state) => state.courses);

  useScrollPosition(({ currPos }) => {
    if (currPos.y > -550)
      document.getElementsByClassName('nav-links')[0]?.classList.add('active');

    if (currPos.y < -550) {
      setShowSticky(true);
    } else {
      setShowSticky(false);
    }
  });

  if (!course_succeeded)
    return (
      <div>
        <div className={styles.sectionBg}>
          <Container fixed disableGutters={true} maxWidth="md">
            <CardSkeleton />
          </Container>
        </div>
      </div>
    );
  return (
    <div>
      {!isCourseInfo && (
        <>
          <div className={cx(styles.sectionBg, courseTab)}>
            <Container fixed disableGutters={true} maxWidth="md">
              <CardDetails course={course} />
            </Container>
          </div>
          {showSticky && <TitleBar course={course} />}
          <InfoBox course={course} />
        </>
      )}
      <Element
        name="about"
        id="about"
        className={cx(styles.sectionWhiteBg, courseTab)}
      >
        <Container fixed disableGutters={true} maxWidth="sm">
          <About
            title="About this Course"
            material={course?._links?.material}
            overview={course.overview}
          />
        </Container>
      </Element>
      {course_syllabus && (
        <Element
          name="syllabus"
          id="syllabus"
          className={cx(styles.sectionBg, courseTab)}
        >
          <Container fixed disableGutters={true} maxWidth="sm">
            <Syllabus course={course} syllabus={course_syllabus} />
          </Container>
        </Element>
      )}
      {/* <Element
        name="instructors"
        id="instructors"
        className={cx(styles.sectionWhiteBg, courseTab)}
      >
        <Container fixed disableGutters={true} maxWidth="sm">
          <Instructors />
        </Container>
      </Element> */}
      {course.has_certificate && (
        <Element
          name="accreditation"
          id="accreditation"
          className={cx(styles.sectionWhiteBg, courseTab)}
        >
          <Container fixed disableGutters={true} maxWidth="sm">
            <Accreditation />
          </Container>
        </Element>
      )}
      <Element
        name="assessment"
        id="assessment"
        className={cx(styles.sectionWhiteBg, courseTab)}
      >
        <Container fixed disableGutters={true} maxWidth="sm">
          <Assessment />
        </Container>
      </Element>
      <Element
        name="reviews"
        id="reviews"
        className={cx(styles.sectionBg, courseTab, xl ? styles.screenXl : '')}
      >
        <Container fixed disableGutters={true} maxWidth="sm">
          <ReviewsAndFaq reviews={course_reviews} course={course} />
        </Container>
      </Element>
    </div>
  );
};

export default CourseDetailsCard;
