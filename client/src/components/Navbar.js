import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Navbar,
    Nav,
    Container,
    Modal,
    Tab
} from "react-bootstrap";
import Signup from "./Signup";
import Login from "./Login";
import Auth from "../utils/auth";
import "../App.css"
const AppNavbar = () => {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <Navbar
          className="bg-colour text-colour"
          variant="text-colour"
          expand="lg"
        >
          <Container fluid>
            <Navbar.Brand as={Link} to="/" className="text-colour">
              {/* possibly add in homepage w/ top teachers/lessons?  Maybe a like system? */}
              Codeware Conglomerate
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar" />
            <Navbar.Collapse id="navbar">
              <Nav className="ml-auto">
                <Nav.Link as={Link} to="/" className="text-colour">
                  Search
                </Nav.Link>
                {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to="/profile" className="text-colour">
                    Profile
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
                ) : (
                <Nav.Link
                  onClick={() => setShowModal(true)}
                  className="text-colour"
                >
                  Login/Sign Up
                </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Modal
          size="lg"
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby="signup-modal"
        >
          <Tab.Container defaultActiveKey="login">
            <Modal.Header closeButton>
              <Modal.Title id="signup-modal">
                <Nav variant="pills">
                  <Nav.Item>
                    <Nav.Link eventKey="login">Login</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tab.Content>
                <Tab.Pane eventKey="login">
                  <Login handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
                <Tab.Pane eventKey="signup">
                  <Signup handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
              </Tab.Content>
            </Modal.Body>
          </Tab.Container>
        </Modal>
      </>
    );
};

export default AppNavbar;
