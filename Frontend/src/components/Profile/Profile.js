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
}));


const StyledBadge = styled(Badge)({
    "& .MuiBadge-badge": {
      backgroundColor: "#33A645"
    }
  });



const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <Item elevation={3}>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <StyledBadge badgeContent="" overlap="circular">
            <Avatar sx={{ width: 100, height: 100, fontSize: "2.5rem" }}>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
          </StyledBadge>
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
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.adress}
          </Typography>
        </Stack>
      </Item>
    </>
  );
};

export default Profile;
