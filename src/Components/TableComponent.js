
import { useEffect,useState } from 'react';
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,

  Typography,
} from '@mui/material';
import Loader from './Loader'
const TableComponent = ({
  headers, 
  data,
  loading, 
  noDataMessage, 
  renderActions, 
}) => {

const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 15000); // Loader displays for 3 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);



  return (
    <Paper elevation={3} sx={{ borderRadius: '20px', overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              {headers.map((header) => (
                <TableCell key={header.key} sx={{ fontWeight: 'bold' }}>
                  {header.label}
                </TableCell>
              ))}
              {renderActions && (
                <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={headers.length + (renderActions ? 1 : 0)}
                  align="center"
                  sx={{ py: 3 }}
                >
      {showLoader&&<Loader/>}
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              data.map((row, index) => (
                <TableRow key={row.id || index} >
                  {headers.map((header) => (
                    <TableCell key={header.key}>
                      {row[header.key] || '-'}
                    </TableCell>
                  ))}
                  {renderActions && (
                    <TableCell>{renderActions(row)}</TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headers.length + (renderActions ? 1 : 0)}
                  align="center"
                  sx={{ py: 3 }}
                >
                  <Typography>{noDataMessage}</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableComponent;