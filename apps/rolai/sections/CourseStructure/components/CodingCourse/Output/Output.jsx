import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ExpandIcon } from '../../../../../common/images';
import { UpArrowIcon } from '../../../../../common/images';
import { showDialog } from '../../../../../store/global/actions';
import useStyles from './Output.styles';

const Output = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const HandleExpandView = () => {
    dispatch(
      showDialog({
        options: {
          title: 'Preview',
          component: Result,
          no_button: {
            text: 'Close',
          },
          fullScreen:true,
        },
      })
    );
  };
  return (
    <>
      <Box className={styles.OutputHeader}>
        <Typography className={styles.previewWrapper}>Preview</Typography>
        <Box title="Expand" className={styles.expandIcon}>
          <Image
            src={ExpandIcon}
            width={17}
            height={17}
            onClick={() => HandleExpandView()}
          />
        </Box>
      </Box>
      <Box className={styles.OutputWrapper}>
        <Result />
      </Box>
    </>
  );
};
const Result = () => {
  const styles = useStyles();
  const { coding_course } = useSelector((state) => state.courses);
  const result_data = coding_course?.result_data;
  const output = result_data?.output?.output || '';
  const error = result_data?.output?.error || '';
  const status = result_data?.output?.status || '';
  const isNotEmptyOutput = output !== '' ? true : false;
  const isNotEmptyError = error !== '' ? true : false;
  return (
    <Box className={styles.outputContainer}>
      {coding_course?.is_status_running ? (
        <span>
          {' '}
          <pre className={styles.common}>running...</pre>{' '}
        </span>
      ) : (
        <>
          {coding_course?.updatedMode === 'hint' ? (
            status === 'mismatch' || status === 'error' ? (
              <span>
                <p>You have an error </p>
                {isNotEmptyOutput && (
                  <pre className={styles.show__hint_data}>{output}</pre>
                )}
                {isNotEmptyError && (
                  <pre className={styles.show__hint_data}>{error}</pre>
                )}
              </span>
            ) : status === 'success' || status === 'correct' ? (
              <span>
                <pre className={styles.show__hint_data}>
                  You have no errors in your code.
                </pre>
              </span>
            ) : (
              ''
            )
          ) : (
            ''
          )}
          {coding_course?.updatedMode === 'show_code' && (
            <span>
              {isNotEmptyOutput && (
                <pre className={styles.common}>{output}</pre>
              )}
              {isNotEmptyError && (
                <pre className={(styles.common, styles.error)}>{error} </pre>
              )}
              {(status === 'success' || status === 'correct') && (
                <p className={(styles.common, styles.out)}>You got it right!</p>
              )}
            </span>
          )}
          {coding_course?.updatedMode === 'run' && (
            <>
              {isNotEmptyOutput && (
                <pre className={styles.common}>{output}</pre>
              )}
              {isNotEmptyError && (
                <pre className={(styles.common, styles.error)}> {error} </pre>
              )}
              {!isNotEmptyOutput &&
                !isNotEmptyError &&
                status === 'success' && (
                  <pre className={(styles.common, styles.success)}>
                    {coding_course?.milestone_data?.milestone_name} ran
                    successfully
                  </pre>
                )}
            </>
          )}
          {(coding_course?.updatedMode === 'evaluate' ||
            coding_course?.updatedMode === 'submit') && (
            <>
              {isNotEmptyOutput && (
                <pre className={styles.common}>{output}</pre>
              )}
              {isNotEmptyError && (
                <pre className={(styles.common, styles.error)}> {error} </pre>
              )}
              {!isNotEmptyOutput &&
              !isNotEmptyError &&
              (status === 'mismatch' || status === 'error') ? (
                <p className={(styles.common, styles.error)}>
                  Your code hasn't met the requirement. Please try again
                </p>
              ) : !isNotEmptyOutput &&
                !isNotEmptyError &&
                (status === 'correct' || status === 'success') ? (
                <p className={(styles.common, styles.success)}>
                  {coding_course?.milestone_data?.milestone_name} got submitted
                  successfully
                </p>
              ) : (
                ''
              )}
            </>
          )}
        </>
      )}

      {coding_course?.updatedMode === 'reset' && ''}
      {result_data?.images?.length > 0 && (
        <>
          {result_data.images.map((image, index) => {
            return (
              <p key={index}>
                {' '}
                <img
                  src={image}
                  alt="graph"
                  className="output_image"
                  key={index}
                />{' '}
              </p>
            );
          })}
        </>
      )}
    </Box>
  );
};

export default Output;
