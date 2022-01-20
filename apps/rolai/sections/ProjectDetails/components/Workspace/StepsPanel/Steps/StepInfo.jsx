import cx from 'classnames';
import Image from 'next/image';
import * as React from 'react';

import {
  DigitalVideoIcon,
  FunctionsIcon,
} from '../../../../../../common/images';
import { getSelectedColumns } from './StepCards';
import useStyles from './Steps.styles';

const StepInfo = ({ step, className }) => {
  const styles = useStyles();
  return (
    <div className={cx([styles.stepInfo, 'step__info-container', className])}>
      <div className="step__functions-wrapper u-margin-bottom-small">
        <div className="step__icon-wrapper">
          <Image src={FunctionsIcon} width={13} height={13} />
        </div>
        <div className="step__function-name">{step.operation_name}</div>
      </div>
      <div className="step__columns-wrapper">
        <div className="step__icon-wrapper">
          {/*<ColumnIcon className="step__icon step__icon--column" />*/}
          <Image src={DigitalVideoIcon} width={13} height={13} />
        </div>
        <div className="step__columns-name">
          {getSelectedColumns(step.selections)}
        </div>
      </div>
    </div>
  );
};

export default StepInfo;
