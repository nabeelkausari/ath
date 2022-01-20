import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import cx from 'classnames';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

import { EnrolledIcon } from '../../../common/images';
import Button from '../../../components/Button/Button';
import CloneProject from '../../../components/CloneProject/CloneProject';
import { isLoading } from '../../../utils/helpers/helperFunctions';
import { AvatarGroupComp } from '../../Dashboard/Calendar/CommonComponents/CommonComponents';
import MyOrganisationSection from '../MyOrganisationSection/MyOrganisationSection';
import useStyles from './Projects.styles';

export const getProjectLabel = (project) => {
  const { shared, sample_case } = project;
  if (shared) return 'Collaborative';
  else if (sample_case) return 'Read Only';
  else return 'My Project';
};

const ProjectCard = ({ item: project }) => {
  const styles = useStyles();
  const { all_users } = useSelector((state) => state.collaborators);

  const getLabel = (project) => {
    const { shared, sample_case, collaborators } = project;

    if (collaborators && collaborators.length > 0) return 'Collabrative';
    else if (sample_case) return 'Read Only';
    else return 'My Project';
  };
  return (
    <Card className={styles.root}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px',
            height: '25px',
          }}
        >
          <Chip
            label={getProjectLabel(project)}
            size="small"
            // className={styles.chip}
            classes={{
              label: cx([
                styles.chip,
                project.sample_case
                  ? styles.readOnly
                  : project.shared
                  ? styles.shared
                  : styles.myProject,
              ]),
              root: styles.chipRoot,
            }}
          />
          {project.collaborators && project.collaborators.length > 0 && (
            <AvatarGroupComp user_ids={project.collaborators} max={3} />
          )}
        </Box>

        {project?.enrolled && (
          <Typography variant="subtitle2" className={styles.enrolled}>
            <img src={EnrolledIcon?.src} className={styles.enrolledIcon} />
            <div>Enrolled</div>
          </Typography>
        )}
        <Typography
          color="textPrimary"
          component="h4"
          className={styles.header}
          title={project?.name}
        >
          {project?.name}
        </Typography>
      </CardContent>
      <CardContent className={styles.contentBox}>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={styles.content}
        >
          {project?.overview}
        </Typography>
      </CardContent>
      <CardActions className={styles.projectActions}>
        <CloneProject project={project} />
        <Link href={`/projects/${project.id}`} passHref>
          <Button
            component="a"
            variant="outlined"
            className={styles.cardButtons}
          >
            View Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

const Projects = ({ viewAll = false, hideArrows }) => {
  const projects = useSelector((state) => state.cases);
  const { my_profile } = useSelector((state) => state.auth);
  if (!projects) return null;

  const loading =
    isLoading(projects.my_org_cases_requested) &&
    (!projects.my_org_cases || projects.my_org_cases.length === 0);

  return (
    <MyOrganisationSection
      Component={ProjectCard}
      loading={loading}
      items={projects.my_org_cases.filter(
        (item) => item.sample_case || item.shared
      )}
      viewAll={viewAll}
      hideArrows={hideArrows}
      create_new={viewAll && my_profile?._links?.create_problem}
      cardHeight={390}
      viewAllLink="/my-organization/projects"
      header="Projects"
    />
  );
};

export default Projects;
