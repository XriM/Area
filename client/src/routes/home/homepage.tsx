import "../../App.css";
import {
  Container,
  Nav,
  Navbar,
} from "react-bootstrap";

import { ShowSignin, ShowSignup } from "..";

function NavbarHome() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
      <Navbar.Brand href="/" className="principal__color" style={{fontWeight: "bold"}}>AREA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function Body() {
  return (
    <>
    <div className="home__center">
      <p style={{margin: 15}}>
        Welcome to <a style={{fontWeight: 'bold'}}>AREA</a><br/>a built-in scalable solution<br/>
        that enables you to configure <a style={{fontWeight: 'bold'}}>workflows</a> between multiple services
      </p>
    </div>
    <div className="buttons__home">
      <ShowSignup />
      <a style={{marginRight: 15}}/>
      <ShowSignin />
    </div>
    </>
  );
}

export { NavbarHome, Body };
