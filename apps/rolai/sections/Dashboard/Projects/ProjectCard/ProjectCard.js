import { Box, Button, Card, Tooltip } from '@mui/material';
import Link from 'next/link';
import React from 'react';

import { ProjectResume } from '../../../ProjectDetails/ProjectDetails/ProjectDetails';
import { AvatarGroupComp } from '../../Calendar/CommonComponents/CommonComponents';
import CardChip from '../../Components/CardChip/Chip';

import useStyles from './ProjectCard.styles';

const ProjectCard = ({ item = {} }) => {
  const styles = useStyles();
  const { name, overview, collaborators } = item;
  const COLLABORATIVE = collaborators ? true : false;
  return (
    <Card className={styles.parent}>
      <Box>
        <Tooltip title={name} placement="top" arrow>
          <Box className={styles.heading}>{name}</Box>
        </Tooltip>
        <Box display="flex" mb={1.4} alignItems={'center'}>
          <CardChip name={COLLABORATIVE ? 'COLLABORATIVE' : `CASE`} />
          {COLLABORATIVE && (
            <AvatarGroupComp
              user_ids={collaborators}
              size={{ width: 22, height: 22 }}
            />
          )}
        </Box>
        <Box className={styles.overview}>{overview}</Box>
      </Box>
      <Box className={styles.buttonBlock}>
        {/* <CloneProject project={item} /> */}
        <ProjectResume project={item} hasEndIcon={false} />
        <Link href={`/projects/${item.id}`} passHref>
          <Button variant={'outlined'}>View Details</Button>
        </Link>
      </Box>
    </Card>
  );
};

export default ProjectCard;
