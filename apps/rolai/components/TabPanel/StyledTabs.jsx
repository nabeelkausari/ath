import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import React from 'react';

import { PALETTE_HIGHLIGHT_MAIN } from '../../config/theme';

export const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 50,
    width: '100%',
    backgroundColor: PALETTE_HIGHLIGHT_MAIN,
  },
});
