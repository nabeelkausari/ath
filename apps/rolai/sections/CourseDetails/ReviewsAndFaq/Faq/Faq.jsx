import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useState } from 'react';

import Button from '../../../../components/Button/Button';
import useStyles from './Faq.styles';

const Faq = ({}) => {
  const styles = useStyles();
  const [checked, setChecked] = useState(false);

  const handleChange = () => setChecked((prev) => !prev);

  return (
    <Box className={styles.Faq}>
      <Collapse in={checked} collapsedSize={120}>
        <Card className={styles.root}>
          <CardContent className={styles.content}>
            <Typography>What is data analytics?</Typography>
            <Button variant="outlined" className={styles.rightArrowBtn}>
              <ArrowForwardIosIcon className={styles.rightArrowBtnIcon} />
            </Button>
          </CardContent>
        </Card>
        <Card className={styles.root}>
          <CardContent className={styles.content}>
            <Typography>
              Is this Data Analyst course recommended for beginners?
            </Typography>
            <Button variant="outlined" className={styles.rightArrowBtn}>
              <ArrowForwardIosIcon className={styles.rightArrowBtnIcon} />
            </Button>
          </CardContent>
        </Card>
      </Collapse>
      <Box className={styles.showMore}>
        <Button variant="text" onClick={handleChange}>
          Show More
        </Button>
      </Box>
    </Box>
  );
};
export default Faq;
