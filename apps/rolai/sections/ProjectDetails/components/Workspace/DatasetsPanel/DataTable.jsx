import cx from 'classnames';
import get from 'lodash/get';
import { path } from 'ramda';
import React, { Component, Fragment, memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import TableSkeleton from '../../../../../../app/components/Skeletons/TableSkeleton';
// import Tooltip from '../../../../../../app/components/Tooltip/Tooltip';
import { fetchCsvData } from '../../../../../store/workspace/datasets/actions';
import {
  setAllColumnSelections,
  setColumnSelections,
} from '../../../../../store/workspace/functions/actions';
import { isReadOnlyProject } from '../../../../../utils/helpers/helperFunctions';
// import { DataTableContainer } from '../containers/dataTable';
// import RenderTableContainer from '../containers/renderTable';
import CardSkeleton from './SkeletonLoader';

const DataTable = ({ is_case, is_steps_open }) => {
  const dispatch = useDispatch();
  const [tableLoading, setTableLoading] = useState(true);
  const [tableData, setTableData] = useState([[' '], []]);
  const [csv, setCsv] = useState(null);
  const [inApply, setInApply] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [headerRow, setHeaderRow] = useState([]);

  const { project } = useSelector((state) => state.cases);

  const { datasets, functions, steps, solve } = useSelector(
    (state) => state.workspace
  );

  const { selections } = functions;
  const { steps_succeeded } = steps;
  const { selected_table_reference, datasets_succeeded } = datasets;
  const { data_by_uri, by_uri, items, data_download_succeeded } =
    datasets?.list;

  const selected_headers =
    selections[selected_table_reference] &&
    selections[selected_table_reference].map((s) => s.index);

  const read_only = isReadOnlyProject(project);

  // const {
  //   in_apply,
  //   show_notification_banner,
  // } = this.props;

  useEffect(() => {
    setInApply(
      get(solve, 'type') && get(solve, 'type').toUpperCase() === 'APPLY'
    );
  }, []);

  useEffect(() => {
    if (selected_table_reference && datasets_succeeded) {
      const matched_data_set = by_uri[selected_table_reference];
      let ui_csv = path(['uiDataLink', 'href'], matched_data_set);
      setCsv(
        ui_csv === undefined ? get(matched_data_set, 'datasetPath') : ui_csv
      );
    }
  }, [selected_table_reference, datasets_succeeded]);

  useEffect(() => {
    if (csv || datasets_succeeded) {
      prepareCsvData();
    }
  }, [csv, datasets_succeeded]);

  useEffect(() => {
    if (!(Object.keys(data_by_uri).length === 0 && data_by_uri[csv])) {
      getCsvDataFromStore();
    }
  }, [data_download_succeeded]);

  const getCsvDataFromStore = () => {
    let dataset = data_by_uri[csv] || [[' '], []];
    setTableData(dataset);
    setTableLoading(false);
  };

  const prepareCsvData = () => {
    setTableLoading(true);
    if (Object.keys(data_by_uri).length === 0) {
      dispatch(fetchCsvData(csv));
      setTableLoading(false);
      // this.props.fetchCsvData("https://devdata.analyttica.com/output/da49652c-ba7d-4531-b610-a50cf856d841/solve_100010/user_3820/data/Airline_SmoothLanding.uidata")
    } else {
      if (data_by_uri[csv] !== undefined) {
        getCsvDataFromStore();
      } else {
        dispatch(fetchCsvData(csv));
        // this.props.fetchCsvData("https://devdata.analyttica.com/output/da49652c-ba7d-4531-b610-a50cf856d841/solve_100010/user_3820/data/Airline_SmoothLanding.uidata")
      }
    }
  };

  const selectHeaders = (i, header) => {
    if (read_only) return;
    const selected_column = {
      index: i,
      key: header,
    };

    if (i === 0) {
      dispatch(setAllColumnSelections(selected_table_reference));
    } else {
      dispatch(setColumnSelections(selected_column));
    }
  };

  const [raw_headers, ...raw_columns] = tableData;
  if (tableLoading) return <CardSkeleton />;
  return (
    <div
      className={cx(
        'data-table',
        { 'data-table--1': is_steps_open },
        { 'data-table--2': !is_steps_open },
        { 'data-table--3': !is_case && inApply }
        // { 'data-table--notify-banner': show_notification_banner }
      )}
    >
      {tableLoading ||
      (data_by_uri[get(by_uri[selected_table_reference], 'uiDataLink.href')] ===
        undefined &&
        data_by_uri[get(by_uri[selected_table_reference], 'datasetPath')] ===
          undefined) ? null : (
        // <TableSkeleton is_steps_open={is_steps_open} />
        <table className="table">
          <span className="jr-table-header" />
          <span className="jr-table-body" />
          <thead>
            <tr>
              <Fragment>
                {read_only ? (
                  <th className="read-only" />
                ) : (
                  // <Tooltip
                  //   placement={'bottom'}
                  //   text={getColumnSelectionText(
                  //     raw_headers.length,
                  //     selections[selected_table_reference]
                  //       ? selections[selected_table_reference].length
                  //       : 0
                  //   )}
                  // >
                  <th onClick={() => selectHeaders(0)} key={0} />
                  // </Tooltip>
                )}

                {/*<ColumnResizer className="column-resizer" minWidth={1} />*/}
              </Fragment>
              {raw_headers &&
                raw_headers
                  .slice(0, 30)
                  .map((h, i) => (
                    <RenderColumn
                      selectedHeaders={selected_headers}
                      selectHeaders={selectHeaders}
                      key={i}
                      h={h}
                      i={i}
                      read_only={read_only}
                    />
                  ))}
            </tr>
          </thead>
          <tbody>
            {raw_columns &&
              raw_columns.map((rows, ri) => (
                <Fragment key={ri}>
                  <tr key={ri}>
                    <RenderRow rows={rows} index={ri} />
                  </tr>
                </Fragment>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const RenderColumn = memo(
  ({ h, i, selectedHeaders, selectHeaders, read_only }) => {
    return (
      <td
        title={h.replaceAll(/-/ig, '_')}
        className={cx(
          {
            selected: selectedHeaders && selectedHeaders.indexOf(i + 1) >= 0,
          },
          { 'read-only': read_only }
        )}
        onClick={() => !read_only && selectHeaders(i + 1, h)}
        key={i}
      >
        {h.replaceAll(/-/ig, '_')}
      </td>
    );
  },
  (prevProps, nextProps) => {
    const selection =
      nextProps.selectedHeaders &&
      nextProps.selectedHeaders.indexOf(nextProps.i + 1) >= 0;
    const deselection =
      prevProps.selectedHeaders &&
      prevProps.selectedHeaders.indexOf(prevProps.i + 1) >= 0;
    return !(!!selection || !!deselection || prevProps.h !== nextProps.h);
  }
);

RenderColumn.displayName = 'RenderColumn';

const RenderRowCell = memo(
  ({ selected, r }) => {
    return <td className={selected && 'selected'}>{r}</td>;
  },
  (prevProps, nextProps) => {
    return !(
      !!prevProps.selected ||
      !!nextProps.selected ||
      prevProps.r !== nextProps.r
    );
  }
);

RenderRowCell.displayName = 'RenderRowCell';

const RenderRow = ({ rows, index }) => {
  const { datasets, functions } = useSelector((state) => state.workspace);

  const { selections } = functions;
  const { selected_table_reference } = datasets;
  const selectedHeaders =
    selections[selected_table_reference] &&
    selections[selected_table_reference].map((s) => s.index);

  let result = [
    <Fragment key={index + '_row'}>
      <td key={index}>{index + 1}</td>
    </Fragment>,
  ];
  rows
    .slice(0, 30)
    .map((r, i) =>
      result.push(
        <RenderRowCell
          key={i}
          r={r}
          selected={selectedHeaders && selectedHeaders.indexOf(i + 1) >= 0}
        />
      )
    );
  return result;
};

export default DataTable;
