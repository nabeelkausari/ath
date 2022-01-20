import { Typography, useMediaQuery } from '@mui/material';
import Container from '@mui/material/Container';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import cx from 'classnames';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Element, Link } from 'react-scroll';

import { RightArrow } from '../../../common/images';
import Button from '../../../components/Button';
import CardTitle from '../../../components/CardTitle/CardTitle';
import { CONFIGURED } from '../../../utils/constants/userPermissions';
import CardSkeleton from '../../CourseDetails/Skeleton/Skeleton';
import MainCard from '../../TrackDetails/components/MainCard/MainCardProject';
import Collaborators from '../components/Collaborators/Collaborators';
import Description from '../components/Description/Description';
import useStyles from './ProjectDetails.styles';

export const ProjectResume = ({ project, hasEndIcon = true }) => {
  const insights_only = project.permission && project.permission === CONFIGURED;
  return (
    <NextLink
      href={`/projects/${project.id}/workspace/${project.id}${
        insights_only ? '/insights' : '/datasets'
      }`}
    >
      <Button
        component="a"
        variant="contained"
        endIcon={
          hasEndIcon ? <Image src={RightArrow} width={12} height={9} /> : null
        }
      >
        Resume
      </Button>
    </NextLink>
  );
};

const InfoBox = ({ project }) => {
  const styles = useStyles();
  const [navLinks, setNavLinks] = useState([
    { to: 'description', title: 'Description' },
    { to: 'collaborators', title: 'Collaborators' },
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
const TitleBar = ({ project }) => {
  const styles = useStyles();

  return (
    <div className={cx(styles.titleHeader, styles.FixedTitleHeader)}>
      <Typography component="div" className={cx(styles.titleHeader)}>
        <CardTitle title={project.name} customClass={styles.cardTitle} />
      </Typography>
      <ProjectResume project={project} />
    </div>
  );
};

const ProjectDetails = () => {
  const styles = useStyles();
  const [showSticky, setShowSticky] = useState(false);
  const { project, project_succeeded } = useSelector((state) => state.cases);
  const xl = useMediaQuery('(min-height:1080px)');

  useScrollPosition(({ currPos }) => {
    if (currPos.y > -550)
      document.getElementsByClassName('nav-links')[0]?.classList.add('active');

    if (currPos.y < -500) {
      setShowSticky(true);
    } else {
      setShowSticky(false);
    }
  });

  if (!project_succeeded)
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
          <MainCard project={project} />
        </Container>
      </div>
      {showSticky && <TitleBar project={project} />}
      <InfoBox project={project} />
      <Element
        name="description"
        id="description"
        className={styles.sectionWhiteBg}
      >
        <Container fixed disableGutters={true} maxWidth="sm">
          <Description project={project} />
        </Container>
      </Element>
      <Element
        name="collaborators"
        id="collaborators"
        className={cx(styles.sectionBg, xl ? styles.screenXl : '')}
      >
        <Container fixed disableGutters={true} maxWidth="sm">
          <Collaborators />
        </Container>
      </Element>
    </div>
  );
};

export default ProjectDetails;
