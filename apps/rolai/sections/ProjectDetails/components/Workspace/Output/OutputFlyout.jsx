import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import { isReadOnlyProject } from '../../../../../utils/helpers/helperFunctions';
import Flyout from './Flyout';
import Output from './Output';

const OutputFlyout = ({ is_steps_open, is_case, secondary = false }) => {
  const print_ref = useRef();
  const { project } = useSelector((state) => state.cases);

  const read_only = isReadOnlyProject(project);
  return (
    <Flyout
      require_pin={true}
      require_download={true}
      require_full_screen={true}
      print_ref={print_ref}
      is_steps_open={is_steps_open}
      read_only={read_only}
      is_case={is_case}
      secondary={secondary}
    >
      <Output
        read_only={read_only}
        secondary={secondary}
        print_ref={print_ref}
      />
    </Flyout>
  );
};

export default OutputFlyout;
