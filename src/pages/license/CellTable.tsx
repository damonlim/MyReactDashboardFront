import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { v4 as uuidv4 } from 'uuid';
import { green, orange, red } from '@mui/material/colors';
import { CellDataShape } from '../../helpers/dashBUtil';


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
  id: keyof CellDataShape;
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
    id: 'Revision',
    numeric: true,
    disablePadding: false,
    label: 'Revision',
  },
  {
    id: 'User',
    numeric: false,
    disablePadding: false,
    label: 'User',
  },
  {
    id: 'CO_Date',
    numeric: false,
    disablePadding: false,
    label: 'CO Date',
  },
  {
    id: 'CO_Duration',
    numeric: true,
    disablePadding: false,
    label: 'CO Duration',
  },
  {
    id: 'Prev_CI',
    numeric: false,
    disablePadding: false,
    label: 'Prev CI',
  },
  {
    id: 'Prev_User',
    numeric: false,
    disablePadding: false,
    label: 'Prev User',
  }
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof CellDataShape) => void;  
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof CellDataShape) => (event: React.MouseEvent<unknown>) => {      
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

const EnhancedTableToolbar = (props: {title: string}) => {

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
        <Typography
          sx={{ flexGrow: 1, justifyContent: 'left', display: { xs: 'flex' } }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {props.title.toUpperCase()}
        </Typography>
    </Toolbar>
  );
};


interface MainProps {
  title: string;
  viewRows: { [x: string]: CellDataShape[] };
}

export default function CellTable({title, viewRows}: MainProps) {
  
  const [rows, setRows] = React.useState<CellDataShape[]>(viewRows[title]);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof CellDataShape>('Cell');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof CellDataShape) => {
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

  const hydrateCellColor = (row: CellDataShape) => {
    let cellColor;
    if (row.CO_Duration > 20) {
      cellColor = red[500];
    }

    return (
      <TableCell align="left" sx={{backgroundColor: cellColor}} >
        {row.CO_Duration}
      </TableCell>        
    );
  }  

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
    {rows && (
      <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar title={title}/>
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
                      <TableCell align="left">{row.Lib}</TableCell>
                      <TableCell align="left">{row.Cell}</TableCell>
                      <TableCell align="left">{row.View}</TableCell>
                      <TableCell align="left">{row.Revision}</TableCell>
                      <TableCell align="left">{row.User}</TableCell>
                      <TableCell align="left">{row.CO_Date}</TableCell>
                      {hydrateCellColor(row)}
                      {/* <TableCell align="left">{row.CO_Duration}</TableCell> */}
                      <TableCell align="left">{row.Prev_CI}</TableCell>
                      <TableCell align="left">{row.Prev_User}</TableCell>
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
