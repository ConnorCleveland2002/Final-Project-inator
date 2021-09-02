import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
import Auth from "../utils/auth";
import { saveLessonIds, getSavedLessonIds } from "../utils/localStorage";
import { useMutation, useQuery } from "@apollo/client";
import { SAVE_LESSON } from "../utils/mutations";
import {
  GET_ME,
  // GET_LESSONS,
  SEARCH_ALL_LESSONS
} from "../utils/queries";
import Preview from "../components/Preview";

const Search = () => {
  const [saveLesson] = useMutation(SAVE_LESSON);
  const [searchedLessons, setSearchedLessons] = useState([]);
  const [savedLessonIds, setSavedLessonIds] = useState(getSavedLessonIds());
  const { loading, data } = useQuery(SEARCH_ALL_LESSONS);


  useEffect(() => {
    return () => saveLessonIds(savedLessonIds);
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const lessonData = data.searchAllLessons.map((lesson) => ({
        title: lesson.title,
        teacher: lesson.teacher || ["No teacher to display"],
        topic: lesson.topic,
        play_url: lesson.play_url || "",
      }));

      setSearchedLessons(lessonData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveLesson = async (lessonId) => {
    const lessonToSave = searchedLessons.find(
      (lesson) => lesson.lessonId === lessonId
    );
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveLesson({
        variables: { lesson: lessonToSave },
        update: (cache) => {
          const { me } = cache.readQuery({ query: GET_ME });
          cache.writeQuery({
            query: GET_ME,
            data: {
              me: {
                ...me,
                savedLessons: [...me.savedLessons, lessonToSave],
              },
            },
          });
        },
      });

      setSavedLessonIds([...savedLessonIds, lessonToSave.lessonId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-colour bg-colour">
        <Container>
          <h1>Search for Lessons!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                {/* <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a lesson"
                /> */}
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Find Lessons!
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
        <br></br>
      </Jumbotron>

      <br></br>

      <Container className="text-colour bg-colour rounded mb-0">
        <br></br>
        <h2>
          {searchedLessons.length
            ? `Viewing ${searchedLessons.length} results:`
            : "Search for a lesson to begin"}
        </h2>
        <br></br>
        <CardColumns>
          {searchedLessons.map((lesson) => {
            return (
              <>
                <Card className="bg-colour" key={lesson.play_url} border="dark">
                  {lesson.image ? (
                    <Card.Img
                      src={lesson.image}
                      alt={`The cover for ${lesson.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{lesson.title}</Card.Title>
                    <hr></hr>
                    <p>
                      Teachers: <span className="small">{lesson.teacher}</span>
                    </p>
                    <p>
                      Topic: <span className="small">{lesson.topic}</span>
                    </p>
                    <p>
                      Link: <span className="small">{lesson.play_url}</span>
                    </p>
                    <iframe
                      width="560"
                      height="315"
                      allowFullScreen
                      title={lesson.title}
                      src={lesson.play_url}
                    ></iframe>
                    <br></br>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedLessonIds?.some(
                          (savedLessonId) => savedLessonId === lesson.lessonId
                        )}
                        className="btn-block btn-info"
                        onClick={() => handleSaveLesson(lesson.lessonId)}
                      >
                        {savedLessonIds?.some(
                          (savedLessonId) => savedLessonId === lesson.lessonId
                        )
                          ? "This lesson has already been saved!"
                          : "Save this lesson!"}
                      </Button>
                    )}
                  </Card.Body>
                  {lesson.preview ? (
                    <Preview url={lesson.play_url}></Preview>
                  ) : (
                    ""
                  )}
                </Card>
                <br></br>
              </>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default Search;
