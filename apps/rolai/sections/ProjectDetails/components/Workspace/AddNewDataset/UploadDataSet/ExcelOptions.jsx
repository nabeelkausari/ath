import cx from 'classnames';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';

import RadioGroup from '../../../../../../components/Radio/radio';

const animatedSheetSelection = makeAnimated();

const getExcelOptions = (sheets) => {
  let disableSheetSelection = true;
  if (sheets && sheets.length > 1) {
    disableSheetSelection = false;
  }
  return [
    [
      {
        label: 'Import all sheets',
        value: 0,
      },
      {
        label: 'Import specific sheets',
        value: 1,
        disabled: disableSheetSelection,
      },
    ],
    disableSheetSelection,
  ];
};

const ExcelOptions = ({
  file,
  sheets,
  sheetProcessing,
  sheetSelection,
  setSheetSelection,
  setSelectedSheets,
  mergeSheets,
  setMergeSheets,
}) => {
  const [excelOptions, disableSheetSelection] = getExcelOptions(sheets);
  const { datasets } = useSelector((state) => state.workspace);

  const upload_dataset_loading = datasets?.upload_dataset_loading;
  return (
    <div
      className={cx([
        sheetProcessing && 'excel-sheet-processing',
        upload_dataset_loading && 'excel-sheet-uploading',
      ])}
    >
      <div style={{ marginBottom: '1.5rem' }}>Sheet Selection</div>
      <div className="excel-selection">
        <div className="excel-selection__row">
          <RadioGroup
            radio_list={excelOptions}
            selected_id={sheetSelection}
            onSelect={(sheet) => setSheetSelection(sheet)}
            horizontal
          />
        </div>
        {!disableSheetSelection && sheetSelection === 1 && (
          <div className="excel-selection__row">
            <ReactSelect
              isMulti
              components={animatedSheetSelection}
              onChange={(sheets) => setSelectedSheets(sheets)}
              options={sheets}
              classNamePrefix="ath-select"
              className="ath-select-container"
            />
          </div>
        )}
        <div style={{ marginBottom: '1.5rem' }}>Selection Options</div>
        <div className="excel-selection__row">
          <div>
            <input
              className="styled-checkbox"
              id="merge_sheets"
              type="checkbox"
              checked={mergeSheets}
              onChange={(e) => setMergeSheets(e.target.checked)}
            />
            <label className="checkbox-wrapper__label" htmlFor="merge_sheets">
              Merge Sheets
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelOptions;
