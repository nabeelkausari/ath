import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import React, { Component, useState } from 'react';

import { EnrolledIcon } from '../../../../../../common/images';
import { PALETTE_PRIMARY_MAIN } from '../../../../../../config/theme';
import { courseType } from '../../../../../../utils/constants/components';
import {
  useDetailBlockStyles,
  usePieDetailStyles,
  useTableStyles,
} from './CommonComponents.styles';

export const PieDetail = ({ data = {} }) => {
  const styles = usePieDetailStyles();
  return (
    <Box className={styles.parent}>
      <Box className={styles.circle} style={{ background: data.color }}></Box>
      <Box>
        <Box className={styles.heading}>{Math.round(data.value)}%</Box>
        <Box className={styles.description}>{data.name}</Box>
      </Box>
    </Box>
  );
};

export const DetailBlock = ({ data = {}, icon }) => {
  const styles = useDetailBlockStyles();
  return (
    <Box className={styles.parent}>
      <Box className={styles.icon}>
        <Image src={icon} width={38} height={38} />
      </Box>
      <Box>
        <Box className={styles.heading}>{data.value}</Box>
        <Box className={styles.description}>{data.name}</Box>
      </Box>
    </Box>
  );
};

export const CustomTable = ({ data }) => {
  const styles = useTableStyles();
  const [index, setIndex] = useState(-1);
  return (
    // <TableContainer component={Paper}>
    <Table
      sx={{ minWidth: 650 }}
      aria-label="simple table"
      className={styles.table}
    >
      <TableHead>
        <TableRow>
          <TableCell width={'35%'}> </TableCell>
          <TableCell>Status</TableCell>
          {/* <TableCell>Due Date</TableCell> */}
          <TableCell>Grade</TableCell>
          <TableCell width={'15%'}>Category</TableCell>
          <TableCell width={'20%'}>Skills</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, k) => (
          <TableRow
            key={k}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell
              sx={{
                paddingLeft: '53px',
                position: 'relative',
              }}
            >
              {row.type && (
                <span
                  style={{
                    marginRight: '12px',
                    width: '20px',
                    position: 'absolute',
                  }}
                >
                  <Image src={courseType[row.type].icon1} />
                </span>
              )}
              <div style={{ marginLeft: '30px' }}>{row.title}</div>
            </TableCell>
            <TableCell style={{ textTransform: 'capitalize' }}>
              {row.status.toLowerCase() === 'completed' && (
                <span
                  style={{
                    width: '20px',
                    position: 'absolute',
                    marginTop: 1,
                  }}
                >
                  <Image src={EnrolledIcon} />
                </span>
              )}
              <span style={{ marginLeft: 16 }}>
                {row.status.replaceAll('_', ' ').toLowerCase()}
              </span>
            </TableCell>
            {/* <TableCell>{row.date}</TableCell> */}
            <TableCell>{Math.round(row.score)}%</TableCell>
            <TableCell>{row.categories.join(', ')}</TableCell>
            <SkillCell
              data={row.skills}
              expanded={index == k}
              onClick={(e) => {
                if (index == k) {
                  setIndex(-1);
                } else setIndex(k);
                e.stopPropagation();
              }}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
    // </TableContainer>
  );
};
const SkillCell = ({ data, expanded, onClick }) => {
  const arr1 = data.slice(0, 5);
  const more = data.length - 5;

  return (
    <TableCell>
      {(expanded ? data : arr1).join(', ')} &ensp;
      {more > 0 ? (
        <span
          onClick={onClick}
          style={{
            cursor: 'pointer',
            color: PALETTE_PRIMARY_MAIN,
            textDecoration: 'underline',
            whiteSpace: 'nowrap',
          }}
        >
          {expanded ? 'View Less' : `+${more} More`}
        </span>
      ) : (
        <span onClick={onClick}></span>
      )}
    </TableCell>
  );
};
