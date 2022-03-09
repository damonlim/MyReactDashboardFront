import * as React from 'react';
import PropTypes from 'prop-types';
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
import { green, orange, red } from '@mui/material/colors';

function createData(ip, hostname, uptime, memory, cpucores, load5m, cpuused, memoryused, partitionused, 
  diskread, diskwrite, download, upload) {
  return {
    ip,
    hostname,
    uptime,
    memory,
    cpucores,
    load5m,
    cpuused,
    memoryused,
    partitionused,
    diskread,
    diskwrite,
    download,
    upload
  };
}

const rows = [
  createData('10.118.71.160:9100', 'host1', '1.82 week', '31.22 GB', '32', '3.83', '16.07%', '41.83%', '38.44%', '2.39 MBs', '24.8 MBs', '872.40 kbps', '484.31 kbps'),
  createData('10.118.71.161:9100', 'host2', '5.62 day', '31.23 GB', '4', '0.10', '11.12%', '42.83%', '38.47%', '0.8 s', '100.01 kBs', '872.40 kbps', '484.31 kbps'),
  createData('10.118.71.162:9100', 'host3', '2.01 week', '31.24 GB', '4', '0.11', '5.73%', '43.83%', '38.46%', '1.18 MBs', '100.01 kBs', '62.39 MBps', '484.31 kbps'),
  createData('10.118.71.163:9100', 'host4', '2.02 week', '31.25 GB', '8', '0.12', '16.07%', '44.83%', '38.45%', '0.8 s', '100.01 kBs', '872.40 kbps', '484.31 kbps'),
  createData('10.118.71.164:9100', 'host5', '2.03 week', '31.26 GB', '8', '0.13', '5.73%', '45.83%', '38.44%', '0.8 s', '100.01 kBs', '872.40 kbps', '484.31 kbps'),
  createData('10.118.71.165:9100', 'host6', '2.04 week', '31.27 GB', '8', '0.14', '5.73%', '46.83%', '27.44%', '0.8 s', '100.01 kBs', '872.40 kbps', '484.31 kbps'),
  createData('10.118.71.166:9100', 'host7', '2.05 week', '31.28 GB', '8', '0.15', '16.07%', '47.83%', '28.44%', '0.8 s', '100.01 kBs', '872.40 kbps', '484.31 kbps'),
  createData('10.118.71.167:9100', 'host8', '2.06 week', '31.29 GB', '8', '0.15', '5.73%', '48.83%', '39.44%', '0.8 s', '100.01 kBs', '872.40 kbps', '484.31 kbps'),
  createData('10.118.71.168:9100', 'host9', '2.07 week', '32.22 GB', '8', '0.15', '16.07%', '49.83%', '38.44%', '0.8 s', '100.01 kBs', '872.40 kbps', '484.31 kbps'),
  createData('10.118.71.169:9100', 'host10', '2.08 week', '33.22 GB', '4', '0.15', '11.12%', '34.83%', '37.44%', '0.8 s', '100.01 kBs', '872.40 kbps', '484.31 kbps'),
  createData('10.118.71.170:9100', 'host11', '2.09 week', '34.22 GB', '4', '0.15', '5.73%', '24.83%', '36.44%', '0.8 s', '100.01 kBs', '872.40 kbps', '484.31 kbps'),
  createData('10.118.71.171:9100', 'host12', '2.10 week', '35.22 GB', '4', '0.15', '5.73%', '22.83%', '35.44%', '0.8 s', '100.01 kBs', '872.40 kbps', '484.31 kbps'),
  createData('10.118.71.172:9100', 'host13', '2.11 week', '36.22 GB', '4', '0.15', '11.12%', '21.83%', '34.44%', '0.8 s', '100.01 kBs', '872.40 kbps', '484.31 kbps'),
];

function descendingComparator(a, b, orderBy) {  
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  console.log('stabilizedThis=',stabilizedThis)
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'ip',
    numeric: true,
    disablePadding: false,
    label: 'IP (Link to details)',
  },
  {
    id: 'hostname',
    numeric: false,
    disablePadding: false,
    label: 'Hostname',
  },
  {
    id: 'uptime',
    numeric: true,
    disablePadding: false,
    label: 'Uptime',
  },
  {
    id: 'memory',
    numeric: true,
    disablePadding: false,
    label: 'Memory',
  },
  {
    id: 'cpucores',
    numeric: true,
    disablePadding: false,
    label: 'CPU Cores',
  },
  {
    id: '5mload',
    numeric: true,
    disablePadding: false,
    label: '5m load',
  },
  {
    id: 'cpuused',
    numeric: true,
    disablePadding: false,
    label: 'CPU used %',
  },
  {
    id: 'memoryused',
    numeric: true,
    disablePadding: false,
    label: 'Memory used %',
  },
  {
    id: 'partitionused',
    numeric: true,
    disablePadding: false,
    label: 'Partition used %',
  },
  {
    id: 'diskread',
    numeric: true,
    disablePadding: false,
    label: 'Disk read',
  },
  {
    id: 'diskwrite',
    numeric: false,
    disablePadding: false,
    label: 'Disk write',
  },
  {
    id: 'download',
    numeric: false,
    disablePadding: false,
    label: 'Download',
  },
  {
    id: 'upload',
    numeric: false,
    disablePadding: false,
    label: 'Upload',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
        <Typography
          sx={{ flexGrow: 1, justifyContent: 'center', display: { xs: 'flex' } }}
          // sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Server Resources Overview
        </Typography>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
};

export default function EnhancedTable() {
  
  const diskWriteCellFn = (row) => {
    let cellColor;
    if (row.diskwrite === '24.8 MBs') {
      cellColor = red[500];
    } else {
      cellColor = green[500];
    }
    return (
      <TableCell align="right" sx={{backgroundColor: cellColor}} >
        {row.diskwrite}
      </TableCell>        
    );
  }
  const downloadCellFn = (row) => {
    let cellColor;
    if (row.download === '62.39 MBps') {
      cellColor = orange[500];
    } else {
      cellColor = green[500];
    }
    return (
      <TableCell align="right" sx={{backgroundColor: cellColor}} >
        {row.download}
      </TableCell>        
    );
  }
  const uploadCellFn = (row) => {
    let cellColor;
    if (row.upload === '484.31 kbps') {
      cellColor = orange[500];
    } else {
      cellColor = green[500];
    }
    return (
      <TableCell align="right" sx={{backgroundColor: cellColor}} >
        {row.upload}
      </TableCell>        
    );
  }  
  const greenCellFn = (rowdata) => {
    const cellColor = green[500];
    return (
      <TableCell align="right" sx={{backgroundColor: cellColor}} >
        {rowdata}
      </TableCell>     
    );
  }  


  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar />
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
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.ip}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.ip}
                      </TableCell>
                      <TableCell align="right">{row.hostname}</TableCell>
                      <TableCell align="right">{row.uptime}</TableCell>
                      <TableCell align="right">{row.memory}</TableCell>
                      <TableCell align="right">{row.cpucores}</TableCell>
                      <TableCell align="right">{row.load5m}</TableCell>
                      {greenCellFn(row.cpuused)}
                      {greenCellFn(row.memoryused)}
                      {greenCellFn(row.partitionused)}
                      {greenCellFn(row.diskread)}
                      {diskWriteCellFn(row)}
                      {downloadCellFn(row)}
                      {uploadCellFn(row)}
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
  );
}
