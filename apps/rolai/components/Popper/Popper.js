import CloseIcon from '@mui/icons-material/Close';
import { Popper } from '@mui/material';
import cx from 'classnames';
import React, { Component } from 'react';

import useStyles from './Popper.styles';

const PopperComp = ({
  children,
  anchorEl,
  open,
  popperClass,
  arrow,
  closePopup,
  placement,
}) => {
  const styles = useStyles();
  const [arrowRef, setArrowRef] = React.useState(null);

  return (
    <Popper
      className={cx([styles.popper, popperClass])}
      id={'popper-box'}
      style={!anchorEl && { left: '50%', bottom: 0, top: 'initial' }}
      open={open}
      anchorEl={anchorEl}
      placement={placement || 'left-start'}
      disablePortal={true}
      modifiers={[
        {
          name: 'flip',
          enabled: true,
          options: {
            altBoundary: true,
            rootBoundary: 'document',
            padding: 8,
          },
        },
        {
          name: 'preventOverflow',
          enabled: true,
          options: {
            altAxis: true,
            altBoundary: false,
            tether: true,
            rootBoundary: 'viewport',
            padding: 8,
          },
        },
        {
          name: 'arrow',
          enabled: true,
          options: {
            element: arrowRef,
          },
        },
      ]}
    >
      {arrow && anchorEl ? (
        <span className={styles.arrow} ref={setArrowRef} />
      ) : null}
      <CloseIcon onClick={closePopup} className={styles.close} />
      {children}
    </Popper>
  );
};

export default PopperComp;
