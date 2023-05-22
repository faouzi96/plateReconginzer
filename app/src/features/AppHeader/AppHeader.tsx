import React from "react";
import { Container, Navbar } from "react-bootstrap";

const AppHeader = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand
          href="#home"
          style={{
            fontSize: "24px",
            marginLeft: "100px",
          }}
        >
          PARKEASY
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text></Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppHeader;
