import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React from 'react';
import styled, { keyframes } from 'styled-components';

import { PALETTE_HIGHLIGHT_MAIN } from '../../config/theme';

export const getRoundWithDecimals = (num) =>
  Math.round((num + Number.EPSILON) * 100) / 100;

const useStyles = makeStyles((theme) => ({
  circle: {
    // stroke: alpha(theme.palette.primary.main, 0.2),
    stroke: 'url(#linear-empty)',
  },
}));

const ResponsiveDonut = ({
  percentage = 75,
  size = 10,
  percentageValue,
  helper,
  backwards,
  style = {},
  className = '',
}) => {
  const styles = useStyles();
  const circleValue = size * 3.2;
  const adjustment = percentage * 0.11;
  const percentValue = getRoundWithDecimals(
    circleValue - circleValue * ((percentage - adjustment) / 100)
  );

  const donut = keyframes`
  to {
    stroke-dashoffset: ${percentValue}rem;
  }
`;

  const StyledTimer = styled.div`
    position: relative;
  `;

  const StyledDonutPlaceholder = styled.circle`
    stroke: url(#linear-empty);
    fill: #ffffff;
  `;

  const StyledDonut = styled.circle`
    stroke-dasharray: ${circleValue}rem;
    stroke-dashoffset: ${backwards ? '0' : `${circleValue}`}rem;

    stroke-dashoffset: ${percentValue}rem;

    stroke: url(#linear);
  `;

  const StyledContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: ${size}rem;
    height: ${size}rem;
    position: absolute;
    top: 0;
    left: 0;
  `;

  const StyledPercentageValue = styled.span`
    display: block;
    font-size: ${getRoundWithDecimals(size * 0.18)}rem;
    line-height: ${getRoundWithDecimals(size * 0.18)}rem !important;
    font-weight: 600;
  `;

  const StyledHelper = styled.span`
    display: block;
    font-size: ${getRoundWithDecimals(size * 0.1)}rem;
  `;

  return (
    <StyledTimer className={className} style={style}>
      <svg
        style={{ transform: 'rotate(-90deg)' }}
        width={`${size}rem`}
        height={`${size}rem`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={PALETTE_HIGHLIGHT_MAIN} />
            <stop offset="100%" stopColor={PALETTE_HIGHLIGHT_MAIN} />
          </linearGradient>
          <linearGradient id="linear-empty" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#f8f9ff" />
          </linearGradient>
          <StyledDonutPlaceholder
            r={`${getRoundWithDecimals((size / 2 / 10) * 9)}rem`}
            cy={`${size / 2}rem`}
            cx={`${size / 2}rem`}
            strokeWidth={`${getRoundWithDecimals(size / 18)}rem`}
            fill="none"
          />
          <StyledDonut
            r={`${getRoundWithDecimals((size / 2 / 10) * 9)}rem`}
            cy={`${size / 2}rem`}
            cx={`${size / 2}rem`}
            strokeWidth={`${getRoundWithDecimals(size / 18)}rem`}
            fill="none"
            // strokeLinecap="round"
          />
        </g>
      </svg>
      <StyledContent>
        <StyledPercentageValue>
          {typeof percentageValue !== 'undefined'
            ? percentageValue
            : `${percentage}%`}
        </StyledPercentageValue>
        {helper && <StyledHelper>{helper}</StyledHelper>}
      </StyledContent>
    </StyledTimer>
  );
};

export default ResponsiveDonut;
