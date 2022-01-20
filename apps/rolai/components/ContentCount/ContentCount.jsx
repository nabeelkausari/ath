import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import cx from 'classnames';
import Image from 'next/image';
import React from 'react';

import {
  DatasetsIcon,
  QuizIcon,
  ReadingMaterialIcon,
  VideosIcon,
} from '../../common/images';
import { toHM } from '../../utils/helpers/helperFunctions';
import useStyles from './ContentCount.styles';

const ContentCount = ({
  course,
  displayTitle = true,
  customClass = '',
  displayDuration = false,
}) => {
  const styles = useStyles();
  let material_duration = 0,
    video_duration = 0,
    quiz_duration = 0,
    datasets_duration = 0;

  course?.module_contents?.map((lesson) => {
    switch (lesson.type) {
      case 'PDF':
        return (material_duration += lesson?.data.estimated_duration_sec);
      case 'VIDEO':
        return (video_duration += lesson?.data.estimated_duration_sec);
      case 'QUIZ':
        return (quiz_duration += lesson?.data.estimated_duration_sec);
      case 'APPLY':
      case 'SOLVE':
      case 'CODING_CASE':
        return (datasets_duration += lesson?.data.estimated_duration_sec);
    }
  });
  return (
    <Box className={cx(styles.contentIconsContainer, customClass)}>
      <Typography component="span" className={styles.contentIcons}>
        <Box display="flex" alignItems="flex-start">
          <Image src={ReadingMaterialIcon} width={11} height={14} />
          <Typography variant="caption" color="textSecondary" pl={0.5}>
            {displayTitle && <>Reading material </>}
            <Typography
              component="span"
              variant="caption"
              color="textPrimary"
              fontWeight={500}
            >
              {course?.documents_count}
            </Typography>
          </Typography>
        </Box>
        {displayDuration && (
          <Box>
            <Typography
              component="span"
              variant="caption"
              color="textPrimary"
              fontWeight={400}
              pl={2}
            >
              {toHM(material_duration || 0)}
            </Typography>
          </Box>
        )}
      </Typography>
      <Typography component="span" className={styles.contentIcons}>
        <Box display="flex" alignItems="flex-start">
          <Image src={VideosIcon} width={11} height={14} />
          <Typography variant="caption" color="textSecondary" pl={0.5}>
            {displayTitle && <>Videos </>}
            <Typography
              component="span"
              variant="caption"
              color="textPrimary"
              fontWeight={500}
            >
              {course?.videos_count}
            </Typography>
          </Typography>
        </Box>
        {displayDuration && (
          <Box>
            <Typography
              component="span"
              variant="caption"
              color="textPrimary"
              fontWeight={400}
              pl={2}
            >
              {toHM(video_duration || 0)}
            </Typography>
          </Box>
        )}
      </Typography>
      <Typography component="span" className={styles.contentIcons}>
        <Box display="flex" alignItems="flex-start">
          <Image src={QuizIcon} width={11} height={14} />
          <Typography variant="caption" color="textSecondary" pl={0.5}>
            {displayTitle && <>Quiz </>}
            <Typography
              component="span"
              variant="caption"
              color="textPrimary"
              fontWeight={500}
            >
              {course?.quizzes_count}
            </Typography>
          </Typography>
        </Box>
        {displayDuration && (
          <Box>
            <Typography
              component="span"
              variant="caption"
              color="textPrimary"
              fontWeight={400}
              pl={2}
            >
              {toHM(quiz_duration || 0)}
            </Typography>
          </Box>
        )}
      </Typography>
      <Typography component="span" className={styles.contentIcons}>
        <Box display="flex" alignItems="flex-start">
          <Image src={DatasetsIcon} width={11} height={18} />
          <Typography variant="caption" color="textSecondary" pl={0.5}>
            {displayTitle && <>Datasets </>}
            <Typography
              component="span"
              variant="caption"
              color="textPrimary"
              fontWeight={500}
            >
              {course?.datasets_count}
            </Typography>
          </Typography>
        </Box>
        {displayDuration && (
          <Box>
            <Typography
              component="span"
              variant="caption"
              color="textPrimary"
              fontWeight={400}
              pl={2}
            >
              {toHM(datasets_duration || 0)}
            </Typography>
          </Box>
        )}
      </Typography>
    </Box>
  );
};

export default ContentCount;
