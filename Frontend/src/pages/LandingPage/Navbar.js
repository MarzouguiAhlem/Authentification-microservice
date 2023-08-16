import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Navbar.css";
import $ from "jquery";

const LandingNavbar = () => {
  $(window).on("scroll", function () {
    var h = $(".header").height();
    var y = $(window).scrollTop();
    var nav = $(".landing-navbar");
    // console.log("h ", h)
    // console.log("y ", y)
    // console.log("y > h * 0.2 ", y > h * 0.2)
    // console.log("y < h ", y < h)
    // console.log("$(window).outerWidth() > 768 ", $(window).outerWidth() > 768)

    if (y > h * 0.2 && y < h && $(window).outerWidth() > 768) {
      nav.fadeOut("slow");
    } else {
      if (y < h * 0.2) {
        nav.removeClass("opaque").fadeIn("fast");
      } else {
        nav.addClass("opaque").fadeIn("fast");
      }
    }
  });


  $(window).on("scroll", function(){
    let y = $(window).scrollTop();
    // console.log("y= ",y)
    let sections = $(".nav-link-scroll")
    let navLinks = $(".nav-link-active-scroll")
    // console.log(sections)
    let heights = []
    Array.from(sections).forEach(element => 
        heights.push(element.offsetHeight)
    );
    let accHeights = [heights[0]]
    for(let i=0; i<heights.length-2; i++){
        accHeights.push(accHeights[i]+heights[i+1])
    }
    // console.log(heights)
    // console.log(accHeights)
    Array.from(navLinks).forEach(navlink=>navlink.classList.remove("active"))
    for(let i=accHeights.length-1;i>=0;i--){
        if(y>=accHeights[i]){
            navLinks[i+1].classList.add("active")
            break
        }
        
        else if (i==0 && navLinks[0]){navLinks[0].classList.add("active")}
    }

  })


  return (
    <Navbar
      className="landing-navbar"
      bg="light"
      expand="lg"
      fixed="top"
      style={{ backgroundColor: "rgba(255,255,255,0.5) !important" }}
      
    >
      <Container >
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" defaultActiveKey="#home">
            <Nav.Link href="#home" className="nav-link-active-scroll">HOME</Nav.Link>
            <Nav.Link href="#features" className="nav-link-active-scroll">FEATURES</Nav.Link>
            <Nav.Link href="#about" className="nav-link-active-scroll">ABOUT</Nav.Link>
            <Nav.Link href="#contact" className="nav-link-active-scroll">CONTACT</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default LandingNavbar;
