import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Image from 'next/image';
import React, { useState } from 'react';

import {
  badge_icon,
  blank_certificate,
  futureskills_logo,
} from '../../../common/images';
import Button from '../../../components/Button/Button';
import ListData from '../../../components/ListData/ListData';
import useStyles from './Accreditation.styles';

const Accreditation = ({}) => {
  const styles = useStyles();
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState([]);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <Box className={styles.accreditation}>
      <Box className={styles.content}>
        <Box className={styles.accreditationContent}>
          <Typography variant="h4">Accreditation</Typography>
          <Typography variant="body2" color="textSecondary" pb={2}>
            Aligned to Competency Standards developed by SSC NASSCOM in
            collaboration with Industry and approved by Government
          </Typography>
          <Typography variant="body2" color="textSecondary" pb={3}>
            It has gone through a formal review and validation process
            established by SSC NASSCOM with EY as an independent course
            evaluation agency to map and align courses from content partners to
            the industry approved standards & foundation curriculums.
          </Typography>
          <Typography variant="subtitle2">
            Here is a quick Overview of Nation Occupation Standards:
          </Typography>
          <Typography component="div">
            <Collapse in={checked} collapsedSize={80}>
              <ListData isIcon={false} customClass={styles.list} data={data}/>
            </Collapse>
          </Typography>
          {data.length!==0 && 
            <Button variant="text" onClick={handleChange}>
              View More
            </Button>
          }
        </Box>
        <Box>
          <Card className={styles.root}>
            <CardContent>
              <Box className={styles.recommendContainer} py={1}>
                <Box display='flex' >
                  <Image src={badge_icon} width={60} height={25} />
                  <Typography
                    variant="caption"
                    component="div"
                    className={styles.recommendContent}
                  >
                    Recommended & Validated* by
                  </Typography>
                </Box>
                <Image src={futureskills_logo} width={65} height={20} />
              </Box>
              <Image src={blank_certificate} width={250} height={200} />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
export default Accreditation;
