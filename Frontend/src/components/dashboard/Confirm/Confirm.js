import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const Confirm = (props) => {
  const [open, setOpen] = useState(props.open);
  const { handleDeleteUsers, handleOpenConfirm, selected } = props;
  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClose = () => {
    setOpen(false);
    handleOpenConfirm(false);
  };

  const handleConfirm = () => {
    handleDeleteUsers();
    handleClose();
  };

  return (
    <Dialog
    fullWidth={true}
    maxWidth="sm"
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        Delete Confirmation
      </DialogTitle>
      <DialogContent>

          {selected.length > 1
            ? "Are you sure? You want to permanently delete this users !"
            : "Are you sure? You want to permanently delete this user !"}

            {selected.map((email,index) => {
                return <ListItemText key={index}>{email}</ListItemText> 
            })}

      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirm;
