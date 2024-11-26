import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Snackbar,
  Alert,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';

const UserManagement = ({ initialUsers = [], onUserUpdate, containerWidth = "md" }) => {
  const [users, setUsers] = useState(initialUsers);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  React.useEffect(() => {
    if (onUserUpdate) {
      onUserUpdate(users);
    }
  }, [users, onUserUpdate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (editingId !== null) {
      setUsers(users.map(user =>
        user.id === editingId
          ? { ...formData, id: editingId }
          : user
      ));
      setSnackbar({
        open: true,
        message: 'User updated successfully!',
        severity: 'success'
      });
    } else {
      setUsers([
        ...users,
        {
          ...formData,
          id: Date.now()
        }
      ]);
      setSnackbar({
        open: true,
        message: 'User added successfully!',
        severity: 'success'
      });
    }

    setFormData({ name: '', email: '', phone: '' });
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone
    });
    setEditingId(user.id);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '' });
    setEditingId(null);
    setErrors({});
  };

  return (
    <Container maxWidth={containerWidth} sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setFormData({ name: '', email: '', phone: '' });
            setEditingId(null);
            setIsModalOpen(true);
          }}
        >
          Add New User
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Users ({users.length})
        </Typography>
        {users.length === 0 ? (
          <Typography color="textSecondary" align="center">
            No users found.
          </Typography>
        ) : (
          <List>
            {users.map((user) => (
              <ListItem key={user.id} divider>
                <ListItemText
                  primary={user.name}
                  secondary={
                    <>
                      {user.email} • {user.phone}
                    </>
                  }
                />
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEdit(user)}
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingId !== null ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ pt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phone"
                  label="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseModal}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
          >
            {editingId !== null ? 'Update User' : 'Add User'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

UserManagement.propTypes = {
  initialUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ),
  onUserUpdate: PropTypes.func,
  containerWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};

export default UserManagement;