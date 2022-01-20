import Box from '@mui/material/Box';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import cx from 'classnames';

import useStyles from './ConsoleDataTable.styles';

const ConsoleDataTable = ({ content=[],fullScreen=false, ...props}) => {
  const styles = useStyles();
  const csvToJson = (csv_data) => {
    if(!csv_data) return [];
    csv_data = csv_data || '';
    let lines=csv_data.split("\n");
    let result = [], rows = [];
    var headers=lines[0].split(";");
    if (lines.length > 200) {
      rows = lines.slice(0, 201);
    } else {
      rows = lines.slice(0, lines.length - 1);
    }
    for(let i=1; i < rows.length; i++){
      let obj = {}, currentline = rows[i].split(";");
      for(let j=0; j < headers.length; j++){
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    return result;
  }
  const tableData = csvToJson(content);
  return (
    <Box
      className={cx([styles.tableWrapper, fullScreen && styles.fullScreen])}
    >
        <TableContainer>
            <Table className={styles.table} aria-label="simple table">
                <TableHead className={styles.tableHeader}>
                    <TableRow>
                        {(tableData && tableData.length!==0) && Object.keys(tableData[0])?.map((objKey,i) => <TableCell key={i}>{objKey}</TableCell> )}
                    </TableRow>
                </TableHead>
                <TableBody>
                {(tableData && tableData.length > 0) ? tableData?.map((row, i) => (
                    <TableRow key={i}>
                        {Object.values(row).map((val,index) => <TableCell key={index}>{val}</TableCell>)}
                    </TableRow>
                )): null}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
  );
};

export default ConsoleDataTable;
