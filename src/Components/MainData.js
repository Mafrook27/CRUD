import "./Css/nav.css";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography,Box,InputBase } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';
import TableComponent from './TableComponent';
import { setSearchId} from "../Redux/actions";
const MainData = () => {
  const searchId = useSelector((state) => state.post.searchId);
    const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://fakerapi.it/api/v1/users');
      const userData = response.data.data;
      const mappedUsers = userData.map((user) => ({
        id: user.id,
        firstname: user.firstname,
        username: user.username,
        password: user.password,
      }));
      setUsers(mappedUsers);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.id.toString().includes(searchId.trim())
  );

  const headers = [
    { key: 'id', label: 'ID' },
    { key: 'firstname', label: 'First Name' },
    { key: 'username', label: 'Username' },
    { key: 'password', label: 'Password' },
  ];

  return (
    <Container sx={{ py: 4  }} className="page">
     
     <Box sx={{display:'flex', alignItems: 'center',justifyContent:'space-between', marginBottom:'25px'}}>
      <Typography variant="h6" gutterBottom>
        Main Data Users List
      </Typography>


      


 <Box
  sx={{
    display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none', xl: 'none' }, 
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: "25px",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    padding: "6px 16px",
    alignItems: "center",
    width: { xs: "130px", sm: "130px", },
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.18)",
      border: "1px solid rgba(0, 0, 0, 0.3)",
    },
    "&:focus-within": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(122, 62, 62, 0.4)",
    },
  }}
>
  <SearchIcon sx={{ color: "rgba(0, 0, 0, 0.8)", mr: 1, fontSize: 20 }} />
  <InputBase
    placeholder="Search..."
    inputProps={{ "aria-label": "search" }}
    sx={{ 
      color: "black", 
      width: "100%",
      "& ::placeholder": {
        color: "rgba(0, 0, 0, 0.7)",
        opacity: 1,
      },
    }}
    value={searchId}
    onChange={(e) => dispatch(setSearchId(e.target.value))}
  />
</Box>




</Box>

      <TableComponent
        headers={headers}
        data={filteredUsers}
        loading={loading}
        noDataMessage={`No users found matching ID "${searchId}"`}
      />
    </Container>

  );
};

export default MainData;





