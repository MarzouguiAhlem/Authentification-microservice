import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Badge from "@mui/material/Badge";


const Item = styled(Paper)(({ theme }) => ({
  textAlign: "center",
  padding: "50px",
  width: "40%",
  minWidth: "250px",
  margin: "auto",
  height:"400px"
}));


const MemberCard = (props) => {
  const { user } = props


  return (
    <>
      <Item elevation={5}>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >

            <Avatar sx={{ width: 100, height: 100, fontSize: "2.5rem" }}>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>

          {user.role === "admin" ? (
            <Chip
              label="Admin"
              color="secondary"
              icon={<AdminPanelSettingsIcon />}
            />
          ) : (
            <Chip label="User" color="info" icon={<VerifiedUserIcon />} />
          )}

          <Typography gutterBottom variant="h5" component="div">
            {user.name}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography> */}
          <Typography variant="body2" color="text.secondary">
            {user.post}
          </Typography>
        </Stack>
      </Item>
    </>
  );
};

export default MemberCard;
