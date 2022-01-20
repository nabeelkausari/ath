import Box from '@mui/material/Box';
import React, { Component, useState, useEffect } from 'react';
import Image from 'next/image';
import {
  useNavigationStyles,
  useCheckboxStyles,
  useFilterStyles,
  useAvatarStyles,
} from './CommonComponents.styles';
import dropdownDark from '../../../../assets/icons/dropdown-dark.svg';
import cx from 'classnames';
import { Avatar, AvatarGroup, Checkbox, Menu, Tooltip } from '@mui/material';
import Button from '../../../../components/Button/Button';

import { FilterIcon } from '../../../../common/images';
import { CalendarInput } from '../CreateEvent/CreateEvent';
import moment from 'moment';
import avatar from '../../../../assets/icons/avatar.svg';
import { getInitials } from '../../../../utils/helpers/helperFunctions';
import { useSelector } from 'react-redux';
import { getUserIdFromProfile } from '../../../../utils/helpers/storage';

export const DateNavigation = ({
  onChange,
  text,
  className,
  yearNavigation,
}) => {
  const styles = useNavigationStyles();
  const size = 15;
  return (
    <Box className={cx([styles.dateNavigation, className])}>
      {yearNavigation && (
        <Box onClick={() => onChange(-1, 'year')} className={styles.yearLeft}>
          <Image src={dropdownDark} width={size} height={size} />
          <Image src={dropdownDark} width={size} height={size} />
        </Box>
      )}
      <Box className={styles.monthLeft}>
        <Image
          src={dropdownDark}
          width={size}
          height={size}
          onClick={() => onChange(-1)}
        />
      </Box>
      <Box margin={'0 20px'} style={{ flex: 1, textAlign: 'center' }}>
        {text}
      </Box>
      <Box className={styles.monthRight}>
        <Image
          src={dropdownDark}
          width={size}
          height={size}
          onClick={() => onChange(1)}
        />
      </Box>
      {yearNavigation && (
        <Box onClick={() => onChange(1, 'year')} className={styles.yearRight}>
          <Image src={dropdownDark} width={size} height={size} />
          <Image src={dropdownDark} width={size} height={size} />
        </Box>
      )}
    </Box>
  );
};

export const CheckBox = ({ onChange, data }) => {
  const styles = useCheckboxStyles();

  return (
    <Box className={styles.checkbox}>
      <Checkbox
        checked={data.checked}
        onChange={(e) => onChange({ ...data, checked: e.target.checked })}
        sx={{
          padding: '5px',
          color: data.color,
          '&.Mui-checked': {
            color: data.color,
          },
        }}
      />
      <Box>{data.label}</Box>
    </Box>
  );
};

export const FilterBar = ({ heading, filterData = {}, setFilterData }) => {
  const styles = useFilterStyles();
  const [filter, setFilter] = useState({});

  useEffect(() => {
    setFilter({
      ...filterData,
      from: filterData.from || moment().add(-15, 'day'),
      to: filterData.to || moment().add(5, 'day'),
    });
  }, [filterData]);

  const closePopup = () => {
    setFilterData({ opened: false });
  };
  const apply = () => {
    setFilterData({ ...filter, opened: false, searchView: true });
  };
  return (
    <Box className={styles.parent}>
      <Box className={styles.heading}>{heading}</Box>
      <Box
        className={styles.filterIcon}
        onClick={(e) => {
          setFilterData({
            ...filterData,
            opened: true,
            anchorEl: e.currentTarget,
          });
          e.stopPropagation();
        }}
      >
        <Image src={FilterIcon} />
        <span> Filter</span>
      </Box>
      <Menu
        className={styles.filterBody}
        id="filter-menu"
        anchorEl={filterData.anchorEl}
        open={filterData.opened}
        transformOrigin={{ horizontal: 340, vertical: -10 }}
        onClose={() =>
          setFilterData({
            ...filterData,
            opened: !filterData.opened,
          })
        }
      >
        <Box className={styles.types}>
          <Box className={styles.filterHeading}>Type</Box>
          {filter.items &&
            filter.items.map((item, k) => (
              <div
                key={k}
                className={filter.type === item.type && styles.filterSelected}
                onClick={() => setFilter({ ...filter, type: item.type })}
              >
                {item?.label.split(' ')[0]}
              </div>
            ))}
        </Box>
        <Box marginTop={1}>
          <CalendarInput
            value={filter.from}
            LabelComp={() => <Box className={styles.filterHeading}>From</Box>}
            onChange={(date) => setFilter({ ...filter, from: date })}
          />
        </Box>
        <Box marginTop={1}>
          <CalendarInput
            value={filter.to}
            LabelComp={() => <Box className={styles.filterHeading}>To</Box>}
            onChange={(date) => setFilter({ ...filter, to: date })}
            minDate={filter.from}
          />
        </Box>
        <Box className={styles.buttonGroup}>
          <Button
            onClick={closePopup}
            className={styles.primaryButton}
            variant="text"
          >
            Cancel
          </Button>
          <Button onClick={apply} className={styles.primaryButton}>
            Apply
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export const AvatarGroupComp = ({
  user_ids,
  max = 3,
  size = { width: 28, height: 28 },
}) => {
  const styles = useAvatarStyles();

  const { all_users } = useSelector((state) => state.collaborators);

  const users = [
    ...user_ids,
    ...(user_ids.findIndex((i) => i == +getUserIdFromProfile()) == -1
      ? [+getUserIdFromProfile()]
      : []),
  ].map((userid) => all_users.find((i) => i.mapping_id === userid));
  return (
    <AvatarGroup
      classes={{ avatar: styles.avatar }}
      max={max}
      style={{ width: '30%' }}
      sx={{ ...size }}
    >
      {users &&
        users.map((user, k) => (
          <Tooltip title={user?.name} key={k} placement="top">
            <Avatar alt={user?.name} sx={{ ...size }}>
              {user?.profile_pic_url ? (
                <Image src={user?.profile_pic_url} />
              ) : (
                getInitials(user?.name)
              )}
            </Avatar>
          </Tooltip>
        ))}
    </AvatarGroup>
  );
};
