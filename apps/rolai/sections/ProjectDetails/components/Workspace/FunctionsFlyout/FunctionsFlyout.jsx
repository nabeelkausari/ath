import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import cx from 'classnames';
import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  closeParameterFlyout,
  getFunctionDescription,
  getFunctionParameters,
  setSelectedFunction,
} from '../../../../../store/workspace/functions/actions';
import FunctionParameters from './FunctionParameters';
import useStyles from './FunctionsFlyout.styles';
import FunctionsList from './FunctionsList';

const FunctionsFlyout = ({ closeFlyout, searchText, is_case }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [fxSelected, setFxSelected] = useState();

  const onSelect = (e, fx) => {
    setFxSelected(true);
    dispatch(getFunctionDescription(fx?._links?.material));
    dispatch(setSelectedFunction(fx, true));
  };

  const closeSelection = (e) => {
    setFxSelected(false);
    dispatch(closeParameterFlyout());
  };

  return (
    <Box className={styles.backdrop} onClick={closeFlyout}>
      <div
        style={{ position: 'relative' }}
        onClick={(e) => e.stopPropagation()}
      >
        <FunctionsList
          searchText={searchText}
          className={cx([styles.flyout, !is_case && styles.flyoutNonProject])}
          onSelect={onSelect}
          onClose={closeFlyout}
          showClose={!fxSelected}
          closeSelection={closeSelection}
        />
        {fxSelected && (
          <FunctionParameters
            className={cx([
              styles.flyoutParams,
              !is_case && styles.flyoutParamsNonProject,
            ])}
            closeSelection={closeSelection}
          />
        )}
      </div>
    </Box>
  );
};
export default FunctionsFlyout;
