import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/styles';
import React from 'react';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: '0px 4px 25px #153B7D14',
    fontSize: 12,
    fontWeight: 'normal',
    padding: 10,
    border: '1px solid #D4D8F1',
  },
}));

export default LightTooltip;
