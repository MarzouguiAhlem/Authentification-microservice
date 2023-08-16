import React from "react";
import Divider from "@mui/material/Divider";

const TeamMemberCard = ({ user }) => {
  const cardTitleStyle = {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "14px",
  };
  const postStyle = {
    textAlign: "center",
    // fontWeight: "bold",
    fontSize: "14px",
  };
  const descriptionStyle = {
    textAlign: "center",
    // fontWeight: "bold",
    // fontSize: "14px",
  };
  const dividerStyle = {
    width: "30px",
    margin: "auto",
    // marginBottom: "40px",
    // marginTop: "40px",
    borderBottomWidth: 2,
    borderColor: "red",
  };

  const styleIcon = {
    color: "black",
    fontSize: "20px",
    margin: "10px",
    cursor: "pointer",
  };

  const imageStyle = {
    width :"250px",
    height :"250px"
  }

  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-sm-6">
          <img src={user.image} className="img-fluid rounded-start" alt="..." style={imageStyle}/>
        </div>
        <div className="col-sm-6" style={{margin:"20px 0"}}>
          <div className="card-body">
            <h6 className="card-title" style={cardTitleStyle}>
              {user.name.toUpperCase()}
            </h6>
            <p className="card-text" style={postStyle}>
              {user.post}
            </p>
            <p className="card-text" style={descriptionStyle}>
              <small className="text-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing 
              </small>
            </p>
            <Divider variant="middle" sx={dividerStyle} />
            <div style={{textAlign:"center"}}>
              <a href={user.social.facebook} target={"blank"}>
                <i className="fa-brands fa-facebook-f" style={styleIcon}></i>
              </a>
              <a href={user.social.twitter} target={"blank"}>
                <i className="fa-brands fa-twitter" style={styleIcon}></i>
              </a>
              <a href={user.social.linkedIn} target={"blank"}>
                <i className="fa-brands fa-linkedin" style={styleIcon}></i>
              </a>
              {/* <a href="http://instagram.com" target={"blank"}>
                <i className="fa-brands fa-instagram" style={styleIcon}></i>
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
