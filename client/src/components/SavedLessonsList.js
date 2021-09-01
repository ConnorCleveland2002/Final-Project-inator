import React from "react";
import { GET_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { Card, Container, CardColumns } from "react-bootstrap";
import { useState } from "react";

const SavedLessonsList = () => {
  const [savedLessons, setSavedLessons] = useState([]);
  const {
    // loading,
    data,
  } = useQuery(GET_ME);

  console.log(data);

  // event.preventDefault();
  try {
    const listData = data.map((user) => ({
      title: user.savedLessons.title,
      teacher: user.savedLessons.teacher || ["No teacher to display"],
      topic: user.savedLessons.description,
      play_url: user.savedLessons.play_url || "",
    }));

    setSavedLessons(listData);
  } catch (err) {
    console.error(err);
  }

  return (
    <>
      <Container>
        <h2>
          {savedLessons.length
            ? `Viewing ${savedLessons.length} results:`
            : "Search for a lesson to begin"}
        </h2>
        <CardColumns>
          {savedLessons.map((lesson) => {
            return (
              <Card key={lesson.lessonId} border="dark">
                {lesson.image ? (
                  <Card.Img
                    src={lesson.image}
                    alt={`The cover for ${lesson.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{lesson.title}</Card.Title>
                  <p className="small">Teachers: {lesson.teachers}</p>
                  <Card.Text>{lesson.topic}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedLessonsList;
