import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../../../../components/Button';
import { addDashboardItem } from '../../../../../store/workspace/insights/actions';

const AddElement = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const handleAddItem = (item) => {
    dispatch(addDashboardItem(item));
    handleClose();
  };
  return (
    <div className="insert-menu">
      <Button
        id="add"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<AddIcon />}
        endIcon={<KeyboardArrowUpIcon />}
      >
        Add Elements
      </Button>

      <Menu
        open={open}
        id="basic-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'add' }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <MenuItem
          onClick={() =>
            handleAddItem({
              type: 'heading',
              value: 'Heading',
            })
          }
        >
          Heading
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleAddItem({
              type: 'sub-heading',
              value: 'Sub Heading',
            })
          }
        >
          Sub Heading
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleAddItem({
              type: 'editor',
              value: 'Paragraph (Rich text)',
            })
          }
        >
          Paragraph
        </MenuItem>
      </Menu>
    </div>
  );
};
export default AddElement;
