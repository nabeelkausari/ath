import { MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import MuiInputLabel from '@mui/material/InputLabel';
import Typography from "@mui/material/Typography";
import sortedUniq from 'lodash/sortedUniq';
import uniqBy from 'lodash/uniqBy';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';

import { setDialogOptions, hideDialog } from '../../../../../../store/global/actions';
import {
  addDataset,
  fetchPreloadDatasets,
} from '../../../../../../store/workspace/datasets/actions';
import useStyles from './PreloadedDataset.styles';

const SELECT_CATEGORY = 'Select Category';
const SELECT_SUBCATEGORY = 'Select Sub-Category';
const SELECT_DATASET = 'Select dataset';
const ALL = 'All';

const PreloadedDataset = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [preloadedDatasets, setPreloadedDatasets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [titles, setTitles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const [selectedSubCategory, setSelectedSubCategory] = useState(ALL);
  const [selectedTitle, setSelectedTitle] = useState(SELECT_DATASET);

  const { preload_datasets, preload_dataset_succeeded } = useSelector(
    (state) => state.workspace?.datasets
  );

  useEffect(() => {
    dispatch(fetchPreloadDatasets());
    return () =>
      dispatch(
        setDialogOptions({ yes_button: { disabled: true, text: 'Submit' } })
      );
  }, []);

  useEffect(() => {
    setPreloadedDatasets(preload_datasets);
    initializeData(preload_datasets);
  }, [preload_dataset_succeeded]);

  const getCategories = (preloadedDatasets) =>
    [ALL].concat(preloadedDatasets.map((dataset) => dataset.category));

  const getSubCategoriesBy = (preloadedDatasets, category) => {
    if (category === ALL) {
      return [ALL].concat(
        preloadedDatasets.map((dataset) => dataset.subcategory)
      );
    } else {
      return [ALL].concat(
        preloadedDatasets
          .filter((dataset) => dataset.category === category)
          .map((dataset) => dataset.subcategory)
      );
    }
  };

  const getTitlesBy = (preloadedDatasets, category, subcategory) => {
    if (category === ALL && subcategory === ALL) {
      return [SELECT_DATASET].concat(
        preloadedDatasets.map((dataset) => dataset.title)
      );
    } else if (category === ALL) {
      return [SELECT_DATASET].concat(
        preloadedDatasets
          .filter((dataset) => dataset.subcategory === subcategory)
          .map((dataset) => dataset.title)
      );
    } else if (subcategory === ALL) {
      return [SELECT_DATASET].concat(
        preloadedDatasets
          .filter((dataset) => dataset.category === category)
          .map((dataset) => dataset.title)
      );
    } else {
      return [SELECT_DATASET].concat(
        preloadedDatasets
          .filter(
            (dataset) =>
              dataset.category === category &&
              dataset.subcategory === subcategory
          )
          .map((dataset) => dataset.title)
      );
    }
  };

  const getCurrentDataSet = (selectedTitle) => {
    return preloadedDatasets
      .filter(({ title }) => title === selectedTitle)
      .shift();
  };

  const getFilepath = (title = '') => {
    const current_dataset = getCurrentDataSet(title);
    return current_dataset ? current_dataset.filepath : '';
  };

  const initializeData = (datasets) => {
    setCategories(sortedUniq(getCategories(datasets)));
    setSubCategories(getSubCategoriesBy(datasets, ALL));
    setTitles(getTitlesBy(datasets, ALL, ALL));
    setSelectedCategory(ALL);
    setSelectedSubCategory(ALL);
    setSelectedTitle(SELECT_DATASET);
  };

  const handleCategoryChange = (option) => {
    let category = option.value;
    category = category === SELECT_CATEGORY ? '' : category;
    setSelectedCategory(category);
    setSelectedSubCategory('');
    setSelectedTitle('');
    setSubCategories(getSubCategoriesBy(preloadedDatasets, category));
    setTitles(getTitlesBy(preloadedDatasets, category, selectedSubCategory));
  };

  const handleSubCategoryChange = (option) => {
    let subcategory = option.value;
    setSelectedSubCategory(
      subcategory === SELECT_SUBCATEGORY ? '' : subcategory
    );
    setSelectedTitle('');
    setTitles(
      getTitlesBy(
        preloadedDatasets,
        selectedCategory,
        subcategory === SELECT_SUBCATEGORY ? '' : subcategory
      )
    );
  };

  const handleTitleChange = (option) => {
    let title = option.value === SELECT_DATASET ? '' : option.value;
    setSelectedTitle(title);
    if (title !== '') {
      onSubmit(title);
    }
  };

  const onSubmit = useCallback(
    (title) => {
      dispatch(
        setDialogOptions({
          yes_button: {
            text: 'Submit',
            disabled: false,
            onClick: () => {dispatch(addDataset(getFilepath(title))); dispatch(hideDialog())},
          },
        })
      );
    },
    [selectedTitle, JSON.stringify(preloadedDatasets)]
  );

  const options_categories =
    categories &&
    categories.map((category) => ({ label: category, value: category }));
  const options_sub_categories =
    subCategories &&
    uniqBy(
      subCategories.map((sub_category) => ({
        label: sub_category,
        value: sub_category,
      })),
      'label'
    );
  const options_titles =
    titles &&
    uniqBy(
      titles.map((title) => ({ label: title, value: title })),
      'label'
    );

  return (
    <Box>
      <div className="preloaded-option">
        <Typography variant="body2" color="textSecondary">
          Category
        </Typography>
        <ReactSelect
          onChange={handleCategoryChange}
          options={options_categories}
          classNamePrefix="ath-select"
          className="ath-select-container"
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          menuPortalTarget={document.body}
        />
      </div>

      <div className="preloaded-option">
        <Typography variant="body2" color="textSecondary">
          Sub-category
        </Typography>
        <ReactSelect
          onChange={handleSubCategoryChange}
          options={options_sub_categories}
          classNamePrefix="ath-select"
          className="ath-select-container"
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          menuPortalTarget={document.body}
        />
      </div>

      <div className="preloaded-option">
        <Typography variant="body2" color="textSecondary">
          Dataset
        </Typography>
        <ReactSelect
          onChange={handleTitleChange}
          options={options_titles}
          classNamePrefix="ath-select"
          className="ath-select-container"
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          menuPortalTarget={document.body}
        />
      </div>
    </Box>
  );
};

export default PreloadedDataset;
