import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  accordion: {
    '& .MuiPaper-root': {
      borderRadius: 0,
      boxShadow: 'none',
      color: alpha('#000', 0.7),
      padding: theme.spacing(1.5, 0.5),

      '& .MuiSvgIcon-root': {
        backgroundColor: '#F1F8FF',
        borderRadius: '50%',
        border: '1px solid #E0E8F1',
        padding: 1,
        transition: 'transform 0.2s',
        marginRight: 10,
      },

      '&.Mui-expanded': {
        '& .MuiSvgIcon-root': {
          transform: 'rotate(90deg)',
        },
      },
    },
    '& .MuiAccordionDetails-root, .MuiAccordionSummary-root': {
      padding: 0,
    },
  },
}));

const AccordionPanel = ({ title, expanded, children }) => {
  const styles = useStyles();
  return (
    <div className={styles.accordion}>
      <Accordion defaultExpanded={expanded}>
        <AccordionSummary>
          <KeyboardArrowRightRoundedIcon />
          {title}
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionPanel;
