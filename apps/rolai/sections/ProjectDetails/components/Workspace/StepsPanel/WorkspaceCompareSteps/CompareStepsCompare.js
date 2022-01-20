import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import cx from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setDialogOptions } from '../../../../../../store/global/actions';
import {
  fetchComparison,
  selectReferenceStep,
  selectUserStep,
} from '../../../../../../store/workspace/steps/compareSteps/actions';
import useStyles from './WorkspaceCompareSteps.styles';

const getRadioOptionsForReference = (options, milestones) => {
  const option_list = [];
  options.forEach(
    (
      {
        sequence_number,
        milestone_sequence_number,
        description,
        matches,
        partial_match,
        _links: {
          self: { href },
        },
      },
      i
    ) =>
      option_list.push({
        label:
          (milestones.length > 1
            ? `M${milestone_sequence_number}-${sequence_number}`
            : `${sequence_number}`) + `${' '}  ${description}`,
        value: href,
        match: matches,
        warning: partial_match,
      })
  );
  return option_list;
};
const getRadioOptionsForUser = (options, milestones) => {
  const option_list = [];
  options.forEach(
    (
      {
        sequence_number,
        description,
        matches,
        partial_match,
        _links: {
          self: { href },
        },
        match_milestone_number,
        match_reference_step_number,
      },
      i
    ) =>
      option_list.push({
        label: i + 1 + `  ${description}`,
        value: href,
        helper_text: (matches || partial_match) && (
          <span
            style={{
              marginTop: -12,
              marginBottom: 15,
              marginLeft: 28,
              fontWeight: 'bold',
              color: getColor({
                option: { match: matches, warning: partial_match },
              }),
            }}
            className={cx(
              'select-step__helper-text',
              { matches: matches },
              { 'partial-match': partial_match }
            )}
          >
            [{partial_match ? 'Partial Match with ' : ''}Reference Step:
            Milestone {match_milestone_number}, Step
            {match_reference_step_number}]
          </span>
        ),
        match: matches,
        warning: partial_match,
      })
  );

  return option_list;
};

const getColor = ({ option }) =>
  option.match ? '#00BE46' : option.warning ? '#D88900' : 'black';

const RadioInputs = ({ data, onChange, selected }) => {
  const styles = useStyles();

  return (
    <RadioGroup aria-label="gender" name="row-radio-buttons-group">
      {data.map((item, k) => {
        return (
          <>
            <FormControlLabel
              key={k}
              value={k}
              control={
                <Radio
                  checked={item.value === selected}
                  size="small"
                  sx={{
                    color: getColor({ option: item }),
                    ...(getColor({ option: item }) !== 'black' && {
                      '&.Mui-checked': {
                        color: getColor({ option: item }),
                      },
                    }),
                  }}
                />
              }
              label={item.label}
              style={{ color: getColor({ option: item }), marginBottom: 15 }}
              onChange={(e) => e.target.checked && onChange(item)}
              classes={{
                label: styles.radioLabel,
                root: styles.radioLabelRoot,
              }}
            />
            {item.helper_text && item.helper_text}
          </>
        );
      })}
    </RadioGroup>
  );
};

const CompareStepsCompare = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { dialog_options } = useSelector((state) => state.global);
  const { steps, solve } = useSelector((state) => state.workspace);

  const { select_milestone, compare_steps } = steps?.compare;

  const { user_step_reference, reference_step_reference } = compare_steps || {};
  const bySequenceNumber = (a, b) => a.sequence_number - b.sequence_number;

  const milestones =
    solve &&
    solve.milestones &&
    solve.milestones
      .filter((milestone) => milestone._links.compare !== undefined)
      .sort((a, b) => a.sequence_number - b.sequence_number);

  const user_step_items = (steps?.list || [])
    .filter(
      (user_step) =>
        user_step.active &&
        !user_step.is_rollback_step &&
        !user_step.is_dataload_step
    )
    .sort(bySequenceNumber);

  const reference_step_result = steps?.compare?.select_steps.reference_steps;
  const reference_steps = {
    steps: reference_step_result?.steps.sort(bySequenceNumber).map((s) => {
      const matches = !!s._links.user_step;
      const partial_match = !!s._links.user_step_partial;
      const matching_milestone = milestones
        .filter(
          (milestone) => milestone._links.self.href === s._links.milestone.href
        )
        .shift();
      if (matching_milestone === undefined)
        console.log(
          'Unable to find matching milestone for href ',
          s._links.milestone.href
        );
      const milestone_sequence_number = !!matching_milestone
        ? matching_milestone.sequence_number
        : -1;
      return {
        ...s,
        matches,
        partial_match,
        milestone_sequence_number,
      };
    }),
    summary: steps?.compare?.select_steps.reference_steps?.summary,
  };

  const user_steps = {
    steps: user_step_items.map((s) => {
      const user_step_href = s?._links?.self?.href;
      const match = reference_steps?.steps
        .filter((ref_step) => !!ref_step?._links?.user_step)
        .filter(
          (ref_step) => ref_step?._links?.user_step?.href === user_step_href
        )
        .shift();
      const matches = !!match;
      const partial_match = reference_steps?.steps
        .filter((ref_step) => !!ref_step?._links?.user_step_partial)
        .filter(
          (ref_step) =>
            ref_step?._links?.user_step_partial?.href === user_step_href
        )
        .shift();
      if (!matches && !partial_match)
        return {
          ...s,
          matches,
          partial_match: !!partial_match,
          match_milestone_number: -1,
          match_reference_step_number: -1,
        };
      const match_milestone_number = match
        ? match.milestone_sequence_number
        : partial_match.milestone_sequence_number;
      const match_reference_step_number = match
        ? match.sequence_number
        : partial_match.sequence_number;
      return {
        ...s,
        matches,
        partial_match: !!partial_match,
        match_milestone_number,
        match_reference_step_number,
      };
    }),
    summary: steps?.compare?.select_steps?.user_steps?.summary,
  };

  useEffect(() => {
    dispatch(fetchComparison());
  }, [select_milestone?.selected_milestone_reference]);

  useEffect(() => {
    if (user_step_reference && reference_step_reference) {
      dispatch(
        setDialogOptions({
          yes_button: { ...dialog_options.yes_button, disabled: false },
        })
      );
    }
  }, [user_step_reference, reference_step_reference]);

  return (
    <Box className={styles.popup2}>
      <Box className={styles.flex}>
        <Box>
          <Typography variant="h5" component="h1" fontSize={'20px'}>
            Reference Steps
          </Typography>
          <Box marginTop={0.5} marginBottom={2}>
            {reference_steps.summary.map((text, i) => (
              <Typography
                variant="p"
                className="select-step__summary--item"
                key={i}
              >
                {text}
              </Typography>
            ))}
          </Box>
          <Box>
            <RadioInputs
              data={getRadioOptionsForReference(
                reference_steps.steps,
                milestones
              )}
              selected={compare_steps?.reference_step_reference}
              onChange={(item) => dispatch(selectReferenceStep(item.value))}
            />
          </Box>
        </Box>
        <Box>
          <Typography variant="h5" component="h1" fontSize={'20px'}>
            User Steps
          </Typography>
          <Box marginTop={0.5} marginBottom={2}>
            {user_steps.summary.map((text, i) => (
              <Typography
                variant="p"
                className="select-step__summary--item"
                key={i}
              >
                {text}
              </Typography>
            ))}
          </Box>
          <Box>
            <RadioInputs
              data={getRadioOptionsForUser(user_steps.steps, milestones)}
              selected={compare_steps?.user_step_reference}
              onChange={(item) => dispatch(selectUserStep(item.value))}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CompareStepsCompare;
