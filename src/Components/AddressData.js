import TableComponent from "./TableComponent";
import { useState, useEffect, useMemo } from "react";
import {
  Container,
  Typography,
  TablePagination,
  Box,
  TextField,
  Autocomplete,
} from "@mui/material";
import { loadCities, fetchFilteredUsers, fetchDefaultUsers } from ".././Services/Service";
const AddressData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchAge, setSearchAge] = useState("");
  const [selectedPersonalCity, setSelectedPersonalCity] = useState(null);
  const [selectedCompanyCity, setSelectedCompanyCity] = useState(null);
  const [personalCities, setPersonalCities] = useState([]);
  const [companyCities, setCompanyCities] = useState([]);
  const [overallFilteredUsers, setOverallFilteredUsers] = useState([]);

  useEffect(() => {
    const initializeCities = async () => {
      const { personalCities, companyCities } = await loadCities();
      setPersonalCities(personalCities);
      setCompanyCities(companyCities);
    };

    const fetchAndCombineFilters = async () => {
      setLoading(true);
      const fetchedUsersByFilter = [];

      try {
        if (searchAge !== "") {
          const ageUsers = await fetchFilteredUsers("age", parseInt(searchAge));
          if (ageUsers.length === 0) {
            setOverallFilteredUsers([]);
            setLoading(false);
            return;
          }
          fetchedUsersByFilter.push(ageUsers);
        }

        if (selectedPersonalCity) {
          const personalCityUsers = await fetchFilteredUsers("address.city", selectedPersonalCity);
          if (personalCityUsers.length === 0) {
            setOverallFilteredUsers([]);
            setLoading(false);
            return;
          }
          fetchedUsersByFilter.push(personalCityUsers);
        }

        if (selectedCompanyCity) {
          const companyCityUsers = await fetchFilteredUsers("company.address.city", selectedCompanyCity);
          if (companyCityUsers.length === 0) {
            setOverallFilteredUsers([]);
            setLoading(false);
            return;
          }
          fetchedUsersByFilter.push(companyCityUsers);
        }

        let combinedUsers = [];
        if (fetchedUsersByFilter.length === 0) {
          combinedUsers = await fetchDefaultUsers();
        } else if (fetchedUsersByFilter.length === 1) {
          combinedUsers = fetchedUsersByFilter;
        } else {
          combinedUsers = fetchedUsersByFilter;
          for (let i = 1; i < fetchedUsersByFilter.length; i++) {
            const currentUsers = fetchedUsersByFilter[i];
            combinedUsers = combinedUsers.filter(user1 =>
              currentUsers.some(user2 => user2.id === user1.id)
            );
          }
        }
        setOverallFilteredUsers(combinedUsers);
      } catch (err) {
        setOverallFilteredUsers([]);
      } finally {
        setLoading(false);
      }
    };

    initializeCities();
    fetchAndCombineFilters();
  }, [searchAge, selectedPersonalCity, selectedCompanyCity]);

  // Memoize paginated users to avoid unnecessary re-renders
  const paginatedUsers = useMemo(() => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return overallFilteredUsers.slice(startIndex, endIndex);
  }, [page, rowsPerPage, overallFilteredUsers]);

  useEffect(() => {
    setUsers(paginatedUsers);
    setTotal(overallFilteredUsers.length);
  }, [paginatedUsers, overallFilteredUsers]);

  const handleAgeChange = (e) => {
    setSearchAge(e.target.value);
    setPage(0);
  };

  const handlePersonalCityChange = (event, newValue) => {
    setSelectedPersonalCity(newValue);
    setPage(0);
  };

  const handleCompanyCityChange = (event, newValue) => {
    setSelectedCompanyCity(newValue);
    setPage(0);
  };

  // Updated handler: batch updates to avoid dropdown closing
  const handleRowsPerPageChange = (e) => {
    const newRowsPerPage = parseInt(e.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const headers = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "addressCity", label: "Personal City" },
    { key: "companyCity", label: "Company City" },
  ];

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h6" gutterBottom>
        Address List
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <TextField
          label="Age"
          type="number"
          value={searchAge}
          onChange={handleAgeChange}
          size="small"
          sx={{ minWidth: 120 }}
        />

        <Autocomplete
          disablePortal
          id="personal-city-autocomplete"
          options={personalCities}
          value={selectedPersonalCity}
          onChange={handlePersonalCityChange}
          sx={{ minWidth: 180 }}
          renderInput={(params) => (
            <TextField {...params} label="Personal City" size="small" />
          )}
        />

        <Autocomplete
          disablePortal
          id="company-city-autocomplete"
          options={companyCities}
          value={selectedCompanyCity}
          onChange={handleCompanyCityChange}
          sx={{ minWidth: 180 }}
          renderInput={(params) => (
            <TextField {...params} label="Company City" size="small" />
          )}
        />
      </Box>

      <TableComponent
        headers={headers}
        data={users}
        loading={loading}
        noDataMessage="No users found."
      />

      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Container>
  );
};

export default AddressData;