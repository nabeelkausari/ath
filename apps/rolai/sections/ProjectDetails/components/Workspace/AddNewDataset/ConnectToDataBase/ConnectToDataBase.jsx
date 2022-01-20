import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RadioGroup from '../../../../../../components/Radio/radio';
import {
  hideDialog,
  setDialogOptions,
} from '../../../../../../store/global/actions';
import { connectToExternalDatabase } from '../../../../../../store/workspace/datasets/actions';
import usePrevious from '../../../../../../utils/hooks/usePrevious';
import useStyles from './ConnectToDataBase.styles';
import NewConnection from './NewConnection/NewConnection';
import NewConnectionCustom from './NewConnectionCustom/NewConnectionCustom';
import PreviousConnection from './PreviousConnection/PreviousConnection';
import SelectDataBase from './SelectDataBase/SelectDataBase';

const connectionType = [
  {
    label: 'New Connection',
    value: 'New_Connection',
  },
  {
    label: 'New Connection (Custom)',
    value: 'New_Connection_(Custom)',
  },
];

const ConnectToDataBase = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [stepCompleted, setStepCompleted] = useState({});
  const [conDetails, setConDetails] = useState({
    type: connectionType[0].value,
    database: {
      label: '',
      driver: '',
    },
    previousConnection: {
      host: 'Dev-server',
      query: '',
    },
    newConnection: {
      host: '',
      port: '',
      username: '',
      databaseName: '',
      query: '',
      password: '',
    },
    customNewConnection: {
      connectionString: '',
      query: '',
    },
  });

  const { datasets } = useSelector((state) => state.workspace);
  const {
    connect_to_db_succeeded,
    connect_to_db_failed,
    connect_to_db_requested,
  } = datasets;
  const prev_connect_to_db_succeeded = usePrevious(connect_to_db_succeeded);
  const steps = ['Select Database', 'Connection Configuration'];

  const handleSubmitAction = (condition, params) => {
    if (!condition)
      return dispatch(
        setDialogOptions({
          yes_button: { text: 'Submit', disabled: true, onClick: () => {} },
        })
      );
    dispatch(
      setDialogOptions({
        no_hide_with_yes: true,
        yes_button: {
          text: 'Submit',
          disabled: false,
          onClick: () => {
            dispatch(
              connectToExternalDatabase(params, conDetails.database.driver)
            );
          },
        },
      })
    );
  };

  useEffect(() => {
    if (
      connect_to_db_succeeded &&
      prev_connect_to_db_succeeded !== connect_to_db_succeeded
    ) {
      dispatch(setDialogOptions({ submitting: false }));
      dispatch(hideDialog());
    }
  }, [connect_to_db_succeeded]);

  useEffect(() => {
    if (connect_to_db_requested) {
      dispatch(
        setDialogOptions({
          yes_button: { disabled: true, text: 'Submitting' },
          submitting: true,
        })
      );
    }
    if (connect_to_db_failed) {
      dispatch(
        setDialogOptions({
          yes_button: { disabled: false, text: 'Submit' },
          submitting: false,
        })
      );
    }
  }, [connect_to_db_requested, connect_to_db_failed]);

  useEffect(() => {
    if (!conDetails.database.label) return;

    if (conDetails.type === connectionType[1].value) {
      const condition =
        conDetails.customNewConnection.query &&
        conDetails.customNewConnection.connectionString;
      handleSubmitAction(condition, conDetails.customNewConnection);
    } else {
      const condition =
        conDetails.newConnection.host &&
        conDetails.newConnection.port &&
        conDetails.newConnection.username &&
        conDetails.newConnection.databaseName &&
        conDetails.newConnection.query &&
        conDetails.newConnection.password;
      handleSubmitAction(condition, conDetails.newConnection);
    }
  }, [JSON.stringify(conDetails)]);

  const handleStep = (step) => () => setActiveStep(step);
  const onSelectDatabase = (database) => {
    setConDetails({ ...conDetails, database });
    setActiveStep(1);
  };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <SelectDataBase
            onClick={onSelectDatabase}
            active={conDetails.database}
          />
        );
      case 1:
        return (
          <>
            <Box className={styles.radioButtons}>
              <RadioGroup
                radio_list={connectionType}
                onSelect={(val) => {
                  setConDetails({ ...conDetails, type: val });
                }}
                selected_id={conDetails.type}
              />
            </Box>
            {conDetails.type === 'New_Connection' && (
              <NewConnection
                newConnection={conDetails.newConnection}
                setNewConnection={(data) => {
                  setConDetails({
                    ...conDetails,
                    newConnection: { ...data },
                  });
                }}
              />
            )}
            {conDetails.type === 'New_Connection_(Custom)' && (
              <NewConnectionCustom
                customNewConnection={conDetails.customNewConnection}
                setCustomNewConnection={(data) => {
                  setConDetails({
                    ...conDetails,
                    customNewConnection: { ...data },
                  });
                }}
              />
            )}
          </>
        );
      default:
        return '';
    }
  };
  return (
    <Box>
      <Stepper
        nonLinear
        activeStep={activeStep}
        className={styles.stepperWrapper}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              onClick={handleStep(index)}
              completed={stepCompleted[index]}
              className={styles.labelWrapper}
            >
              {label}
              {index === 0 && conDetails.database.label && (
                <Typography className={styles.stepLabel}>
                  ({conDetails.database.label})
                </Typography>
              )}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Typography component="div" className={styles.instructions}>
        {getStepContent(activeStep)}
      </Typography>
    </Box>
  );
};
export default ConnectToDataBase;
