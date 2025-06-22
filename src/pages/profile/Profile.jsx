import React, { useState, useEffect } from "react";
import "./profile.scss";
import {
  useGetProfileQuery,
  useEditProfileMutation,
  useResetPasswordMutation,
} from "../../context/api/adminApi";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const Profile = () => {
  const { data: profileData } = useGetProfileQuery();
  const {
    birthDate: birthDate,
    firstName,
    email,
    lastName,
    phone,
    username,
  } = profileData || {};

  const [editProfile] = useEditProfileMutation();
  const [resetPassword] = useResetPasswordMutation();
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    username: "",
    phone: "",
  });
  const [passwordData, setPasswordData] = useState({
    password: "",
    newPassword: "",
  });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openResetPasswordDialog, setOpenResetPasswordDialog] = useState(false);

  useEffect(() => {
    if (profileData) {
      setFormData({
        lastName: profileData?.lastName,
        firstName: profileData?.firstName,
        username: profileData?.username,
        phone: profileData?.phone,
      });
    }
  }, [profileData]);

  const handleEditProfile = () => {
    editProfile(formData);
    setOpenEditDialog(false);
  };

  const handleResetPassword = () => {
    resetPassword(passwordData);
    setOpenResetPasswordDialog(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-container">
      {/* <div className="profile-header">
        <div className="created-at">
          Created At: {new Date(birthDate).toLocaleString()}
        </div>
        <div className="updated-at">
          Updated At: {new Date().toLocaleString()}
        </div>
      </div> */}

      <div className="profile-info">
        <div className="profile-item">
          <strong>Familiya:</strong> {lastName}
        </div>
        <div className="profile-item">
          <strong>Username:</strong> {username}
        </div>
        <div className="profile-item">
          <strong>Ism:</strong> {firstName}
        </div>
        <div className="profile-item">
          <strong>Telefon no`mer`:</strong> {phone}
        </div>
        <div className="profile-item">
          <strong>Email:</strong> {email}
        </div>
      </div>

      <div className="profile-actions">
        <Button variant="contained" onClick={() => setOpenEditDialog(true)}>
          Tahrirlash
        </Button>
        <Button
          variant="outlined"
          onClick={() => setOpenResetPasswordDialog(true)}
        >
          Parolni o'zgartirish
        </Button>
      </div>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Tahrirlash</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button
            onClick={handleEditProfile}
            variant="contained"
            color="primary"
          >
            Saqlash
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openResetPasswordDialog}
        onClose={() => setOpenResetPasswordDialog(false)}
      >
        <DialogTitle>Parolni o`zgartirish</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Current Password"
            name="password"
            type="password"
            value={passwordData.password}
            onChange={handlePasswordChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="New Password"
            name="newPassword"
            type="password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenResetPasswordDialog(false)}>
            Bekor qilish
          </Button>
          <Button
            onClick={handleResetPassword}
            variant="contained"
            color="primary"
          >
            Saqlash
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;
