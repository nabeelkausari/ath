import { Table as TableComp } from '@mui/material';
import { Paper } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import Image from 'next/image';
import AntSwitch from '../../../../components/Switch/Switch';
import useStyles from './Table.styles';

import Box from '@mui/material/Box';
import Select from '../Select/Select';
import cx from 'classnames';
import { deleteIcon, editIcon } from '../../../../assets/Dashboard/Calendar';
import { arrowActiveIco, arrowIco } from '../../../../assets/Admin';

export default function Table({
  pagination,
  setPagination,
  rows,
  columns,
  RowActionComponent,
  className,
}) {
  const { page, rowsPerPage, records } = pagination;

  const styles = useStyles();

  const handleChangePage = (newPage) => {
    setPagination({ page: newPage });
  };

  const handleRowsPerPage = (value) => {
    setPagination({ page: 0, rowsPerPage: value });
  };

  return (
    <>
      <Paper
        sx={{ width: '100%', overflow: 'hidden' }}
        className={cx([styles.paper, className])}
      >
        <TableContainer sx={{ maxHeight: 'calc(100vh - 290px)' }}>
          <TableComp stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    className={styles.cell}
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                      className={RowActionComponent ? 'actions' : ''}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            className={styles.cell}
                          >
                            {column.render ? (
                              <column.render
                                value={value}
                                rowData={row.rowData}
                              />
                            ) : column.format ? (
                              column.format(value)
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                      {RowActionComponent && (
                        <RowActionComponent rowData={row.rowData} />
                      )}
                    </TableRow>
                  );
                })}
            </TableBody>
          </TableComp>
        </TableContainer>
      </Paper>
      <Pagination
        records={records}
        handleChangePage={handleChangePage}
        page={page}
        rowsPerPage={rowsPerPage}
        handleRowsPerPage={handleRowsPerPage}
      />
    </>
  );
}

const Pagination = ({
  records = 400,
  handleChangePage,
  page = 10,
  rowsPerPage = 20,
  handleRowsPerPage,
}) => {
  const styles = useStyles();
  const pagesDropdown = [10, 20, 50, 100];
  const totalPages = Math.ceil(records / rowsPerPage);
  const pages = Array.from({ length: totalPages }).map((i, k) => k);
  const dispalyPages = () => {
    let initial = pages.slice(page - 3 < 0 ? 0 : page - 3, page + 4);

    if (initial[0] == 0 && initial.length < 7) return pages.slice(0, 7);
    else if (initial[0] !== 0 && initial.length < 7) return pages.slice(-7);
    else return initial;
  };

  const arrowfn = (value) => {
    handleChangePage(value);
  };
  return (
    <Box className={styles.wrapper}>
      <Box display="flex" alignItems="center">
        <Box className={styles.item}>Total Record: {records}</Box>
        <Box display="flex" alignItems="center" marginLeft="10px">
          Row per page
          <Select
            boxStyle={{ width: 'initial', minWidth: '60px' }}
            value={rowsPerPage}
            noBorder
            onChange={handleRowsPerPage}
            items={pagesDropdown.map((i) => ({ value: i, label: i }))}
          />
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Box className={styles.leftArrow}>
          <Box className={styles.twoArrow} onClick={() => arrowfn(0)}>
            <Image src={page !== 0 ? arrowActiveIco : arrowIco} />
            <Image src={page !== 0 ? arrowActiveIco : arrowIco} />
          </Box>
          <Box margin={1} onClick={() => arrowfn(page - 1)}>
            <Image src={page !== 0 ? arrowActiveIco : arrowIco} />
          </Box>
        </Box>
        {dispalyPages().map((i, k) => (
          <span
            className={cx([styles.page, page == i && styles.activePage])}
            key={k}
            onClick={() => handleChangePage(i)}
          >
            {i + 1}
          </span>
        ))}
        <Box className={styles.rightArrow}>
          <Box
            margin={1}
            onClick={() => page < totalPages - 1 && arrowfn(page + 1)}
          >
            <Image src={page !== totalPages - 1 ? arrowActiveIco : arrowIco} />
          </Box>
          <Box
            className={styles.twoArrow}
            onClick={() => arrowfn(totalPages - 1)}
          >
            <Image src={page !== totalPages - 1 ? arrowActiveIco : arrowIco} />
            <Image src={page !== totalPages - 1 ? arrowActiveIco : arrowIco} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
