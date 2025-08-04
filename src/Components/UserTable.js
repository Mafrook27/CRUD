import { useState, useEffect } from 'react';
import './UserTable.css'; // Ensure this file exists or remove if not needed
import axios from 'axios';
import {
  Navbar,
  Container,
  Nav,
  Button
} from 'react-bootstrap';

import {
  Typography,
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  Stack,
  Alert // Optional: for error messages
} from '@mui/material';

const UserTable = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState(null); 

  
  const [formData, setFormData] = useState({ userId: 1, id: null, title: '', body: '' });

  // GET Request
  const fetchPosts = async () => {
    setError(null); 
    try {
     
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      console.log("Fetched posts:", response.data);
      
      setPosts(response.data);
    } catch (err) {
      console.error('Axios GET Error:', err.message);
      setError('Failed to fetch posts.');
      if (err.response) {
        console.error('Error Data:', err.response.data);
        console.error('Error Status:', err.response.status);
      } else if (err.request) {
        console.error('No response received:', err.request);
      } else {
        console.error('Error setting up request:', err.message);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const getNextId = () => {
    if (posts.length === 0) return 1;

    return Math.max(...posts.map((post) => post.id)) + 1;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // POST Request
  const createPost = async (postData) => {
    try {
     
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', postData);
      return response.data;
    } catch (err) {
      console.error('Axios POST Error:', err.message);
      setError('Failed to create post.');
      if (err.response) {
        console.error('Error Data:', err.response.data);
        console.error('Error Status:', err.response.status);
      }
      throw err; 
    }
  };

  // PUT Request
  const updatePost = async (id, postData) => {
    try {
   
      const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, postData);
      return response.data;
    } catch (err) {
      console.error('Axios PUT Error:', err.message);
      setError('Failed to update post.');
      if (err.response) {
        console.error('Error Data:', err.response.data);
        console.error('Error Status:', err.response.status);
      }
      throw err; 
    }
  };

  // DELETE Request
  const deletePostAPI = async (id) => {
    try {
      
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    } catch (err) {
      console.error('Axios DELETE Error:', err.message);
      setError('Failed to delete post.');
      if (err.response) {
        console.error('Error Status:', err.response.status);
      }
      throw err; 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    try {
      let newOrUpdatedPost;
      if (isEditing) {
        
        newOrUpdatedPost = await updatePost(formData.id, formData);
        
        setPosts(posts.map((post) => (post.id === formData.id ? newOrUpdatedPost : post)));
        setIsEditing(false);
      } else {
       
        const postDataToSend = { ...formData, id: getNextId() };
        
        newOrUpdatedPost = await createPost(postDataToSend);
       
        setPosts([...posts, newOrUpdatedPost]);
      }

      // Reset form
      setFormData({ userId: 1, id: null, title: '', body: '' });
      setShowForm(false);
    } catch (err) {
      console.error('Error submitting form:', err);
      
    }
  };

  const handleEdit = (post) => {

    setFormData({
      userId: post.userId || 1, 
      id: post.id,
      title: post.title,
      body: post.body,
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    setError(null); // Clear previous errors
    try {
      await deletePostAPI(id);
      
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.error('Error deleting post:', err);
      
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Pagination logic
  const paginatedPosts = posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      {/* Navbar */}
      <Navbar
        bg="light"
        expand="lg"
        className='p-3'
        style={{
          borderBottom: '1px solid #ddd',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <Container style={{ width: '100%' }}>
          <Navbar.Brand href="#home" className="text-dark fw-semibold">
            Users Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto" style={{ alignItems: 'center' }}>
              <Button
                className="add-user-btn"
                onClick={() => {
                   // Reset form state when opening/closing
                   if (!showForm) {
                      setFormData({ userId: 1, id: null, title: '', body: '' });
                      setIsEditing(false);
                   }
                   setShowForm((prev) => !prev);
                }}
              >
                {showForm ? 'Cancel' : '+ Add New User'}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>

        {/* Optional Error Alert */}
        {error && (
          <Container className="mt-2">
            <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>
          </Container>
        )}

        {/* Form inside Navbar - Only show if showForm is true */}
        {showForm && (
          <Container
            fluid
            style={{
              maxWidth: '700px',
              padding: '20px',
              marginTop: '10px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
            }}
          >
            <form onSubmit={handleSubmit} style={{ borderRadius: '16px' }}>
              <div className="mb-3">
                <label htmlFor="postTitle" className="form-label">Title</label>
                <input
                  type="text"
                  id="postTitle"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Post Title"
                  required
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="postBody" className="form-label">Content</label>
                <textarea
                  id="postBody"
                  name="body"
                  value={formData.body}
                  onChange={handleInputChange}
                  placeholder="Post Content"
                  required
                  rows="4"
                  className="form-control"
                />
              </div>
              {/* Hidden input for userId if needed for submission, or manage it in state */}
              <input type="hidden" name="userId" value={formData.userId} />
              <div>
                <button
                  type="submit"
                  className="btn btn-dark me-2"
                >
                  {isEditing ? 'Update' : 'Add'} Post
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ userId: 1, id: null, title: '', body: '' });
                    setIsEditing(false);
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Container>
        )}
      </Navbar>

      <Box>
        <Container sx={{ py: 4 }} className="mt-4">
          <Typography variant="h6" gutterBottom>
            Users List
          </Typography>
          <Paper sx={{ borderRadius: '20px' }} variant="elevation" elevation={3}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Body</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedPosts.length > 0 ? (
                    paginatedPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>{post.id}</TableCell>
                        <TableCell>{post.title}</TableCell>
                        <TableCell>{post.body}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-sm p-1"
                              onClick={() => handleEdit(post)}
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i> EDIT
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm p-1"
                              onClick={() => handleDelete(post.id)}
                              title="Delete"
                            >
                              <i className="bi bi-trash"></i> DELETE
                            </button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        {posts.length === 0 ? 'Loading posts...' : 'No posts found.'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={posts.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 20, 50]}
            />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default UserTable;