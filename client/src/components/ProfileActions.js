import React, { useState } from "react";
import {
  Tab,
  Modal,
  Button,
  // Card,
  CardColumns,
  Nav,
  Container,
} from "react-bootstrap";
import Auth from "../utils/auth";
import CreateLesson from "../components/CreateLesson";
import SavedLessonsList from "./SavedLessonsList";

const ProfileActions = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Nav className="ml-auto">
        <Container className="text-colour bg-colour">
          Profile Actions!
          <CardColumns>
            <Button
              eventKey="create"
              onClick={() => setShowModal(true)}
              className="text-colour"
            >
              Add Lesson!
            </Button>
            <Button onClick={Auth.logout}>Logout</Button>
          </CardColumns>
        </Container>
        <Container className="text-colour bg-colour">
          <Button>Remove</Button>
        </Container>

              <SavedLessonsList />

        <Modal
          size="lg"
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby="create-modal"
        >
          <Tab.Container defaultActiveKey="create">
            <Modal.Header closeButton>
              <Modal.Title id="create-modal">
                <Nav variant="pills">
                  <Nav.Item>
                    <Nav.Link eventKey="create">Create Lesson!</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tab.Content>
                <Tab.Pane eventKey="create">
                  <CreateLesson handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
              </Tab.Content>
            </Modal.Body>
          </Tab.Container>
        </Modal>
      </Nav>
    </>
  );
};

export default ProfileActions;
