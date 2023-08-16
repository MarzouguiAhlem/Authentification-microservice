import React from "react";
import Container from "@mui/material/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import logo from "./../../images/logoSmartIrrigation.png";
import logo1 from "./../../images/logoSmartIrrigation1.png";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import BusinessIcon from '@mui/icons-material/Business';
import EventIcon from '@mui/icons-material/Event';
import PolicyIcon from '@mui/icons-material/Policy';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import MemberCard from "./MemberCard";
import Divider from '@mui/material/Divider';
import TeamMemberCard from "../../components/TeamMemberCard";
import "./About.css";
const About = () => {
    const listItemStyle = { paddingTop:"0px", paddingBottom:"0px"}
    const users = [
        {
            name:"Bouraoui Mohamed Nour",
            post:"Project Manger",
            image :"https://thumbs.dreamstime.com/b/avatar-man-person-face-icon-vector-illustration-head-character-cartoon-human-portrait-profile-user-isolated-white-adult-silhouette-228172845.jpg",
            social : {
              facebook :"https://www.facebook.com",
              twitter :"https://twitter.com",
              linkedIn:"https://www.linkedin.com",
            }
        },
        {
            name:"omar bouhaha",
            post:"Leader",
            image :"https://thumbs.dreamstime.com/b/male-profile-avatar-brown-hair-over-white-background-vector-illustration-81931493.jpg",
            social : {
              facebook :"https://www.facebook.com",
              twitter :"https://twitter.com",
              linkedIn:"https://www.linkedin.com",
            }
        },
        {
            name:"Jbeli Amira",
            post:"Developer",
            image :"https://thumbs.dreamstime.com/b/woman-avatar-person-female-vector-illustration-icon-character-face-portrait-cartoon-girl-user-human-profile-isolated-white-adult-228172851.jpg",
            social : {
              facebook :"https://www.facebook.com",
              twitter :"https://twitter.com",
              linkedIn:"https://www.linkedin.com",
            }
        }
      ]
  return (
    <>
    <h3 className="styleAboutus" id="about"> ABOUT US </h3>
      <Container maxWidth="md" >
        <Row>
          <Col>
            <div className="columns">
              <img
                src={logo1}
                alt="logo1"
                className="logoSmartIrrigation1 box"
              />
            </div>
            <div className="columns">
              <img src={logo} alt="logo" className="logoSmartIrrigation" />
            </div>
          </Col>
          <Col>
          <h3>Company Details</h3>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem sx={listItemStyle}>
                <ListItemAvatar>
                  <Avatar>
                    <BusinessIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Company name" secondary="Artibedded" />
              </ListItem>
              <ListItem sx={listItemStyle}>
                <ListItemAvatar>
                  <Avatar>
                    <EventIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Year of establishment" secondary="2021" />
              </ListItem>
              <ListItem sx={listItemStyle}>
                <ListItemAvatar>
                  <Avatar>
                    <PolicyIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Legal status of company" secondary="SA" />
              </ListItem>
              <ListItem sx={listItemStyle}>
                <ListItemAvatar>
                  <Avatar>
                    <HomeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Address" secondary="Technopole Sfax" />
              </ListItem>
              <ListItem sx={listItemStyle}>
                <ListItemAvatar >
                  <Avatar>
                    <EmailIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Contact" secondary="contact@artibedded.com" />
              </ListItem>
            </List>
          </Col>
        </Row>
        </Container>
        <Divider variant="middle" sx={{width:'60vw', margin:"auto" ,marginBottom:"40px",marginTop:"40px", borderBottomWidth: 2}}/>
        <Container maxWidth="lg" >
        <Row >
            <h3 className="styleStaff"> OUR TEAM </h3>
            {users.map((user,index)=>(
                <Col key={index+100} xs={12} md={6}>
                    {/* <MemberCard key={index} user={user}/> */}
                    <TeamMemberCard key={index} user={user}/>
                </Col>
            ))}
            {/* <MemberCard/> */}
        </Row>
        </Container>
    </>
  );
};

export default About;
