import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

import useStyles from './CustomTable.styles';

const rows = [
  { variable: 'Make', description: 'Car Make' },
  { variable: 'Model', description: 'Car Model' },
  { variable: 'Year', description: 'Car Year (Marketing)' },
  { variable: 'Engine Fuel Type', description: 'Engine Fuel Type' },
  { variable: 'Engine HP', description: 'Engine Horse Power (HP)' },
  { variable: 'Engine Cylinders', description: 'Engine Cylinders' },
  { variable: 'Transmission Type', description: 'Transmission Type' },
  { variable: 'Driven_Wheels', description: 'Driven_Wheels' },
  { variable: 'Number of Doors', description: 'Number of Doors' },
  { variable: 'Market Category', description: 'Market Category' },
  { variable: 'Vehicle Size', description: 'Size of Vehicle' },
  { variable: 'Vehicle Style', description: 'Type of Vehicle' },
  { variable: 'Highway MPG', description: 'Highway MPG' },
  { variable: 'city mpg', description: 'city mpg' },
  { variable: 'Popularity', description: 'Popularity (Twitter)' },
  { variable: 'MSRP', description: 'Manufacturer Suggested Retail Price' },
];

export default function CustomTable() {
  const styles = useStyles();

  return (
    <TableContainer>
      <Table className={styles.table} aria-label="simple table">
        <TableHead className={styles.tableHeader}>
          <TableRow>
            <TableCell>Variable</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.variable} className={styles.tableData}>
              <TableCell component="th" scope="row">
                {row.variable}
              </TableCell>
              <TableCell>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
