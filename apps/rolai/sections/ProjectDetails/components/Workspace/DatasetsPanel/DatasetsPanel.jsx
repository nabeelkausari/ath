import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Input } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import cx from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  CircleAddIcon,
  DownloadCircleIcon,
} from '../../../../../common/images';
import { showDialog } from '../../../../../store/global/actions';
import {
  renameDataset,
  selectTable,
} from '../../../../../store/workspace/datasets/actions';
import { resetFlyouts } from '../../../../../store/workspace/steps/actions';
import { handleOnEnter } from '../../../../../utils/api/fetch';
import { isReadOnlyProject } from '../../../../../utils/helpers/helperFunctions';
import { notify } from '../../../../../utils/helpers/notification';
import AddNewDataset from '../AddNewDataset/AddNewDataset';
import useStyles from './DatasetsPanel.styles';
import DataTable from './DataTable';

const DatasetsPanel = ({ stepsOpen }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const tableEditRef = useRef();
  const tablePillsRef = useRef();
  const [renameTableTabRef, setrenameTableTabRef] = useState(null);
  const [editDataSet, setEditDataSet] = useState(null);
  const [tableName, setTableName] = useState(null);

  const { datasets } = useSelector((state) => state.workspace);
  const { project } = useSelector((state) => state.cases);

  const { list, selected_table_reference, datasets_succeeded } = datasets;
  const read_only = isReadOnlyProject(project);
  const is_case = router.query?.project_id !== undefined;

  useEffect(() => {
    if (datasets_succeeded && list.items.length === 0) {
      handleAddDataset();
    }
  }, [datasets_succeeded]);

  const handleAddDataset = () => {
    dispatch(
      showDialog({
        options: {
          size: 'medium',
          title: 'Add New Dataset',
          fullWidth: true,
          component: AddNewDataset,
          no_button: {
            text: 'Close',
            // onClick: () => dispatch(()=>{}),
          },
          yes_button: {
            text: 'Submit',
            disabled: true,
            // onClick: () => dispatch(()=>{}),
          },
          items_centered: true,
        },
      })
    );
  };

  const renameTableClick = (e, dt) => {
    setrenameTableTabRef(dt.ref);
    setEditDataSet(dt);
    setTableName(dt.name);
    dispatch(resetFlyouts);
    setTimeout(() => tableEditRef.current.children[0].focus());
    e.stopPropagation();
  };
  const resetTableRename = () => {
    setrenameTableTabRef(null);
    setEditDataSet('');
    setTableName(null);
  };

  const saveTableName = (e) => {
    e && e.preventDefault();
    dispatch(renameDataset(editDataSet.name, tableName, editDataSet.ref));
    resetTableRename();
  };

  const onTableNameChange = (e) => {
    let table_name = e.target.value;
    if (table_name.includes(' ')) {
      notify.warning('Space Not Allowed', 'Table name cannot have space in it');
      table_name = table_name.replace(' ', '');
    }
    setTableName(table_name);
  };

  return (
    <Box
      className={cx([
        styles.tableContainer,
        !is_case && styles.tableContainerNonProject,
      ])}
    >
      <Box className={styles.tableHeader}>
        <Box
          className={cx([
            styles.pillContainer,
            !read_only && is_case && styles.pillContainerWithAdd,
          ])}
        >
          <ButtonGroup
            className={styles.buttonGroup}
            variant="outlined"
            aria-label="outlined button group"
            ref={tablePillsRef}
          >
            {list?.items.map((dt, i) => {
              const selected = selected_table_reference === dt.ref;
              const rename_table_active = renameTableTabRef === dt.ref;
              return rename_table_active ? (
                <Input
                  type="text"
                  value={tableName}
                  onChange={onTableNameChange}
                  onBlur={saveTableName}
                  onKeyDown={(e) => handleOnEnter(e, saveTableName)}
                  className={styles.tableInput}
                  ref={tableEditRef}
                  style={{
                    width: tablePillsRef.current.children[i].offsetWidth,
                  }}
                />
              ) : (
                <Button
                  onClick={() => dispatch(selectTable(dt.ref))}
                  className={cx([styles.tablePill, selected && 'selected'])}
                  key={i}
                  endIcon={
                    selected && !read_only && is_case ? (
                      <CreateOutlinedIcon
                        onClick={(e) => renameTableClick(e, dt)}
                      />
                    ) : null
                  }
                >
                  {dt.name}
                </Button>
              );
            })}
          </ButtonGroup>
        </Box>
        {!read_only && is_case && (
          <Box title="Add Dataset" className={styles.addDataSetIcon}>
            <Image
              src={CircleAddIcon}
              width={28}
              height={28}
              onClick={handleAddDataset}
            />
          </Box>
        )}
        {list?.by_uri && list?.by_uri[selected_table_reference] && (
          <a
            title="Download Dataset"
            className={styles.downloadTable}
            href={list?.by_uri[selected_table_reference].datasetPath}
          >
            <Image src={DownloadCircleIcon} width={28} height={28} />
          </a>
        )}
      </Box>
      <Box
        className={cx([
          styles.table,
          !is_case && styles.tableNonProject,
          !stepsOpen && styles.tableFullWidth,
        ])}
      >
        <DataTable is_case={true} />
      </Box>
    </Box>
  );
};

export default DatasetsPanel;
