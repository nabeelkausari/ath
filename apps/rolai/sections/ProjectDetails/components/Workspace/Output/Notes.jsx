import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getStepNote } from '../../../../../store/workspace/steps/actions';
import StepNote from '../../../../CourseStructure/components/MyLibrary/StepNote/StepNote';

const Notes = ({ notes, secondary, results, read_only }) => {
  const dispatch = useDispatch();

  const callbackAfterUpdate = () => {
    dispatch(getStepNote(results, secondary ? 'secondary' : 'primary'));
  };

  return (
    <div className="notes-wrapper">
      <StepNote
        note={{
          ...notes?.note?.noteDetails,
          note_body: notes?.note?.noteDetails?.note,
        }}
        note_type="step_notes"
        callbackAfterUpdate={callbackAfterUpdate}
        in_workspace={true}
        results={results}
        secondary={secondary}
        notes={notes}
        read_only={read_only}
      />
    </div>
  );
};

export default Notes;
