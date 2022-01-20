import React, { useEffect, useState } from 'react';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Paper, Typography } from '@mui/material';
import AntSwitch from '../../../../components/Switch/Switch';
import useStyles from './RosterTable.styles';
import { Box } from '@mui/system';
import Select from '../../Components/Select/Select';
import cx from 'classnames';
import Table from '../../Components/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeUserToggle,
  deleteRosterUser,
  setRosterPagination,
  updateRosterUser,
} from '../../../../store/admin/roster/actions';
import Image from 'next/image';
import { deleteIcon, editIcon } from '../../../../assets/Dashboard/Calendar';
import DialogView from '../../../../components/DialogView/DialogView';
import { showDialog } from '../../../../store/global/actions';
import NewUser from '../NewUser/NewUser';
import { useCommonStyles } from '../../Components/Common/Common.styles';
import Button from '../../../../components/Button/Button';

let toDelete = {};
export default function RosterTable({}) {
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // const { filter, pagination, users } = useSelector(
  //   (state) => state.admin.roster
  // );
  const dispatch = useDispatch();
  const styles = useStyles();
  const commonStyles = useCommonStyles();

  const { filter, pagination, users } = useSelector(
    (state) => state.admin.roster
  );

  const setPagination = (data) => {
    dispatch(setRosterPagination(data));
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };
  function createData(rowData) {
    const { name, email, designation, status, roles } = rowData;
    return {
      name,
      email,
      designation,
      status,
      roles,
      rowData: rowData,
    };
  }
  useEffect(() => {
    users &&
      setRows([
        ...users.map((user, k) => {
          return createData(user);
        }),
      ]);
  }, [JSON.stringify(users)]);

  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 100 },
    {
      id: 'designation',
      label: 'Title',
      minWidth: 170,
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 170,

      render: ({ value, rowData }) => {
        return (function Actions() {
          const checked = value === 'Active';
          const link = rowData._links.update_status;
          return (
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <AntSwitch
                checked={checked}
                onChange={(e) => {
                  dispatch(
                    changeUserToggle(link, {
                      id: rowData.id,
                      value: e.target.checked,
                    })
                  );
                }}
                inputProps={{ 'aria-label': 'ant design' }}
                styles={{
                  trackActiveBackground: '#3DDF87',
                  trackBackground: '#E2E4EF',
                }}
              />
              <span style={{ marginLeft: '10px' }}>{value}</span>
            </span>
          );
        })();
      },
    },
    {
      id: 'roles',
      label: 'Access Level',
      minWidth: 170,

      format: (value) => value?.join(', '),
    },
  ];

  const DeleteButton = () => {
    const deleteUser = () => {};
    return (
      <Button
        onClick={deleteUser}
        className={styles.deleteButton}
        variant="outlined"
      >
        <Box marginRight="5px">
          <Image src={deleteIcon} width={13} />
        </Box>
        delete
      </Button>
    );
  };

  const editUser = (rowData) => {
    dispatch(
      showDialog({
        options: {
          // fullScreen: true,
          size: 'large',
          className: commonStyles.rosterUserDailog,

          title: 'New User',
          component: () => <NewUser edit={true} editUserData={rowData} />,
          LeftActions: () => <DeleteButton />,
          yes_button: {
            text: 'Save',

            onClick: () => {
              dispatch(updateRosterUser());
            },
          },
          no_button: {
            text: 'Cancel',
          },
          no_hide_with_yes: true,
        },
      })
    );
  };
  const deleteUser = () => {
    console.log(toDelete);
    dispatch(deleteRosterUser(toDelete._links.delete_user, toDelete.id));
  };
  const RowActionComponent = ({ rowData }) => {
    return (
      <Box className={styles.rowActions}>
        <Box onClick={() => editUser(rowData)}>
          <Image src={editIcon} width={13} />
        </Box>
        <Box
          onClick={() => {
            toDelete = rowData;
            setOpenModal(true);
          }}
        >
          <Image src={deleteIcon} width={13} />
        </Box>
      </Box>
    );
  };
  return (
    <>
      <Table
        className={styles.parent}
        columns={columns}
        rows={rows}
        pagination={pagination}
        setPagination={setPagination}
        RowActionComponent={RowActionComponent}
      />
      <DialogView
        is_dialog_open={openModal}
        hideDialog={handleModalClose}
        dialog_options={{ title: 'Delete User' }}
        noButton={{ onClick: handleModalClose, text: 'No' }}
        yesButton={{ onClick: deleteUser, text: 'Yes' }}
      >
        <Typography>Are you sure you want delete this user?</Typography>
      </DialogView>
    </>
  );
}
