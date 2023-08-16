import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import MessageAccordion from "./MessageAccordion";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { getAllMessages } from "../../features/redux/adminDashboardSlice";
import { useEffect } from "react";

const Dashboard = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleMessgeDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 350 }}
      role="presentation"
      //   onClick={toggleMessgeDrawer(anchor, false)}
      //   onKeyDown={toggleMessgeDrawer(anchor, false)}
    >
      <div style={{ display: "flex", margin: "10px", alignItems: "center" }}>
        <IconButton
          color="secondary"
          aria-label="close"
          onClick={toggleMessgeDrawer(anchor, false)}
        >
          <CloseIcon sx={{ cursor: "pointer", color: "red" }} />
        </IconButton>

        <Typography
          variant="h5"
          gutterBottom
          sx={{ margin: "0", flexGrow: 2, textAlign: "center" }}
        >
          Messages
        </Typography>
      </div>
      <MessageAccordion />
    </Box>
  );

  const anchor = "right";
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getAllMessages())
    }, [])
    

  return (
    <div>
      <React.Fragment key={anchor}>
        {/* <Button onClick={toggleMessgeDrawer(anchor, true)}>{anchor}</Button> */}
        <DashboardLayout toggleMessgeDrawer={toggleMessgeDrawer} />
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleMessgeDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default Dashboard;
