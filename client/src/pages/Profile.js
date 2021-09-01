import React from "react";
import {
  Jumbotron,
  Container,
} from "react-bootstrap";
import ProfileActions from "../components/ProfileActions";

const Profile = () => {
  return (
    <>
      <Jumbotron fluid className="text-colour bg-colour">
        <Container>
          <h1>Welcome to your profile!</h1>
        </Container>
      </Jumbotron>
      <ProfileActions />
    </>
  );
};

export default Profile;
