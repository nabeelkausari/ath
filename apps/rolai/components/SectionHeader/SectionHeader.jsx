import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { ButtonBack, ButtonNext } from 'pure-react-carousel';
import React from 'react';

import Button from '../Button/Button';
import CloneProject from '../CloneProject/CloneProject';
import useStyles from './SectionHeader.styles';

const SectionHeader = ({
  viewAll = false,
  count = 0,
  linkHref = '/',
  customHeader = 'Projects',
  hideArrows = false,
  create_new = false,
}) => {
  const styles = useStyles();

  return (
    <Box className={styles.sectionHeaderContainer}>
      <Box className={styles.sectionHeader}>
        <Typography className={styles.sectionHeaderContent} variant="h6">
          {customHeader}
        </Typography>
        {count !== 0 && (
          <Typography mx={1} color="textSecondary" className={styles.listCount}>
            {count}
          </Typography>
        )}
      </Box>
      <Box className={styles.viewAllContainer}>
        {!viewAll && (
          <Link href={linkHref} passHref>
            <Button
              className={styles.viewAllButton}
              disabled={count <= 3}
              variant="text"
            >
              View All
            </Button>
          </Link>
        )}
        {!hideArrows && (
          <>
            <ButtonBack className={styles.viewIcons}>
              <ArrowBackIosIcon className={styles.smallIcon} />
            </ButtonBack>
            <ButtonNext className={styles.viewIcons}>
              <ArrowForwardIosIcon className={styles.smallIcon} />
            </ButtonNext>
          </>
        )}
        {create_new && <CloneProject create_new={create_new} />}
      </Box>
    </Box>
  );
};

export default SectionHeader;
