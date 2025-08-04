// src/pages/Login.jsx
import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); 

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    setError('');
    setSuccess('');

    
    if (formData.email === 'admin' && formData.password === '123') {
      setSuccess('!!!!!!!Login success!!!!!!!!');


       navigate('/UserTable'); 
     


    } else {
      setError('Invalid email or password. Please try again.');
    }
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
              Sign In
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
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
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />

            {error && (
              <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

           
            {success && (
              <Typography
                color="success.main"
                variant="body2"
                align="center"
                sx={{ mt: 1, fontWeight: 500 }}
              >
                {success}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.2 }}
            >
              Sign In
            </Button>

            <Typography
              variant="body2"
              color="primary"
              align="center"
              sx={{ cursor: 'pointer' }}
            >
              Forgot password?
            </Typography>
          </form>
        </Paper>

        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          you don't have account?{' '}
          <a href="/signup" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Sign up
          </a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;