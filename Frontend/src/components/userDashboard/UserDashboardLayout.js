import * as React from "react";
import { useState } from "react";
import {
  Avatar,
  Hidden,
  IconButton,
  MenuItem,
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  Badge,
  Container,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { grey } from "@mui/material/colors";
import { Outlet, useNavigate, Link as LinkTo } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/redux/userSlice";
import { useEffect } from "react";
import { relativePaths } from '../../navigation';

import Copyright from "../Copyright";
import MatxMenu from "../MatxMenu";
import { Span } from "../Typography";
import { mainListItems, secondaryListItems } from "./listItems";
import Weather from "../Weather/Weather";
// import "./dashboard.css";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: 1150,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - 257px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: 1100,
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const UserMenu = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: 24,
  padding: 4,
  "& span": { margin: "0 8px" },
}));

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  "& span": { marginRight: "10px", color: theme.palette.text.primary },
}));

const UserDashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const { user } = useSelector((state) => state.user);
//   const { messages } = useSelector((state) => state.adminDashboard);
//   const [nbMessages, setNbMessages] = useState(0);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout()).then(() => navigate(relativePaths.landingPage));
  };

//   useEffect(() => {
//     const result = messages.filter(message => !message.isReaden );
//     setNbMessages(result.length)
//   }, [messages])
  

  const anchor = "right";

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex", overflow: "hidden" }}>
        <CssBaseline />
        
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {user.role.toUpperCase()} Dashboard
            </Typography>
            {/* <IconButton
              color="inherit"
             onClick={()=> console.log("notif")}
            >
              <Badge badgeContent={5} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}

            <MatxMenu
              menuButton={
                <UserMenu>
                  <Hidden xsDown>
                    <Span>
                      Hi <strong>{user.name}</strong>
                    </Span>
                  </Hidden>
                  <Avatar
                    src="/public/logo192.png"
                    alt={user.name.charAt(0).toUpperCase()}
                    sx={{ cursor: "pointer" }}
                  />
                </UserMenu>
              }
            >
              <StyledItem>
                <LinkTo to="/">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "fit-content",
                      "& svg": {
                        mr: 2,
                      },
                      "& hr": {
                        mx: 5,
                      },
                    }}
                  >
                    <HomeIcon sx={{ color: grey[800] }} />
                    <Span> Home </Span>
                  </Box>
                </LinkTo>
              </StyledItem>

              <StyledItem>
                <LinkTo to="profile">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "fit-content",
                      "& svg": {
                        mr: 2,
                      },
                      "& hr": {
                        mx: 5,
                      },
                    }}
                  >
                    <PersonIcon sx={{ color: grey[800] }} />
                    {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
                    <Span> Profile </Span>
                  </Box>
                </LinkTo>
              </StyledItem>

              <StyledItem>
                <LinkTo to="settings">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "fit-content",
                      "& svg": {
                        mr: 2,
                      },
                      "& hr": {
                        mx: 5,
                      },
                    }}
                  >
                    <SettingsIcon sx={{ color: grey[800] }} />
                    <Span> Settings </Span>
                  </Box>
                </LinkTo>
              </StyledItem>

              <StyledItem onClick={handleLogout}>
                {/* <Link to="/page-layouts/user-profile"> */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "fit-content",
                    "& svg": {
                      mr: 2,
                    },
                    "& hr": {
                      mx: 5,
                    },
                  }}
                >
                  <PowerSettingsNewIcon sx={{ color: grey[800] }} />
                  <Span> Logout </Span>
                </Box>
                {/* </Link> */}
              </StyledItem>
            </MatxMenu>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar
            // className="sty"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <MenuOpenIcon sx={{ color: grey[50] }} />
            </IconButton>
          </Toolbar>

          <List component="nav" className="css-y5vkr9">
            {mainListItems}
            <Divider variant="middle" sx={{ my: 1, bgcolor: grey[900] }} />
            {secondaryListItems}
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Outlet />
            {/* <Copyright sx={{ pt: 4 }} /> */}
            
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserDashboardLayout;
