import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AccordionPanel from '../../../../../components/AccordionPanel/AccordionPanel';
import Button from '../../../../../components/Button';
import EditorView from '../../../../../components/Editor/EditorView';
import {
  executeFunction,
  getFunctionParameters,
} from '../../../../../store/workspace/functions/actions';
import { setColumnSelectionsFromToolbar } from '../../../../../store/workspace/functions/actions';
import FunctionParamItem from './FunctionParamItem';
import useStyles from './FunctionsFlyout.styles';
const FunctionParameters = ({ closeSelection, className }) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const { functions, datasets } = useSelector((state) => state.workspace);
  const execution = functions?.execution;
  const parameters = functions?.parameters;
  const selections = functions?.selections;
  const description = functions?.description;
  const name = description?.info?.name;
  const has_parameters = parameters?.list?.length > 0;
  const has_selections =
    selections && Object.keys(selections) && Object.keys(selections).length > 0;

  useEffect(() => {
    dispatch(getFunctionParameters(execution?.current_function));
  }, [JSON.stringify(selections)]);
  const execute = () => {
    dispatch(executeFunction());
    closeSelection();
  };

  const handleDelete = (ref, col) => {
    dispatch(setColumnSelectionsFromToolbar(ref, col));
  };

  return (
    <div className={className}>
      <div onClick={closeSelection} className="flyout-close">
        <CloseIcon />
      </div>
      <div className="fx__header">
        <h2 className="fx__header-title">
          {name ? name.replace('Function - ', '') : ''}
        </h2>
        {Object.keys(selections).length > 0 && (
          <AccordionPanel
            expanded={true}
            title={
              <Typography classname={styles.title}>Selected Columns</Typography>
            }
          >
            <div>
              {Object.keys(selections).map((table, i) => (
                <Box key={i}>
                  <span className={styles.tableName}>
                    {datasets.selections[table]?.name}:
                  </span>
                  {selections[table].map((col, c) => (
                    <Chip
                      size="small"
                      className={styles.chip}
                      key={c}
                      label={col.key}
                      onDelete={(e) => {
                        e.stopPropagation();
                        handleDelete(table, col);
                      }}
                      deleteIcon={<CloseIcon />}
                    />
                  ))}
                </Box>
              ))}
            </div>
          </AccordionPanel>
        )}
        {/*<AddIcon onClick={closeParameterFlyout} className="fx__header-close" />*/}
      </div>
      {/*{parameters.fetch_function_parameters_loading && <ParameterSkeleton />}*/}
      {!parameters.fetch_function_parameters_loading && has_selections && (
        <AccordionPanel
          expanded={true}
          title={<Typography className={styles.title}>Parameters</Typography>}
        >
          {has_parameters && (
            <div className="fx__params">
              {parameters.list.map(({ name, multi_table }) => (
                <FunctionParamItem
                  key={name}
                  parameter_name={name}
                  readonly={false}
                  multi_table={multi_table}
                />
              ))}
            </div>
          )}
          {!has_parameters && (
            <div className="fx__no-params ">
              {/*<ParameterIcon className="fx__no-params--image" />*/}
              <div className="fx__no-params--title">
                <p>Parameters are not required for this function</p>
              </div>
            </div>
          )}
          <div className="fx__footer">
            <Button
              onClick={execute}
              className="fx__execute-btn"
              disabled={parameterValidation(parameters, execution)}
            >
              Execute
            </Button>
          </div>
        </AccordionPanel>
      )}

      <AccordionPanel
        expanded={true}
        title={
          <Typography classname={styles.title}>
            {name
              ? name.replace('Function - ', 'Description - ')
              : 'Function - Description'}
          </Typography>
        }
      >
        {description?.fetch_description_loading ? (
          <Typography>Loading...</Typography>
        ) : description?.info?.text ? (
          <EditorView content={description.info.text} controlled />
        ) : (
          <Typography>Description Not Available</Typography>
        )}
      </AccordionPanel>
    </div>
  );
};

const parameterValidation = (parameters, execution) => {
  let param_check_flag = false;
  parameters.list.forEach((param) => {
    if (param.required) {
      if (
        execution.selected_parameters[param.name] === undefined ||
        execution.selected_parameters[param.name] === ''
      ) {
        param_check_flag = true;
      }
    }
  });
  return param_check_flag;
};

export default FunctionParameters;
