import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import cx from 'classnames';
import Image from 'next/image';
import React from 'react';

import { RightArrow } from '../../../../common/images';
import Button from '../../../../components/Button';
import CardDescription from '../../../../components/CardDescription/CardDescription';
import CardTitle from '../../../../components/CardTitle/CardTitle';
import CloneProject from '../../../../components/CloneProject/CloneProject';
import CoursePill from '../../../../components/CoursePill/CoursePill';
import { getProjectLabel } from '../../../MyOrganisation/Projects/Projects';
import { ProjectResume } from '../../../ProjectDetails/ProjectDetails/ProjectDetails';
import useStyles from './MainCard.styles';

const MainCard = ({ project }) => {
  const styles = useStyles();
  return (
    <Card className={styles.root}>
      <CardContent className={styles.cardList}>
        <CardContent className={styles.contentBlock}>
          <Box pb={2} display="flex" flexDirection="row">
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
            {project?.categories &&
              project?.categories?.map((category, i) => (
                <CoursePill key={i} label={category} />
              ))}

            {project?.category && <CoursePill label={project.category} />}
          </Box>
          <CardTitle title={project.name} customClass={styles.cardTitle} />
          <CardDescription
            description={project.overview}
            customClass={styles.description}
          />
          <CardActions>
            <ProjectResume project={project} />
            <CloneProject
              project={project}
              variant="outlined"
              style={{ minWidth: 'auto', marginLeft: 10 }}
            />
          </CardActions>
        </CardContent>
        <CardContent>
          <Box
            style={{ backgroundImage: `url(${project.image_url})` }}
            className={styles.rightImage}
          />
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default MainCard;
