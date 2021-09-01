import React, { useState } from "react";
import { ADD_LESSON } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import {
  Form,
  Button,
  Alert,
} from "react-bootstrap";

const AddLesson = () => {
  const [userFormData, setUserFormData] = useState({
    title: "",
    topic: "",
    teacher: "",
    play_url: "",
    host_id: "",
  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [addLesson] = useMutation(ADD_LESSON);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addLesson({
        variables: { ...userFormData },
      });

      Auth.login(data.addLesson.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      title: "",
      topic: "",
      teacher: "",
      play_url: "",
      host_id: "",
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your creation!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Title"
            name="title"
            onChange={handleInputChange}
            value={userFormData.title}
            required
          />
          <Form.Control.Feedback type="invalid">
            Title is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="topic">Topic</Form.Label>
          <Form.Control
            type="topic"
            placeholder="Your Topic"
            name="topic"
            onChange={handleInputChange}
            value={userFormData.topic}
            required
          />
          <Form.Control.Feedback type="invalid">
            Topic is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="play_url">Link</Form.Label>
          <Form.Control
            type="play_url"
            placeholder="Your Lesson Link"
            name="play_url"
            onChange={handleInputChange}
            value={userFormData.play_url}
            required
          />
          <Form.Control.Feedback type="invalid">
            Link is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="host_id">Host ID</Form.Label>
          <Form.Control
            type="host_id"
            placeholder="Host ID (anything for now)"
            name="host_id"
            onChange={handleInputChange}
            value={userFormData.host_id}
            required
          />
          <Form.Control.Feedback type="invalid">
            Host ID is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="teacher">Teacher</Form.Label>
          <Form.Control
            type="teacher"
            placeholder="Your Name"
            name="teacher"
            onChange={handleInputChange}
            value={userFormData.teacher}
            required
          />
          <Form.Control.Feedback type="invalid">
            Teacher is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={
            !(
              userFormData.title &&
              userFormData.topic &&
              userFormData.play_url &&
              userFormData.host_id
            )
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddLesson;
