import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { v4 as uuidv4 } from 'uuid';
import { ProjectShape } from '../../helpers/dashBUtil';
import { availableColors } from '../../helpers/colors';
import { List } from 'immutable';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof ProjectShape;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'Lib',
    numeric: false,
    disablePadding: false,
    label: 'Library',
  },  
  {
    id: 'Cell',
    numeric: false,
    disablePadding: false,
    label: 'Cell',
  },
  {
    id: 'View',
    numeric: false,
    disablePadding: false,
    label: 'View',
  },
  {
    id: 'Assignee',
    numeric: false,
    disablePadding: false,
    label: 'Assignee',
  },
  {
    id: 'User',
    numeric: false,
    disablePadding: false,
    label: 'User',
  },
  {
    id: 'Version',
    numeric: true,
    disablePadding: false,
    label: 'Version',
  },
  {
    id: 'ERC',
    numeric: false,
    disablePadding: false,
    label: 'ERC',
  },
  {
    id: 'DRC',
    numeric: false,
    disablePadding: false,
    label: 'DRC',
  },
  {
    id: 'LVS',
    numeric: false,
    disablePadding: false,
    label: 'LVS',
  },
  {
    id: 'ANT',
    numeric: false,
    disablePadding: false,
    label: 'ANT',
  },
  {
    id: 'PILLS',
    numeric: false,
    disablePadding: false,
    label: 'PILLS',
  },
  {
    id: 'LPE',
    numeric: false,
    disablePadding: false,
    label: 'LPE',
  },
  {
    id: 'EMIR',
    numeric: false,
    disablePadding: false,
    label: 'EMIR',
  },
  {
    id: 'SHE',
    numeric: false,
    disablePadding: false,
    label: 'SHE',
  },
  {
    id: 'AGING',
    numeric: false,
    disablePadding: false,
    label: 'AGING',
  }
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ProjectShape) => void;  
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof ProjectShape) => (event: React.MouseEvent<unknown>) => {      
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{backgroundColor: '#607d8b'}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}              
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


interface MainProps {
  projectData: ProjectShape[];
}

export default function ProjectTable({projectData}: MainProps) {
  
  let thisAvailableColors = List.of(...availableColors);
  let libArray: string[] = [];
  let libColorArray: (string)[] = [];
  const [rows, setRows] = React.useState<ProjectShape[]>(projectData);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof ProjectShape>('Lib');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof ProjectShape) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const hydrateCellColor = (row: ProjectShape) => {
    let cellColor: string;    
    const index = libArray.indexOf(row.Lib);
    if (index !== -1) {
      cellColor = libColorArray[index];
    } else {
      libArray.push(row.Lib);
      cellColor = thisAvailableColors.last()!;
      thisAvailableColors = thisAvailableColors.pop();
      cellColor = cellColor ? cellColor : '#ff5252'; //default red.A200
      libColorArray.push(cellColor);
    }

    return (
      <TableCell align="left" sx={{color: cellColor}} >
        {row.Lib}
      </TableCell>        
    );
  };

  const hydrateYesChip = (value: string) => {
    return (
      <TableCell align="left">
      {value === 'Yes' ? (
        <Chip
            label={value}
            color="success"
            variant="outlined"
            onClick={() =>
              console.log('clicked')
            }
          />
        ) : (
          value
        )}
      </TableCell>      
    );
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
    {rows && (
      <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={uuidv4()}
                    >                   
                      {/* <TableCell align="left">{row.Lib}</TableCell> */}
                      {hydrateCellColor(row)}
                      <TableCell align="left">{row.Cell}</TableCell>
                      <TableCell align="left">{row.View}</TableCell>
                      <TableCell align="left">{row.Assignee}</TableCell>
                      <TableCell align="left">{row.User}</TableCell>
                      <TableCell align="left">{row.Version}</TableCell>
                      <TableCell align="left">{row.ERC}</TableCell>
                      <TableCell align="left">{row.DRC}</TableCell>
                      <TableCell align="left">{row.LVS}</TableCell>
                      <TableCell align="left">{row.ANT}</TableCell>
                      <TableCell align="left">{row.PILLS}</TableCell>
                      {hydrateYesChip(row.LPE)}
                      {hydrateYesChip(row.EMIR)}
                      {hydrateYesChip(row.SHE)}
                      {hydrateYesChip(row.AGING)}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>    
    </Box>
    )}
  </>
  );
}


class LibClass {

  static lib = [];
  static cell = [];
  static libColor = ['#607d8b', '#9e9e9e', '#8d6e63'];
  
}