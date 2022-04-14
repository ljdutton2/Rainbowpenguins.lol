import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, NavbarBrand, Container, Button } from "react-bootstrap";
import mintPage from "./Mintpage";

const NavBar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);
  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Rainbow Penguin Aquarium</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="me-auto">
          <Nav.Link href="#home">Documentation</Nav.Link>
          <Nav.Link href="#link">My Penguins</Nav.Link>
          <Nav.Link href="#link">ADOPT</Nav.Link>
          <div>
            {/* <div>Documentation</div>
                            <div> Mint</div>
                            <div>My penguins</div> */}
            {isConnected ? (
              <p>Connected</p>
            ) : (
              <Button onClick={connectAccount}>Connect to metamask!</Button>
            )}
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
