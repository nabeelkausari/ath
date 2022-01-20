import { Card } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import React from 'react';

import useStyles from './infoCard.styles';

const InfoCard = ({
  item: { name, value, color, placeholder },
  icon,
  icon2,
}) => {
  const styles = useStyles();
  return (
    <Card className={styles.parent}>
      <Box style={{ backgroundColor: color }} className={styles.image}>
        <Image src={icon} width={'100%'} />
      </Box>
      <Box className={styles.info}>
        <Box style={{ color }} className={styles.value}>
          {value || placeholder}
        </Box>
        {value && <Box className={styles.heading}>{name}</Box>}
      </Box>
      <Box className={styles.background}>
        <Image src={icon2} />
      </Box>
    </Card>
  );
};

export default InfoCard;
