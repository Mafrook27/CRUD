import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import {
  Typography,
  Box,
  Container,
  TextField,
  Collapse,
  Button,
  Stack,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import { fetchPosts, createPost, updatePost, deletePostAPI } from '../Services/Service';
import Cards from './Cards';
import TableComponent from './TableComponent';
import { setShowForm } from '../Redux/actions';

const demoData = [
  { name: 'xyz', salary: 42000, performance: 72 },
  { name: 'abcd', salary: 31000, performance: 49 },
  { name: 'Rao', salary: 28000, performance: 42 },
];





const UserTable = () => {
  const dispatch = useDispatch();
  const showForm = useSelector((state) => state.post.showForm);
const isMobile = useMediaQuery('(max-width:600px)');
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userId: 1,
    id: null,
    title: '',
    body: '',
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  // State for alert dialog
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  // State for delete confirmation dialog
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const { data, count } = await fetchPosts(page, rowsPerPage);
        setPosts(data);
        setCount(count);
      } catch (err) {
        setPosts([]);
        console.error('Failed to load posts:', err);
        setAlertTitle('Error');
        setAlertMessage('Failed to load posts. Please try again.');
        setAlertOpen(true);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [page, rowsPerPage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.body.trim()) {
      setAlertTitle('Validation Error');
      setAlertMessage('Title and Body are required!');
      setAlertOpen(true);
      return;
    }

    try {
      let result;
      if (isEditing) {
        result = await updatePost(formData.id, formData);
        setPosts(posts.map((post) => (post.id === formData.id ? result : post)));
        setIsEditing(false);
        setAlertTitle('Success');
        setAlertMessage('Post updated successfully!');
      } else {
        result = await createPost(formData);
        setPosts([result, ...posts]);
        setAlertTitle('Success');
        setAlertMessage('Post created successfully!');
      }

      setFormData({ userId: 1, id: null, title: '', body: '' });
      dispatch(setShowForm(false));
      setAlertOpen(true);
    } catch (err) {
      console.error('Submission failed:', err);
      setAlertTitle('Error');
      setAlertMessage('Failed to submit post. Please try again.');
      setAlertOpen(true);
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
    dispatch(setShowForm(true));
  };

  const handleDelete = async () => {
    try {
      await deletePostAPI(postIdToDelete);
      setPosts(posts.filter((post) => post.id !== postIdToDelete));
      setAlertTitle('Success');
      setAlertMessage('Post deleted successfully!');
      setAlertOpen(true);
    } catch (err) {
      console.error('Delete failed:', err);
      setAlertTitle('Error');
      setAlertMessage('Failed to delete post.');
      setAlertOpen(true);
    } finally {
      setConfirmDeleteOpen(false);
      setPostIdToDelete(null);
    }
  };

  const handleOpenDeleteConfirm = (id) => {
    setPostIdToDelete(id);
    setConfirmDeleteOpen(true);
  };


  useEffect(() => {
    if (!showForm) {
      setFormData({ userId: 1, id: null, title: '', body: '' });
      setIsEditing(false);
    }
  }, [showForm]);

  // Table configuration
  const headers = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    { key: 'body', label: 'Body' },
  ];

  const renderActions = (post) => (
    <Stack direction="row" spacing={1}>
      <Button
        variant="outlined"
        size="small"
        onClick={() => handleEdit(post)}
      >
        Edit
      </Button>
      <Button
        variant="outlined"
        size="small"
        color="error"
        onClick={() => handleOpenDeleteConfirm(post.id)}
      >
        Delete
      </Button>
    </Stack>
  );



  return (

    <Container sx={{ py: 4 }}>
      <Typography variant="h6" gutterBottom>
        Users List
      </Typography>

      <Collapse in={showForm} timeout="auto" unmountOnExit>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: '50vw',
            p: 2,
            border: '1px solid #ccc',
            borderRadius: 1,
            backgroundColor: '#f9f9f9',
            mx: 'auto',
            mb: 3,
          }}
        >
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            margin="normal"
            size="small"
            required
          />
          <TextField
            fullWidth
            label="Body"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            multiline
            rows={3}
            margin="normal"
            size="small"
            required
          />
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 1 }}>
      <Button
        type="submit"
        fullWidth={false}
        variant="contained"
        color="secondary"
        size="small"
      >
        {isEditing ? 'Update' : 'Create'}
      </Button>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={() => dispatch(setShowForm(false))}
      >
        Cancel
      </Button>
    </Box>
        </Box>
      </Collapse>

      <Box sx={{ mt: 3 }}>
        <TableComponent
          headers={headers}
          data={posts}
          loading={loading}
          noDataMessage="No posts found."
          renderActions={renderActions}
        />

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value));
            setPage(0);
          }}
        />

      </Box>





      <Box sx={{ mt: 3 }}>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          }}
        >
          {demoData.map((item, idx) => (
            <Cards key={idx} {...item} />
          ))}
        </Box>
      </Box>






















{/* Alert Dialog */}
<Dialog
  open={alertOpen}
  onClose={() => setAlertOpen(false)}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
  PaperProps={{
    style: {
      minWidth: isMobile ? '280px' : '350px',
      maxWidth: '90%',
      textAlign: 'center',
      position: 'absolute',
      top: '15%',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: isMobile ? '10px' : '16px',
      borderRadius: '8px',
      margin: 0,
    },
  }}
>
  <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
    {alertTitle}
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description" style={{ textAlign: 'center' }}>
      {alertMessage}
    </DialogContentText>
  </DialogContent>
  <DialogActions style={{ justifyContent: 'center' }}>
    <Button onClick={() => setAlertOpen(false)} color="primary" variant="contained">
      OK
    </Button>
  </DialogActions>
</Dialog>

{/* Delete Confirmation Dialog */}
<Dialog
  open={confirmDeleteOpen}
  onClose={() => setConfirmDeleteOpen(false)}
  aria-labelledby="confirm-delete-dialog-title"
  aria-describedby="confirm-delete-dialog-description"
  PaperProps={{
    style: {
      minWidth: isMobile ? '280px' : '350px',
      maxWidth: '90%',
      textAlign: 'center',
      position: 'absolute',
      top: '15%', // Consistent top positioning
      left: '50%',
      transform: 'translateX(-50%)',
      padding: isMobile ? '10px' : '16px',
      borderRadius: '8px',
      margin: 0,
    },
  }}
>
  <DialogTitle id="confirm-delete-dialog-title" style={{ textAlign: 'center' }}>
    Confirm Delete
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="confirm-delete-dialog-description" style={{ textAlign: 'center' }}>
      Are you sure you want to delete this post?
    </DialogContentText>
  </DialogContent>
  <DialogActions style={{ justifyContent: 'center' }}>
    <Button
      onClick={() => setConfirmDeleteOpen(false)}
      color="primary"
      variant="contained"
      style={{ marginRight: '10px' }} 
    >
      Cancel
    </Button>
    <Button
      onClick={handleDelete}
      color="error"
      variant="contained"
      autoFocus
    >
      Delete
    </Button>
  </DialogActions>
</Dialog>
    
    </Container>
  );
};

export default UserTable;