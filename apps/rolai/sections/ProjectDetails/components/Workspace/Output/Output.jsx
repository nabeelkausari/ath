import cx from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TabPanel from '../../../../../components/TabPanel/TabPanel';
import { getStepNote } from '../../../../../store/workspace/steps/actions';
import { isReadOnlyProject } from '../../../../../utils/helpers/helperFunctions';
import UserCode from './code/components/UserCode';
import Comments from './comments/components/Comments';
import Notes from './Notes';
// import Comments from './comments/components/Comments';
import useStyles from './Output.styles';
import OutputResult from './OutputResult';

const Output = ({ print_ref, secondary }) => {
  const styles = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState();
  const { steps } = useSelector((state) => state.workspace);
  const is_case = router.query?.project_id !== undefined;
  const { project } = useSelector((state) => state.cases);

  const read_only = isReadOnlyProject(project);
  const { primary, secondary: secondaryFlyout } = steps?.flyout;

  const results_primary = primary?.step;
  const results_secondary = secondaryFlyout?.step;

  const code_primary = primary?.code;
  const code_secondary = secondaryFlyout?.code;

  const notes_primary = primary?.notes;
  const notes_secondary = secondaryFlyout?.notes;
  const notes = secondary ? notes_secondary : notes_primary;

  const current_result = secondary ? results_secondary : results_primary;

  const className = cx([
    styles.flyoutResultWrapper,
    !is_case && styles.flyoutResultWrapperNonProject,
  ]);

  console.log(notes?.note?.noteDetails);

  const _tabs = [
    {
      label: 'Results',
      body: (
        <OutputResult
          step_details
          secondary={secondary}
          results={current_result}
          print_ref={print_ref}
        />
      ),
      className,
    },
    {
      label: 'Code',
      body: (
        <UserCode
          results={current_result}
          secondary={secondary}
          code_primary={code_primary}
          code_secondary={code_secondary}
        />
      ),
      className,
    },
  ];

  let tabs = [..._tabs];

  if (is_case && !read_only) {
    tabs = [
      ...tabs,
      {
        label: 'Comments',
        body: (
          <Comments
            is_case={is_case}
            results={current_result}
            secondary={secondary}
          />
        ),
      },
    ];
  }

  if (!read_only || (read_only && notes?.note?.noteDetails?.note)) {
    tabs = [
      ...tabs,
      {
        label: 'Notes',
        body: (
          <Notes
            results={current_result}
            secondary={secondary}
            notes={notes}
            read_only={read_only}
          />
        ),
        className,
      },
    ];
  }

  useEffect(() => {
    setCurrentIndex(0);
    dispatch(
      getStepNote(
        secondary ? results_secondary : results_primary,
        secondary ? 'secondary' : 'primary'
      )
    );
  }, [results_primary?.id, results_secondary?.id]);

  return (
    <div className="tabs-container">
      <TabPanel currentIndex={currentIndex} tabs={tabs} />
    </div>
  );
};

export default Output;
