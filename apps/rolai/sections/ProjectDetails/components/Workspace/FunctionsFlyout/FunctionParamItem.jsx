import { get, uniqBy } from 'lodash';
import { any, fromPairs, keys, pathOr } from 'ramda';
import React, { useEffect, useState } from 'react';
// import { FormControl, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';

import {
  formValueMultiChange,
  removeSelection,
  setSelectedFunctionParameters,
} from '../../../../../store/workspace/functions/actions';

const getPattern = (type) => {
  switch (type) {
    case 'int':
      return undefined; // '\-?\d+';
    case 'float':
      return undefined; // '\-?\d+(\.\d+)?';
    default:
      return undefined;
  }
};

const FunctionParamItem = ({ parameter_name }) => {
  const dispatch = useDispatch();
  const [props, setProps] = useState({});
  const [name, setName] = useState();
  const [dataset, setDataset] = useState();
  const [columns, setColumns] = useState();
  const [selectedColumns, setSelectedColumns] = useState([]);
  const { functions, datasets } = useSelector((state) => state.workspace);

  useEffect(() => {
    const function_parameter = functions?.parameters?.list
      .filter((parameter) => parameter.name === parameter_name)
      .shift();
    const type =
      function_parameter.type === 'int' || function_parameter.type === 'float'
        ? 'text'
        : function_parameter.type;
    const step =
      function_parameter.type === 'float'
        ? 0.000001
        : function_parameter.type === 'int'
        ? 1
        : undefined;
    const pattern = getPattern(function_parameter.type);
    const parameters = functions?.parameters;
    const selections = functions?.selections;
    const selected_hrefs = keys(functions?.selections);
    const isDataSetSelected = (dataSetHref) =>
      any(
        (selected_href) => dataSetHref.indexOf(selected_href) >= 0,
        selected_hrefs
      );
    const data_sets = datasets.list.items;
    const selected_data_sets = data_sets.map((data_set, index) => ({
      name: data_set.name || `Table_${index}`,
      path: data_set.ref,
      has_selections: selected_hrefs.some(
        (reference) => reference === data_set.ref
      ),
    }));
    const data_set_reference = selected_data_sets
      .filter((ds) => isDataSetSelected(pathOr('', ['path'], ds)))
      .filter((ds) => selections[ds.path].length !== 0)
      .map((ds) => ds);
    let data_set_references = fromPairs(
      data_set_reference.map((ds) => [
        ds.path,
        {
          name: ds.name,
          path: ds.path,
          uri: ds.path,
        },
      ])
    );

    const _props = {
      ...function_parameter,
      value: functions?.parameters[parameter_name],
      step,
      note: function_parameter.note,
      parameters: parameters,
      selections,
      dataSets: data_set_references,
      data_set: data_set_reference,
      type,
      pattern,
    };

    setProps(_props);
    setName(get(_props, 'data_set[0].name'));
    setDataset(get(_props, 'data_set[0].path'));
    setColumns(
      _props.selections[_props.data_set[0].path].length !== 0
        ? _props.selections[_props.data_set[0].path].map(
            (selections) => selections.key
          )
        : null
    );
  }, []);

  const onChange = (value) =>
    dispatch(setSelectedFunctionParameters(parameter_name, value));
  const handleRemoveSelection = () => dispatch(removeSelection(parameter_name));
  const onMultiChange = (value) =>
    dispatch(formValueMultiChange(parameter_name, value));

  const onColumnChange = (columns_list) => {
    let selected_columns =
      columns_list !== null ? columns_list.map((column) => column.value) : [];

    setSelectedColumns(selected_columns.map((selected) => selected));
    onMultiChange({
      name,
      dataset,
      columns: selected_columns,
    });
  };

  const onDatasetChange = (dataset) => {
    setName(props.dataSets[dataset.value].name);
    setDataset(dataset.value);
    setColumns(
      props.selections[props.dataSets[dataset.value].uri].map(
        (headerSelection) => headerSelection.key
      )
    );
    setSelectedColumns([]);
  };

  const handleInputChange = (value) => {
    if (value === null) return;

    if (typeof value === 'string' || typeof value === 'number') {
      return onChange(value);
    } else {
      if (props.multi_select) {
        const selection_list = value.map((item) => item.value);
        if (!selection_list.length) return handleRemoveSelection();
        onChange(selection_list);
      } else {
        onChange(value.value);
      }
    }
  };

  const {
    label,
    multi_table,
    value,
    required,
    options,
    multi_select,
    readonly,
    note,
    data_set,
    type,
    pattern,
  } = props;
  const datasetOptions =
    data_set && data_set.map((ds) => ({ value: ds.path, label: ds.name }));
  const datasetColumnOptions =
    columns && columns.map((column) => ({ value: column, label: column }));
  const option_list = uniqBy(options, 'label');

  return (
    <div className="fx__params-container">
      {!!multi_table ? (
        <div>
          <h4 className="">
            {label} {required && <span className="fx__is-required" style={{color: "red"}}>*</span>}
          </h4>
          {type === 'select' && (
            <ReactSelect
              defaultValue={datasetOptions[0]}
              options={datasetOptions}
              onChange={onDatasetChange}
              isMulti={false}
              classNamePrefix="ath-select"
              className="ath-select-container"
            />
          )}

          <h4 style={{ marginTop: '15px' }}>Select Columns</h4>
          {type === 'select' && (
            <ReactSelect
              options={datasetColumnOptions}
              onChange={onColumnChange}
              isMulti={multi_select && multi_table}
              classNamePrefix="ath-select"
              className="ath-select-container"
            />
          )}
          {note && (
            <div className="helper-text">
              <i className="fa fa-info-circle helper-text__icon" />
              <p className="helper-text__message">{note}</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h4>
            {label} {required && <span className="fx__is-required" style={{color: "red"}}>*</span>}
          </h4>
          {type !== 'select' && (
            <input
              className="param-input"
              type={type}
              // label={label}
              value={value}
              pattern={pattern}
              onChange={(ev) => handleInputChange(ev.target.value)}
              required={required}
              readOnly={readonly}
            />
          )}
          {type === 'select' && (
            <ReactSelect
              options={option_list}
              onChange={handleInputChange}
              isMulti={multi_select || false}
              classNamePrefix="ath-select"
              className="ath-select-container"
            />
          )}
          {note && (
            <div className="helper-text">
              <i className="fa fa-info-circle helper-text__icon" />
              <p className="helper-text__message">{note}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FunctionParamItem;
