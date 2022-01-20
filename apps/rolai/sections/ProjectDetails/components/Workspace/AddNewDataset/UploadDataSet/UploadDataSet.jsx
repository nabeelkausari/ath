import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import cx from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';
import readXlsxFile from 'read-excel-file';

import AccordionPanel from '../../../../../../components/AccordionPanel/AccordionPanel';
import RadioGroup from '../../../../../../components/Radio/radio';
import {
  hideDialog,
  setDialogOptions,
} from '../../../../../../store/global/actions';
import {
  getFileUploadSettings,
  uploadDataset,
} from '../../../../../../store/workspace/datasets/actions';
import { getUserIdFromProfile } from '../../../../../../utils/helpers/storage';
import useStyles from './UploadDataSet.styles';

const fileFormat = [
  {
    label: 'CSV',
    value: 'csv',
  },
  {
    label: 'Excel',
    value: 'xls',
  },
  {
    label: 'JSON',
    value: 'json',
  },
];
const columnSeparator = [
  {
    label: 'Semicolon',
    value: ';',
  },
  {
    label: 'Comma',
    value: ',',
  },
  {
    label: 'Tab',
    value: '\t',
  },
];

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

const getFileType = (file_type) => {
  switch (file_type) {
    case 'csv':
      return 'text/csv';
    case 'xls':
      return '.xls, .xlsx';
    case 'json':
      return 'text, .json';
    default:
      return '';
  }
};

const animatedSheetSelection = makeAnimated();

const UploadDataSet = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { solve, datasets } = useSelector((state) => state.workspace);
  const [selectedFileFormat, setSelectedFileFormat] = useState('csv');
  const [selectedSeparator, setSelectedSeparator] = useState(';');
  const [file, setFile] = useState(null);
  const [sheets, setSheets] = useState(null);
  const [sheetProcessing, setSheetProcessing] = useState(null);
  const [sheetSelection, setSheetSelection] = useState(0);
  const [selectedSheets, setSelectedSheets] = useState(null);
  const [mergeSheets, setMergeSheets] = useState(null);
  const [excelOptions, disableSheetSelection] = getExcelOptions(sheets);

  const {
    upload_dataset_loading,
    upload_dataset_failed,
    upload_dataset_succeeded,
    setting: upload_settings,
  } = datasets;

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        let reader = new FileReader();
        let file = acceptedFiles[0];
        reader.onloadend = () => {
          setFile(file);
          // if (selectedFileFormat === "csv") {
          //   this.props.onFileLoad(file, this.state.separator);
          // }

          if (file.name && selectedFileFormat === 'xls') {
            setSheetProcessing(true);
            readXlsxFile(file, { getSheets: true }).then((d) => {
              setSheets(d.map((s) => ({ label: s.name, value: s.name })));
              setSheetProcessing(false);
            });
          }
        };
        reader.readAsDataURL(file);
      }

      dispatch(
        setDialogOptions({
          no_hide_with_yes: true,
          yes_button: {
            text: 'Submit',
            disabled: false,
            onClick: () => {
              let formData = new FormData();
              formData.append('file_type', selectedFileFormat);
              formData.append('file', acceptedFiles[0]);
              formData.append('separator', selectedSeparator);
              formData.append('solve_id', solve?.solve_id?.toString());
              formData.append('user_id', getUserIdFromProfile());
              formData.append(
                'tenant_id',
                'da49652c-ba7d-4531-b610-a50cf856d841'
              );
              if (selectedFileFormat === 'xls') {
                formData.append('isMerge', (!!mergeSheets).toString());
                const sheetNames =
                  sheetSelection === 1 ? selectedSheets : sheets;
                formData.append(
                  'sheetNames',
                  JSON.stringify(sheetNames.map((s) => s.value))
                );
              }

              dispatch(uploadDataset(formData));
            },
          },
        })
      );
    },
    [
      selectedFileFormat,
      selectedSeparator,
      mergeSheets,
      sheetSelection,
      JSON.stringify(selectedSheets),
      JSON.stringify(sheets),
    ]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: getFileType(selectedFileFormat),
    });
  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  useEffect(() => {
    onDrop(acceptedFiles);
  }, [
    selectedSeparator,
    mergeSheets,
    sheetSelection,
    JSON.stringify(selectedSheets),
    JSON.stringify(sheets),
  ]);

  useEffect(() => {
    if (upload_dataset_loading) {
      dispatch(
        setDialogOptions({
          yes_button: { disabled: true, text: 'Submitting' },
          submitting: true,
        })
      );
    }
    if (upload_dataset_failed) {
      dispatch(
        setDialogOptions({
          yes_button: { disabled: false, text: 'Submit' },
          submitting: false,
        })
      );
    }
  }, [upload_dataset_loading, upload_dataset_failed]);

  useEffect(() => {
    if (upload_dataset_succeeded) {
      dispatch(setDialogOptions({ submitting: false }));
      dispatch(hideDialog());
    }
  }, [upload_dataset_succeeded]);

  useEffect(() => {
    acceptedFiles.pop();
    setFile(null);
    dispatch(
      setDialogOptions({ yes_button: { disabled: true, text: 'Submit' } })
    );
  }, [selectedFileFormat]);

  useEffect(() => {
    dispatch(getFileUploadSettings());
    return () =>
      dispatch(
        setDialogOptions({ yes_button: { disabled: true, text: 'Submit' } })
      );
  }, []);

  return (
    <>
      <AccordionPanel
        title={<Typography>Instructions for Upload Dataset</Typography>}
      >
        <Box pl={1} pr={1} mb={4}>
          {upload_settings?.instructions_list &&
            upload_settings.instructions_list.map((item, i) => (
              <Typography key={i}>
                {i + 1}. {item}
              </Typography>
            ))}
        </Box>
      </AccordionPanel>

      <Box mt={2} className={styles.radioButtons}>
        <Typography variant="body2" color="textSecondary">
          File Format
        </Typography>
        <RadioGroup
          radio_list={fileFormat}
          onSelect={(v) => setSelectedFileFormat(v)}
          selected_id={selectedFileFormat}
        />
      </Box>
      {selectedFileFormat === 'csv' && (
        <Box className={styles.radioButtons}>
          <Typography variant="body2" color="textSecondary">
            Column Separator
          </Typography>
          <RadioGroup
            radio_list={columnSeparator}
            onSelect={(v) => setSelectedSeparator(v)}
            selected_id={selectedSeparator}
          />
        </Box>
      )}
      {selectedFileFormat && (
        <Typography
          component="div"
          {...getRootProps()}
          className={styles.fileUploader}
        >
          <input {...getInputProps()} />
          {file ? (
            <ul>{acceptedFileItems}</ul>
          ) : (
            <>
              <Typography>Drag file here</Typography>
              <Typography variant="caption" my={2} component="p">
                or
              </Typography>
              <Typography>Select a file from your device</Typography>
            </>
          )}
        </Typography>
      )}

      {file && selectedFileFormat === 'xls' && (
        <div
          className={cx([
            sheetProcessing && 'excel-sheet-processing',
            upload_dataset_loading && 'excel-sheet-uploading',
          ])}
        >
          <div className="excel-selection">
            <Typography variant="body2" color="textSecondary">
              Sheet Selection
            </Typography>
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

            <Typography variant="body2" color="textSecondary">
              Selection Options
            </Typography>
            <div className="excel-selection__row">
              <input
                className="styled-checkbox"
                id="merge_sheets"
                type="checkbox"
                checked={mergeSheets}
                onChange={(e) => setMergeSheets(e.target.checked)}
              />
              <Typography
                className="checkbox-wrapper__label"
                component={'label'}
                htmlFor="merge_sheets"
                variant="body2"
                color="textSecondary"
              >
                Merge Sheets
              </Typography>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default UploadDataSet;
