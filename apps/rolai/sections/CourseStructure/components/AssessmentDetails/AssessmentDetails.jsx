import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import useStyles from './AssessmentDetails.styles';
import cx from 'classnames';
import Image from 'next/image';
import badge2Ico from '../../../../assets/Dashboard/Home/Badge2.svg';

import { TickIcon, EstimatedTimeIcon } from '../../../../common/images';
import { toHM } from '../../../../utils/helpers/helperFunctions';

const AssessmentDetails = ({ customClass = '', assessment }) => {
  const styles = useStyles();
  let material_duration = 0;
  return (
    <Box className={cx(styles.contentIconsContainer, customClass)}>
      <Typography component="span" className={styles.contentIcons}>
        <Box display="flex" alignItems="flex-start">
          <Image src={EstimatedTimeIcon} width={11} height={14} />
          <Typography variant="caption" color="textSecondary" pl={0.5}>
            {toHM(assessment?.estimated_duration_sec || 0)}
          </Typography>
        </Box>
      </Typography>
      <Typography component="span" className={styles.contentIcons}>
        <Box display="flex" alignItems="flex-start">
          <Image src={TickIcon} width={11} height={14} />
          <Typography variant="caption" color="textSecondary" pl={0.5}>
            {assessment?.total_score} Points
          </Typography>
        </Box>
      </Typography>
      <Typography component="span" className={styles.contentIcons}>
        <Box display="flex" alignItems="flex-start">
          <Image src={badge2Ico} width={11} height={14} />
          <Typography variant="caption" color="textSecondary" pl={0.5}>
            <Typography
              component="span"
              variant="caption"
              color="textPrimary"
              fontWeight={500}
            >
              {assessment?.quizzes_count}
            </Typography>
            Certification
          </Typography>
        </Box>
      </Typography>
    </Box>
  );
};

export default AssessmentDetails;
