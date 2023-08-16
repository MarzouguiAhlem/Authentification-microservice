import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { grey } from "@mui/material/colors";
import { deleteMessage, setMessageIsReaden } from "../../features/redux/adminDashboardSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from '@mui/material/IconButton';
import { useState } from "react";
import ComfirmDialog from "../ConfirmDialog/ComfirmDialog";

const MessageAccordion = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.adminDashboard);
  const [openConfirm, setOpenConfirm] = useState(false)
  const [messagetoDelete, setMessageToDelete] = useState("")

  const handleChangeStatus = (msg) => {
    if (!msg.isReaden) {
      const reqBody = {
        _id: msg._id,
        isReaden: true,
      };
      dispatch(setMessageIsReaden(reqBody));
    }
  };


  const handleDeleteMessage = () => {
    dispatch(deleteMessage(messagetoDelete._id))
  };

  const handleOpenConfirm = (open, message)=>{
    setMessageToDelete(message)
    setOpenConfirm(open)
  }

  return (
    <div>
      <ComfirmDialog confirmFunction={handleDeleteMessage} handleOpenConfirm={handleOpenConfirm} title={'Confirmation'} message={"Are you sure you want to delete this message ?"} isOpen={openConfirm} />
      {messages.map((message) => {
        let bgcolor = message.isReaden ? "white" : grey[200];
        return (
          <Accordion
            key={message._id}
            sx={{ backgroundColor: bgcolor }}
            onClick={() => handleChangeStatus(message)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{message.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>From : {message.email}</Typography>
              <Typography>Subject : {message.subject}</Typography>
              <Typography>{message.message}</Typography>
              <div style={{display:"flex", justifyContent:"end"}}>
              <IconButton aria-label="delete" onClick={()=> handleOpenConfirm(true ,message)}>
                <DeleteIcon />
              </IconButton>
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default MessageAccordion;
