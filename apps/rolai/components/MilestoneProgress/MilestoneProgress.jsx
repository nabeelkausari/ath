import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import cx from 'classnames';
import Image from 'next/image';
import React from 'react';

import { TickIcon } from '../../common/images';
import useStyles from './MilestoneProgress.styles';

const MilestoneProgress = ({
  lesson,
  onArrowClick,
  isCodingCourse = false,
  showDetails = true,
}) => {
  const styles = useStyles();
  const milestones = isCodingCourse
    ? lesson?.milestone_details
    : lesson?.milestones;
  if (!milestones) return null;
  return (
    <Box className={styles.milestoneProgressWrapper}>
      <Typography component="div" variant="body2" color="textSecondary" pr={1}>
        Milestone Progress
      </Typography>
      <Typography
        component="div"
        variant="body2"
        color="textSecondary"
        display="flex"
        alignItems="baseline"
      >
        {!isCodingCourse ? (
          <>
            {milestones
              ?.sort((a, b) => a.sequence_number - b.sequence_number)
              ?.map((milestone, i) => {
                return (
                  <Box>
                    <Typography component="div" className={styles.divider}>
                      {milestone.is_complete && (
                        <Image src={TickIcon} width={14} height={14} />
                      )}
                      {!milestone.is_complete && (
                        <Typography className={styles.lessonStatus} />
                      )}
                      {i < milestones?.length - 1 && (
                        <Typography
                          className={cx([
                            styles.milestone__divider,
                            milestone.is_complete && styles.activemilestone,
                          ])}
                        />
                      )}
                    </Typography>
                    <Typography className={styles.milestoneCount}>
                      {milestone.sequence_number}
                    </Typography>
                  </Box>
                );
              })}
            {showDetails && (
              <ArrowBackIosIcon
                className={cx([
                  styles.milestoneArrowIcon,
                  styles.milestoneMore,
                ])}
                onClick={onArrowClick}
                id="milestone-button"
              />
            )}
          </>
        ) : (
          <>
            {milestones
              ?.sort((a, b) => a.sequence_id - b.sequence_id)
              ?.map((milestone, i) => {
                return (
                  <Box>
                    <Typography component="div" className={styles.divider}>
                      {milestone.is_milestone_submitted &&
                      milestone.score_percentage >= 50 ? (
                        <Image src={TickIcon} width={14} height={14} />
                      ) : (
                        <Typography
                          className={styles.lessonStatus}
                        ></Typography>
                      )}
                      {i < milestones?.length - 1 && (
                        <Typography
                          className={cx([
                            i < milestones?.length - 1 &&
                              styles.milestone__divider,
                            milestone.is_milestone_submitted &&
                              milestone.score_percentage > 50 &&
                              styles.activemilestone,
                          ])}
                        ></Typography>
                      )}
                    </Typography>
                    <Typography className={styles.milestoneCount}>
                      {milestone.sequence_id}
                    </Typography>
                  </Box>
                );
              })}
            <ArrowBackIosIcon
              className={cx([styles.milestoneArrowIcon, styles.milestoneMore])}
              onClick={onArrowClick}
              id="milestone-button"
            />
          </>
        )}
      </Typography>
    </Box>
  );
};

export default MilestoneProgress;
