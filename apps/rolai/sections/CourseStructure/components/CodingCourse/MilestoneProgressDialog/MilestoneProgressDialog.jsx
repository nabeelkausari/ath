import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Menu, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '../../../../../components/Button/Button';
import cx from "classnames";

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import useStyles from './MilestoneProgressDialog.styles';
import MilestoneProgress from '../../../../../components/MilestoneProgress/MilestoneProgress';

const MilestoneProgressDialog = ({}) => {
  const styles = useStyles();
  const [opened, setOpened] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const { coding_course } = useSelector((state) => state.courses);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Box className={styles.milestoneProgress}>
      <Box className={styles.milestoneSteps}>
        <MilestoneProgress lesson={coding_course} isCodingCourse={true} onArrowClick={()=> {setOpened(true)}}/>
        <Menu
            className={styles.milestoneBody}
            id="milestone-menu"
            // anchorEl={document.getElementById('milestone-button')}
            open={opened}
            transformOrigin={{ horizontal: 200, vertical: 10 }}
            onClose={() =>
            setOpened(false)
            }
        >
          {coding_course?.milestone_details?.map((milestone, i) => (
            <Accordion
              expanded={expanded === i}
              onChange={handleChange(i)}
              key={i}
              className={styles.milestoneAccordion}
            >
              <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                className={styles.accSummary}
              >
                <Typography variant="body2" component='div' className={styles.milestoneNumber}>
                  Milestone {milestone?.milestone_id}
                    <Button
                      variant='text'
                      className={cx([
                        styles.arrowButton,
                        expanded === i ? styles.expandIcon : '',
                      ])}
                    >
                      <ArrowForwardIosIcon className={styles.arrowIcon} />
                    </Button>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" component='div' className={styles.description}>
                  <ReactMarkdown
                    children={milestone?.description}
                    remarkPlugins={[[gfm, {singleTilde: false}]]}
                  />
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Menu>
        </Box>
    </Box>
  );
};

export default MilestoneProgressDialog;
