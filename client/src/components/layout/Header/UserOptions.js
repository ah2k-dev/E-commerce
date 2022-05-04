import React, { useState } from "react";
import "./Header.css";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/userActions";
import { useHistory } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";

const UserOptions = ({ user }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];
  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  const [open, setOpen] = useState(false);
  function dashboard() {
    history.push("/admin/dashboard");
  }
  function orders() {
    history.push("/orders");
  }
  function account() {
    history.push("/account");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }
  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        className="speedDial"
        style={{ zIndex: "11" }}
        ariaLabel="SppedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        icon={
          <img className="speedDialIcon" src={user.avatar.url} alt="Profile" />
        }
        direction="down"
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            // tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}{" "}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
