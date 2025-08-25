import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Container,
  Typography,
} from "@mui/material";

const dummyData = [
  { id: 1, name: "John Doe", age: 25, city: "Chennai" },
  { id: 2, name: "Jane Smith", age: 30, city: "Bangalore" },
  { id: 3, name: "Arun Kumar", age: 28, city: "Hyderabad" },
  { id: 4, name: "Priya Patel", age: 35, city: "Mumbai" },
  { id: 5, name: "Rahul Mehta", age: 22, city: "Delhi" },
  { id: 6, name: "Sara Khan", age: 27, city: "Kolkata" },
  { id: 7, name: "Vikram Reddy", age: 31, city: "Pune" },
  { id: 8, name: "Anita Sharma", age: 29, city: "Jaipur" },
  { id: 9, name: "Karan Singh", age: 33, city: "Chennai" },
  { id: 10, name: "Meena Iyer", age: 26, city: "Hyderabad" },
  { id: 11, name: "Ravi Kumar", age: 40, city: "Delhi" },
  { id: 12, name: "Lakshmi Narayan", age: 36, city: "Bangalore" },
];

const Sample = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = dummyData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h6" gutterBottom>
        Sample Table 
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>City</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={dummyData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default Sample;

