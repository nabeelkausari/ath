import { Typography, useMediaQuery } from '@mui/material';
import Container from '@mui/material/Container';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import cx from 'classnames';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Element, Link } from 'react-scroll';

import { CapIcon, RightArrow } from '../../../common/images';
import Button from '../../../components/Button';
import CardTitle from '../../../components/CardTitle/CardTitle';
import CourseCaseCount from '../../../components/CourseCaseCount/CourseCaseCount';
import { getTrackCourse, getTrackReviews } from '../../../store/tracks/actions';
import About from '../../CourseDetails/About/About';
import Accreditation from '../../CourseDetails/Accreditation/Accreditation';
import Assessment from '../../CourseDetails/Assessment/Assessment';
import ReviewsAndFaq from '../../CourseDetails/ReviewsAndFaq/ReviewsAndFaq';
import CardSkeleton from '../../CourseDetails/Skeleton/Skeleton';
import { TrackEnroller } from '../../MyOrganisation/Tracks/Tracks';
import Courses from '../components/Courses/Courses';
import MainCard from '../components/MainCard/MainCard';
import useStyles from './TrackDetails.styles';

const InfoBox = ({ track }) => {
  const styles = useStyles();
  const [navLinks, setNavLinks] = useState([
    { to: 'about', title: 'About' },
    { to: 'courses', title: 'Courses' },
    // { to: 'accreditation', title: 'Accreditation' },
    { to: 'assessment', title: 'Assessment' },
    { to: 'reviews', title: 'Reviews and FAQ' },
  ]);

  useEffect(() => {
    document.getElementsByClassName('nav-links')[0]?.classList.add('active');
  }, []);

  return (
    <div className={styles.NavFixed}>
      <Container fixed disableGutters={true} maxWidth="md">
        <nav className={cx(styles.navLink)}>
          {navLinks.map((link) => (
            <Link
              key={link.title}
              className="nav-links"
              activeClass="active"
              to={link.to}
              spy={true}
              smooth={true}
              offset={-130}
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
const TitleBar = ({ track, courses_count }) => {
  const styles = useStyles();

  return (
    <div className={cx(styles.titleHeader, styles.FixedTitleHeader)}>
      <Typography component="div" className={cx(styles.titleHeader)}>
        <CardTitle title={track.title} customClass={styles.cardTitle} />
        <CourseCaseCount count={courses_count} customClass={styles.count} />
      </Typography>
    </div>
  );
};

const TrackDetails = ({ props }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [showSticky, setShowSticky] = useState(false);
  const xl = useMediaQuery('(min-height:1080px)');
  const { track, track_succeeded, track_courses, track_reviews } = useSelector(
    (state) => state.tracks
  );

  useEffect(() => {
    if (track_succeeded) {
      dispatch(getTrackReviews());
      Object.keys(track_courses).forEach((id) => dispatch(getTrackCourse(id)));
    }
  }, [track_succeeded]);

  useScrollPosition(({ currPos }) => {
    if (currPos.y > -550)
      document.getElementsByClassName('nav-links')[0]?.classList.add('active');

    if (currPos.y < -500) {
      setShowSticky(true);
    } else {
      setShowSticky(false);
    }
  });
  if (!track_succeeded)
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
      <div className={styles.sectionBg}>
        <Container fixed disableGutters={true} maxWidth="md">
          <MainCard
            track={track}
            courses_count={Object.keys(track_courses).length}
          />
        </Container>
      </div>
      {showSticky && (
        <TitleBar
          track={track}
          courses_count={Object.keys(track_courses).length}
        />
      )}
      <InfoBox track={track} />
      <Element name="about" id="about" className={styles.sectionWhiteBg}>
        <Container fixed disableGutters={true} maxWidth="sm">
          <About
            title="About"
            about={track.overview}
            overview={track.learning_detail}
          />
        </Container>
      </Element>
      <Element name="courses" id="courses" className={styles.sectionBg}>
        <Container fixed disableGutters={true} maxWidth="md">
          <Courses courses={Object.values(track_courses)} />
        </Container>
      </Element>
      {/*{course.has_certificate && (*/}
      {/*  <Element*/}
      {/*    name="accreditation"*/}
      {/*    id="accreditation"*/}
      {/*    className={styles.sectionWhiteBg}*/}
      {/*  >*/}
      {/*    <Container fixed disableGutters={true} maxWidth="sm">*/}
      {/*      <Accreditation />*/}
      {/*    </Container>*/}
      {/*  </Element>*/}
      {/*)}*/}
      <Element name="assessment" id="assessment" className={styles.sectionBg}>
        <Container fixed disableGutters={true} maxWidth="sm">
          <Assessment />
        </Container>
      </Element>
      <Element
        name="reviews"
        id="reviews"
        className={cx(styles.sectionWhiteBg, xl ? styles.screenXl : '')}
      >
        <Container fixed disableGutters={true} maxWidth="sm">
          <ReviewsAndFaq reviews={track_reviews} course={null} />
        </Container>
      </Element>
    </div>
  );
};

export default TrackDetails;
