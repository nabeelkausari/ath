import { MenuItem, Select, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MuiInputLabel from '@mui/material/InputLabel';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect, { components } from 'react-select';

import { CircleAddIcon, CloseCircle } from '../../../../../common/images';
import Avatar from '../../../../../components/Avatar/Avatar';
import {
  addCollaborator,
  getAllUsers,
} from '../../../../../store/collaborators/actions';
import { setDialogOptions } from '../../../../../store/global/actions';
import {
  CONFIGURED,
  OWNER,
  READ_ONLY,
  READ_WRITE,
} from '../../../../../utils/constants/userPermissions';
import useStyles from './AddCollaborator.styles';

const AddCollaboratorInput = ({ item, onSelect, collaborators = [] }) => {
  const styles = useStyles();
  const Option = (props) => {
    return (
      <components.Option {...props}>
        <Box className={styles.user}>
          <Avatar user={props.data} />
          <Box className={styles.userInfo}>
            <Typography className={styles.userName}>
              {props.data.name}
            </Typography>
            <Typography className={styles.userEmail}>
              {props.data.email}
            </Typography>
          </Box>
        </Box>
      </components.Option>
    );
  };
  return (
    <>
      <Box className={styles.collaboratorSelect}>
        <MuiInputLabel>Email Id</MuiInputLabel>
        <ReactSelect
          onChange={(u) =>
            onSelect({ value: u.value, label: u.label, id: u.id })
          }
          value={item}
          components={{ Option }}
          options={collaborators}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          menuPortalTarget={document.body}
        />
      </Box>
      <Box p={2}>
        <MuiInputLabel htmlFor="input-with-icon-adornment">
          Access Control
        </MuiInputLabel>
        <Select
          className={styles.accessType}
          value={item.accessType}
          onChange={(e) => onSelect({ accessType: e.target.value })}
        >
          <MenuItem value={READ_ONLY}>Read Only</MenuItem>
          <MenuItem value={READ_WRITE}>Read Write</MenuItem>
          <MenuItem value={OWNER}>Owner</MenuItem>
          <MenuItem value={CONFIGURED}>Insights Only</MenuItem>
        </Select>
      </Box>
    </>
  );
};

const AddCollaborator = ({}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { all_users, list } = useSelector((state) => state.collaborators);
  const [selectedCollaborators, setSelectedCollaborators] = useState([
    {
      id: '',
      label: '',
      value: '',
      accessType: '',
    },
  ]);

  useEffect(() => {
    if (selectedCollaborators.every((c) => !!c.value && !!c.accessType)) {
      dispatch(
        setDialogOptions({
          yes_button: {
            text: 'Submit',
            onClick: () => {
              const params = {
                seekPermission: true,
                collaborators: selectedCollaborators.map((c) => ({
                  collaboratorId: c.id,
                  permission: c.accessType,
                })),
              };
              dispatch(addCollaborator(params));
            },
            disabled: false,
          },
        })
      );
    } else {
      dispatch(
        setDialogOptions({
          yes_button: { text: 'Submit', onClick: () => null, disabled: true },
        })
      );
    }
  }, [JSON.stringify(selectedCollaborators)]);

  const add = () => {
    setSelectedCollaborators([
      ...selectedCollaborators,
      {
        id: '',
        label: '',
        value: '',
        accessType: '',
      },
    ]);
  };
  const remove = (i) => {
    setSelectedCollaborators([
      ...selectedCollaborators.slice(0, i),
      ...selectedCollaborators.slice(i + 1),
    ]);
  };
  const update = (value, i) => {
    setSelectedCollaborators([
      ...selectedCollaborators.slice(0, i),
      {
        ...selectedCollaborators[i],
        ...value,
      },
      ...selectedCollaborators.slice(i + 1),
    ]);
  };
  return (
    <Box className={styles.collaboratorSection}>
      {selectedCollaborators.map((collaborator, i) => {
        const shouldAdd = i === selectedCollaborators.length - 1;
        return (
          <Box className={styles.collaboratorWrapper} key={i}>
            <AddCollaboratorInput
              onSelect={(value) => update(value, i)}
              item={collaborator}
              collaborators={all_users
                .map((u) => {
                  const alreadySelected =
                    selectedCollaborators.findIndex(
                      (c) => u.email === c.value
                    ) > -1 && u.email !== collaborator.email;

                  const existingCollaborator = list.find(
                    (c) => u.mapping_id === c.mapping_id
                  );

                  if (alreadySelected || existingCollaborator) return;

                  return {
                    ...u,
                    id: u.mapping_id,
                    value: u.email,
                    label: `${u.name} - ${u.email}`,
                  };
                })
                .filter((u) => u)}
              key={i}
            />
            <Box className={styles.addCollaboratorIcon}>
              <Image
                src={shouldAdd ? CircleAddIcon : CloseCircle}
                width={28}
                height={28}
                onClick={shouldAdd ? add : () => remove(i)}
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default AddCollaborator;
