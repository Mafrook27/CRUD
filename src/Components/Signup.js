import { Box, Button, Container, CssBaseline, Grid, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

 
  const [error, setError] = useState('');

  
  const handleChange = (e) => {
    const { name, value } = e.target;

   
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

   
    if (
      formData.firstName.trim() === '' ||
      formData.lastName.trim() === '' ||
      formData.email.trim() === '' ||
      formData.password.trim() === '' ||
      formData.confirmPassword.trim() === ''
    ) {
      setError('Please fill in all the fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

   
    console.log('Registration successful:', formData);
    setError('');
    
    setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 3,
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Box mb={2}>
            <img
              src="/logo.svg"
              alt="Logo"
              style={{ width: '120px', height: '120px', marginBottom: '16px' }}
            />
            <Typography component="h1" variant="h5" fontWeight="600">
              Create Account
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  required
                  fullWidth
                  label="Last Name"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            {error && (
              <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.2 }}
            >
              Sign Up
            </Button>

            <Typography variant="body2" color="textSecondary">
              Already have an account?{' '}
              <a href="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
                Sign In
              </a>
            </Typography>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Signup