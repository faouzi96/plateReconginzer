import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap';

const AppHeader = () => {
  return (
    <Navbar bg="light" expand="lg">
    <Container>
        <Navbar.Brand href="#home">PARKEASY</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Sign in
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
  </Navbar>
  )
}

export default AppHeader