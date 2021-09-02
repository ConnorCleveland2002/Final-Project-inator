import React, { useState } from "react";
import {
  Tab,
  Modal,
  Button,
  // Card,
  CardColumns,
  Nav,
  Container,
  Card,
} from "react-bootstrap";
// import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import CreateLesson from "../components/CreateLesson";
// import SavedLessonsList from "./SavedLessonsList";
import { GET_ME } from "../utils/queries";
// import WhoAmI from "./WhoAmI";
import { useMutation, useQuery } from "@apollo/client";
import { REMOVE_USER } from "../utils/mutations";

const ProfileActions = () => {
  const [showModal, setShowModal] = useState(false);
  const [showResults, setShowResults] = React.useState(false);
  const [meme, setMeme] = useState([]);
  const { loading, data } = useQuery(GET_ME);
  const removeUser = useMutation(REMOVE_USER);

  const goGetMe = async (event) => {
    event.preventDefault();

    try {
      //TODO: data.me.map is not a function?
      console.log(data);
      const meData = data.me.map((me) => ({
        _id: me._id,
        username: me.username,
        email: me.email,
      }))

      setMeme(meData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Nav className="ml-auto">
        <Container className="text-colour bg-colour">
          <Card.Title>
            <h1>Profile Actions!</h1>
          </Card.Title>
          <CardColumns>
            <Button
              eventKey="create"
              onClick={() => setShowModal(true)}
              className="text-colour"
            >
              Add Lesson!
            </Button>
            <Button onClick={Auth.logout}>
              Logout
            </Button>
            <Button onClick={() => removeUser}>Delete Account</Button>
          </CardColumns>
        </Container>
        <Container className="text-colour bg-colour">
          <Button onClick={() => setShowResults(true)}>
            Who Am I?
          </Button>
        </Container>

        {/* <SavedLessonsList /> */}
        {/* (useQuery(GET_ME)) => */}
        <Modal
          show={showResults}
          onHide={() => setShowResults(false)}
          size="lg"
          aria-labelledby="me-modal"
        >
          <Button onClick={goGetMe}>Press Me!</Button>
          <Container>
            <CardColumns>
              {meme.map((me) => {
                return (
                  <Card.Body>
                    <Card.Title>{me.username}</Card.Title>
                    <Card.Text>{me.email}</Card.Text>
                    <p className="small">ID: {me._id}</p>
                  </Card.Body>
                );
              })}
            </CardColumns>
          </Container>
        </Modal>

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
