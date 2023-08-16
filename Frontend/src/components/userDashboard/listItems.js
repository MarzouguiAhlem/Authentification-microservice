import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import { grey } from "@mui/material/colors";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import { UilCloudSun } from '@iconscout/react-unicons'

const iconStyle = { color: grey[50] }
const linkStyle = { textDecoration: "none", color: "white" }

export const mainListItems = (
  <React.Fragment>
    <Link to="gatewayList" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <ViewQuiltIcon sx={iconStyle} />
        </ListItemIcon>
        <ListItemText primary="Gateway List" />
      </ListItemButton>
    </Link>
    <Link to="Weather" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon >
          <UilCloudSun sx={iconStyle} style={{color : 'white'}} />
        </ListItemIcon>
        <ListItemText primary="Weather Forecast" />
      </ListItemButton>
    </Link>

    {/* <Link to="allUsers" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <GroupsIcon sx={iconStyle} />
        </ListItemIcon>
        <ListItemText primary="Users list" />
      </ListItemButton>
    </Link> */}

    {/* <Link to="addUser" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <PersonAddAlt1Icon sx={iconStyle} />
        </ListItemIcon>
        <ListItemText primary="Add User/Admin" />
      </ListItemButton>
    </Link> */}

    <Link to="profile" style={linkStyle}>
    <ListItemButton>
      <ListItemIcon>
        <AccountCircleIcon sx={iconStyle}/>
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
    </Link>

    <Link to="settings" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <SettingsIcon sx={iconStyle}/>
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
    </Link>

  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
