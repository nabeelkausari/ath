import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CheckBox from '../../../../../components/CheckBox/CheckBox';
import {
  deleteColumnSelection,
  setAllColumnSelections,
  setColumnSelectionsFromToolbar,
} from '../../../../../store/workspace/functions/actions';
import { isReadOnlyProject } from '../../../../../utils/helpers/helperFunctions';
import useStyles from '../FunctionsFlyout/FunctionsFlyout.styles';
import SearchInput from '../FunctionsFlyout/SearchInput';

const DatasetsFlyout = ({ current_dataset, closeFlyout, is_case }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [columnData, setColumnData] = useState([]);
  const { functions } = useSelector((state) => state.workspace);
  const { project } = useSelector((state) => state.cases);
  const [searchText, setSearchText] = useState('');

  const read_only = isReadOnlyProject(project);
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleColumnData = (columns) => {
    const colData = columns.map((col) => ({
      id: col.key,
      label: col.key,
      disabled: !!read_only,
      value:
        functions?.selections[current_dataset.ref] &&
        functions?.selections[current_dataset.ref].findIndex(
          (selected) => selected.key === col.key
        ) > -1,
    }));

    setColumnData([...colData]);
  };

  useEffect(() => {
    if (!current_dataset) return;
    if (searchText) {
      handleColumnData(
        current_dataset.columns.filter((col) =>
          col.key.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } else {
      handleColumnData(current_dataset.columns);
    }
  }, [
    searchText,
    current_dataset?.ref,
    JSON.stringify(functions?.selections[current_dataset?.ref]),
  ]);

  // const renderEachColumn = (list, view) => {
  //   const { selections, current_dataset } = this.props;
  //   const selected = selections[current_dataset] || [];
  //   let item_list = [];
  //   if (view !== "readonly") {
  //     list.map((column, i) =>
  //       item_list.push(
  //         <Checkbox
  //           checked={selected.some(item => item.key === column.key)}
  //           onChange={() => this.handleAvailableColumnSelect(column)}
  //           label={column.key}
  //           key={i}
  //         />
  //       )
  //     );
  //   } else {
  //     list.map(item =>
  //       item_list.push(<p className="column-name">{item.key}</p>)
  //     );
  //   }
  //   return item_list;
  // };

  const handleColumnSelect = (e) => {
    e.stopPropagation();

    dispatch(
      setColumnSelectionsFromToolbar(
        current_dataset.ref,
        current_dataset.columns.find((c) => c.key === e.target.id)
      )
    );
  };

  const handleAllSelect = (e) => {
    e.stopPropagation();
    dispatch(setAllColumnSelections(current_dataset.ref));
  };

  return (
    <Box className={styles.backdrop} onClick={closeFlyout}>
      <Box
        className={cx([styles.flyout, !is_case && styles.flyoutNonProject])}
        onClick={(e) => e.stopPropagation()}
      >
        <div onClick={closeFlyout} className="flyout-close">
          <CloseIcon />
        </div>
        <div className="columns-box">
          {/*{!read_only && search_column === '' && (*/}
          {!read_only && (
            <div className="select-all">
              {/*<CheckBox*/}
              {/*  onChange={(e) =>*/}
              {/*    dispatch(setAllColumnSelections(current_dataset))*/}
              {/*  }*/}
              {/*  options={[{ value: 'select-all', label: 'Select All' }]}*/}
              {/*/>*/}
              {/*<Checkbox*/}
              {/*  checked={selected.length === columns.length}*/}
              {/*  onChange={() =>*/}
              {/*    this.props.*/}
              {/*  }*/}
              {/*  label={getColumnSelectionText(*/}
              {/*    columns.length,*/}
              {/*    selected.length*/}
              {/*  )}*/}
              {/*/>*/}
            </div>
          )}
          <SearchInput
            className="flyout-search"
            value={searchText}
            onChange={handleSearch}
          />
          <Box>
            {columnData.length > 0 && (
              <CheckBox
                onChange={handleAllSelect}
                options={[
                  {
                    id: 'ALL',
                    label: `select all ${columnData.length} columns`,
                    disabled: !!read_only,
                    value: columnData.findIndex((i) => !i.value) == -1,
                  },
                ]}
              />
            )}
            <CheckBox onChange={handleColumnSelect} options={columnData} />
            {/*<div className="columns-box__left">*/}
            {/*  {this.renderEachCloumn(*/}
            {/*    columns_filtered_list.slice(0, Math.ceil(columns.length / 2)),*/}
            {/*    read_only ? "readonly" : "checkbox"*/}
            {/*  )}*/}
            {/*</div>*/}
            {/*<div className="columns-box__right">*/}
            {/*  {this.renderEachCloumn(*/}
            {/*    columns_filtered_list.slice(Math.ceil(columns.length / 2)),*/}
            {/*    read_only ? "readonly" : "checkbox"*/}
            {/*  )}*/}
            {/*</div>*/}
          </Box>
        </div>
      </Box>
    </Box>
  );
};
export default DatasetsFlyout;
