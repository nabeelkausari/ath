import { Button, InputBase, Menu, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import cx from 'classnames';
import Image from 'next/image';
import React, { Component, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  commentIcon,
  commentPrimaryIcon,
  droopdownIcon,
  filterIcon,
} from '../../../../assets/Dashboard/Inbox';
import BookmarkIcon from '../../../../assets/Dashboard/My-Library/bookmark.svg';
import SearchIcon from '../../../../assets/Dashboard/My-Library/bookmark.svg';
import VideoIcon from '../../../../assets/Dashboard/My-Library/Documents.svg';
import FilterIcon from '../../../../assets/Dashboard/My-Library/filter.svg';
import search from '../../../../assets/icons/search.svg';
import ClickOnOutside from '../../../../components/ClickOnOutside/ClickOnOutside';
import PopperComp from '../../../../components/Popper/Popper';
import { courseType } from '../../../../utils/constants/components';
import { getUniqueListBy } from '../../../../utils/helpers/helperFunctions';
import { Label, Search } from '../../../Admin/Components/Common/Common';
import CustomInput from '../../../Admin/Components/Input/Input';
import SelectComp from '../../../Admin/Components/Select/Select';
import CardChip from '../../Components/CardChip/Chip';
import {
  useActionStyles,
  useBookmarkStyles,
  useCommentStyles,
  useCourseStyles,
  useFilterStyles,
  useLessonStyles,
  useSearchStyles,
  useSortStyles,
} from './CommonComponents.styles';

export const Comments = ({ primary, count, onClick }) => {
  const styles = useCommentStyles();
  const icon = primary ? commentPrimaryIcon : commentIcon;
  return (
    <Box
      className={styles.parent}
      onClick={onClick}
      style={{ cursor: onClick && 'pointer' }}
    >
      <Image src={icon} />
      <Box className={primary && styles.primary}>{count} comments</Box>
    </Box>
  );
};

export const ActionComp = ({ nobtn, yesbtn }) => {
  const styles = useActionStyles();

  return (
    <Box className={styles.actions}>
      {nobtn && <Button onClick={nobtn.onClick}>{nobtn.text}</Button>}
      {yesbtn && (
        <Button variant="contained" onClick={yesbtn.onClick}>
          {yesbtn.text}
        </Button>
      )}
    </Box>
  );
};

export const SelectLesson = ({ modules, onClick, selected }) => {
  const styles = useLessonStyles();
  const [data, setData] = useState({});
  const [filtered, setFiltered] = useState(modules);

  const setFilteredData = (val) => {
    let filt = modules.map((i, k) => ({
      ...i,
      contents: i.contents.filter((lesson) =>
        lesson.name?.toLowerCase().includes(val?.toLowerCase())
      ),
    }));

    setFiltered(filt.filter((i) => i.contents.length > 0));
  };
  return (
    <Box className={styles.parent}>
      <Box className={styles.select}>
        <Box
          fontWeight="500"
          sx={{ cursor: 'pointer' }}
          onClick={(e) => {
            setData({
              ...data,
              opened: true,
              anchorEl: e.currentTarget,
            });
          }}
        >
          {selected ? `Selected: ${selected.name}` : 'Select a lesson'}
          <span
            style={{
              marginLeft: '8px',
              transform: `rotate(${data.opened ? '180deg' : '0deg'})`,
              display: 'inline-block',
            }}
          >
            <Image src={droopdownIcon} />
          </span>
        </Box>
      </Box>
      <Menu
        className={styles.filterBody}
        id="filter-menu"
        anchorEl={data.anchorEl}
        open={data.opened}
        // transformOrigin={{ horizontal: 340, vertical: -10 }}

        onClose={() =>
          setData({
            ...data,
            opened: !data.opened,
          })
        }
      >
        <Box className={styles.menuWrapper}>
          <Search
            className={styles.search}
            onChange={(e) => setFilteredData(e.target.value)}
          />
          <Box className={styles.menuBody}>
            {filtered?.map((module, k) => (
              <Box key={k} className={styles.module}>
                <Box className={'_badge'}>
                  Module <span>{k + 1}</span>
                </Box>
                <Box key={k} className={'_title'}>
                  {module.title}
                </Box>
                <Box className={styles.lessons}>
                  {module.contents.map(
                    (lesson, k) =>
                      lesson.type !== 'MATERIAL' && (
                        <Box
                          key={k}
                          className={'_lesson'}
                          onClick={() => {
                            onClick(lesson);
                            setData({
                              ...data,
                              opened: !data.opened,
                            });
                          }}
                        >
                          {lesson.type && courseType[lesson.type]?.icon1 && (
                            <Box
                              minWidth={'1.6vh'}
                              height={'1.6vh'}
                              className={'_icon'}
                            >
                              <Image src={courseType[lesson.type].icon1} />
                            </Box>
                          )}
                          <Box>{lesson.name}</Box>
                        </Box>
                      )
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Menu>
    </Box>
  );
};

export const FilterBar = ({
  heading,
  filterData = {},
  setFilterData,
  filterItems,
  actions,
}) => {
  const styles = useFilterStyles();
  const { course_discussions } = useSelector((state) => state.discussions);
  const modules = getUniqueListBy(
    course_discussions?.map((i) => ({
      value: i?.courseDetails.moduleId,
      label: i?.courseDetails.moduleName,
    })),
    'value'
  );

  const lessons = getUniqueListBy(
    course_discussions?.map((i) => ({
      value: i?.courseDetails?.moduleSequenceId,
      label: i?.courseDetails?.lessonName,
      moduleId: i?.courseDetails?.moduleId,
    })),
    'value'
  ).filter((i) => (filterData.module ? i.moduleId == filterData.module : true));

  console.log(lessons);
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
        }}
      >
        <Image src={FilterIcon} />
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
        <SelectComp
          boxClass={styles.input}
          label="Module"
          items={modules}
          value={filterData.module}
          onChange={(val) =>
            setFilterData({
              ...filterData,
              module: val,
              lesson: undefined,
            })
          }
        />
        <SelectComp
          items={lessons}
          boxClass={styles.input}
          label="Lesson"
          value={filterData.lesson}
          boxStyle={{ marginBottom: '0' }}
          onChange={(val) =>
            setFilterData({
              ...filterData,
              lesson: val,
            })
          }
        />
        <ActionComp {...actions} />
      </Menu>
    </Box>
  );
};
export const discussionSortItems = [
  { label: 'Newest', value: 1, key: 'createdTime', side: 1 },
  { label: 'Oldest', value: 2, key: 'createdTime', side: -1 },
  { label: 'Most Commented', value: 3, key: 'totalCommentsCount', side: 1 },
  { label: 'Least Commented', value: 4, key: 'totalCommentsCount', side: -1 },
  { label: 'Pinned', value: 5, value: 5, key: 'pinned', side: 1 },
];

export const CourseTitleComponent = ({ heading, type, sort }) => {
  const styles = useCourseStyles();

  return (
    <Box className={styles.parent}>
      <CardChip name={type} />
      <Box className={styles.title}>
        <Box className={styles.heading}>{heading}</Box>
        <SortSelect
          value={sort.value || discussionSortItems[0]}
          onChange={sort.onChange}
          items={discussionSortItems}
        />
      </Box>
    </Box>
  );
};

export const SortSelect = ({
  items = [],
  onChange,
  value = {},
  placeholder,
  icon = droopdownIcon,
  boxClass,
  boxStyle,
}) => {
  const styles = useSortStyles();

  return (
    <Box style={{ ...boxStyle }} className={cx([boxClass, styles.parent])}>
      <Select
        onOpen={(e) => e.stopPropagation()}
        className={cx([styles.input, styles.select])}
        value={value.value}
        onChange={(e) => onChange(items.find((i) => i.value == e.target.value))}
        renderValue={(val) => (
          <span>
            <span style={{ paddingRight: '8px' }}>
              <Image src={filterIcon} />
            </span>
            Sorted by{' '}
            <span style={{ fontWeight: 'bold' }}>
              {items.find((i) => i.value == val)?.label}
            </span>
          </span>
        )}
        MenuProps={MenuProps}
        // {...iconProps}
        IconComponent={(props) => (
          <Box {...props} style={{ marginTop: -2 }}>
            <Image src={icon} width={15} />
          </Box>
        )}
      >
        <option
          value="unset"
          // selected
          disabled
          hidden
          style={{ color: '#00000044' }}
        >
          {placeholder}
        </option>

        {items.map((item, k) => (
          <MenuItem
            className={styles.menuItem}
            key={k}
            value={item.value}
            disabled={item.disabled}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

const MenuProps = {
  PaperProps: {
    style: {
      borderRadius: 20,
      maxHeight: 250,
      boxShadow: '0px 4px 25px #153B7D14',
      marginTop: 10,
    },
  },
};

export default SortSelect;
