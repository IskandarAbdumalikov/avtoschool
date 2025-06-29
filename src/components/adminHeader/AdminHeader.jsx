import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../context/slices/authSlice";
import { RiLogoutBoxLine } from "react-icons/ri";
import "./adminHeader.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";


const AdminHeader = () => {
  let dispatch = useDispatch();

  let navigate = useNavigate();

  const [open, setOpen] = useState(false);
  let handleClose = () => {
    setOpen(false);
  };

  let handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div style={{ paddingLeft: 16, paddingTop: 16 }} className="admin-header">
      <h1 className="admin-header__title">AVTOSHKOLATEST</h1>
      <button className="admin-header__logout-btn" onClick={() => setOpen(true)}>
        <RiLogoutBoxLine />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Hisobdan chiqish"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Siz hisobingizdan chiqib ketishni xohlaysizmi?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Yo`q
          </Button>
          <Button onClick={handleLogOut} color="primary" autoFocus>
            Ha
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default memo(AdminHeader);
