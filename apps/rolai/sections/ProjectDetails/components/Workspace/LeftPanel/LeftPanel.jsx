import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ChevronRight from '@mui/icons-material/ChevronRight';
import cx from 'classnames';
import debounce from 'lodash/debounce';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DatasetsTabIcon, FunctionsIcon } from '../../../../../common/images';
import { getWorkspaceSolveInternal } from '../../../../../store/workspace/actions';
import {
  removeSelectedFunctionsAndParameters,
  setSelectedFunctionCategory,
  suggestFunctions,
} from '../../../../../store/workspace/functions/actions';
import { initialExecutionStatusCheck } from '../../../../../store/workspace/steps/actions';
import DatasetsFlyout from '../DatasetsFlyout/DatasetsFlyout';
import FunctionsFlyout from '../FunctionsFlyout/FunctionsFlyout';
import SearchInput from '../FunctionsFlyout/SearchInput';
import useStyles from './LeftPanel.styles';

const LeftPanel = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [openFunctions, setOpenFunctions] = useState(null);
  const [openDatasets, setOpenDatasets] = useState(null);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const { datasets, functions } = useSelector((state) => state.workspace);
  const function_execution_succeeded = functions?.function_execution_succeeded;
  const function_execution_loading = functions?.function_execution_loading;
  const functions_succeeded = functions?.functions_succeeded;
  const functions_loading = functions?.functions_requested;
  const is_case = router.query?.project_id !== undefined;
  const { name } = functions?.execution?.current_function_category;

  const onSelect = (category) => {
    if (!functions_succeeded) return;
    setSearchText('');
    setOpenDatasets(false);
    setOpenFunctions(true);
    dispatch(setSelectedFunctionCategory(category));
  };
  const onSelectTable = (dt) => {
    setSearchText('');
    setSelectedDataset(dt);
    setOpenFunctions(false);
    setOpenDatasets(true);
  };

  useEffect(() => {
    if (function_execution_loading) {
      setOpenDatasets(false);
      setOpenFunctions(false);
    }
  }, [function_execution_loading]);

  useEffect(() => {
    if (function_execution_succeeded) {
      dispatch(initialExecutionStatusCheck());
      setSearchText('');
    }
  }, [function_execution_succeeded]);

  const handleSuggestFunctions = debounce((query) => {
    if (query === '') {
      setOpenFunctions(false);
      setOpenDatasets(false);
      dispatch(removeSelectedFunctionsAndParameters());
    } else {
      setOpenFunctions(true);
      setOpenDatasets(false);
      dispatch(suggestFunctions(query));
    }
  }, 500);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    handleSuggestFunctions(e.target.value);
  };

  const categories = functions?.categories?.items?.length
    ? functions?.categories?.items
        .filter((category) => category._links.parent === undefined)
        .map((cat) => ({
          ...cat,
          sub_categories: functions?.categories?.items
            .filter(
              (c) =>
                c._links.parent && c._links.parent.href === cat._links.self.href
            )
            .map((subcat) => ({
              ...subcat,
              functions_list:
                functions?.list?.items &&
                functions?.list?.items
                  .filter((f) => f._links.self)
                  .filter(
                    (fn) => subcat.functions.indexOf(fn._links.self.href) !== -1
                  ),
            })),
        }))
    : [];

  return (
    <Box height={'100%'}>
      <Box
        className={cx([styles.leftBar, !is_case && styles.leftBarNonProject])}
      >
        <Box className={styles.datasetsSection}>
          <Box className={styles.leftBarTitle}>
            <Image src={DatasetsTabIcon} width={14} height={14} />{' '}
            <Typography className={styles.leftBarTitleText}>
              Data Sets
            </Typography>
          </Box>
          <Box
            className={cx([
              styles.datasetsBar,
              !is_case && styles.datasetsBarNonProject,
            ])}
          >
            {datasets?.list?.items?.length > 0 &&
              datasets.list.items.map((table, i) => {
                const selection_count =
                  functions?.selections[table.ref]?.length;
                return (
                  <Box
                    key={i}
                    onClick={() => onSelectTable(table)}
                    className={cx([
                      styles.leftBarItem,
                      openDatasets &&
                        selectedDataset?.ref === table.ref &&
                        styles.leftBarItemSelected,
                    ])}
                  >
                    <>
                      <Typography className={styles.leftBarItemText}>
                        {table.name}
                      </Typography>
                      {selection_count !== undefined && selection_count !== 0 && (
                        <Box className={styles.listCountContainer}>
                          <Typography mx={1} className={styles.listCount}>
                            {selection_count}
                          </Typography>
                        </Box>
                      )}
                    </>
                    <ChevronRight height={6} />
                  </Box>
                );
              })}
          </Box>
        </Box>
        <Box className={styles.functionsSection}>
          <Box className={styles.leftBarTitle} mt={4}>
            <Image src={FunctionsIcon} width={14} height={14} />{' '}
            <Typography className={styles.leftBarTitleText}>
              Functions
            </Typography>
          </Box>
          <SearchInput
            value={searchText}
            onChange={handleSearch}
            disabled={functions_loading}
          />
          {categories.map((cat, i) => (
            <Box
              key={i}
              onClick={() => onSelect(cat)}
              className={cx([
                styles.leftBarItem,
                openFunctions &&
                  cat.name === name &&
                  styles.leftBarItemSelected,
              ])}
            >
              <Typography
                className={cx([
                  styles.leftBarItemText,
                  functions_loading && styles.loading,
                ])}
              >
                {cat.name}
              </Typography>
              <ChevronRight height={6} />
            </Box>
          ))}
        </Box>
      </Box>
      {openFunctions && (
        <FunctionsFlyout
          is_case={is_case}
          searchText={searchText}
          closeFlyout={() => setOpenFunctions(false)}
        />
      )}
      {openDatasets && (
        <DatasetsFlyout
          is_case={is_case}
          current_dataset={selectedDataset}
          closeFlyout={() => setOpenDatasets(false)}
        />
      )}
    </Box>
  );
};
export default LeftPanel;
