import React, {
  useState,
  // useEffect
} from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
// import Auth from "../utils/auth";
// import { searchZoomLessons } from "../utils/API";
// import { saveLessonIds, getSavedLessonIds } from "../utils/localStorage";
import {
  // useMutation,
  useQuery
} from "@apollo/client";
// import { SAVE_LESSON } from "../utils/mutations";
import {
  // GET_ME,
  GET_LESSONS
} from "../utils/queries";
import Preview from "../components/Preview";

const Search = () => {
  // const [saveLesson] = useMutation(SAVE_LESSON);
  const {
    loading,
    data
  } = useQuery(GET_LESSONS);
  const [searchedLessons, setSearchedLessons] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  // const [savedLessonIds, setSavedLessonIds] = useState(getSavedLessonIds());
  const items = data?.searchLessons || [];

  // useEffect(() => {
  //   return () => saveLessonIds(savedLessonIds);
  // });

  const handleFormSubmit = async (event) => {
    console.log(items);
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchInput
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const { items } = await response.json();
      const lessonData = await items.map((lesson) => ({
        title: lesson.title,
        teacher: lesson.teacher || ["No teacher to display"],
        topic: lesson.description,
        play_url: lesson.play_url || "",
      }));

      setSearchedLessons(lessonData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // const handleSaveLesson = async (lessonId) => {
  //   const lessonToSave = searchedLessons.find(
  //     (lesson) => lesson.lessonId === lessonId
  //   );
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     await saveLesson({
  //       variables: { lesson: lessonToSave },
  //       update: (cache) => {
  //         const { me } = cache.readQuery({ query: GET_ME });
  //         cache.writeQuery({
  //           query: GET_ME,
  //           data: {
  //             me: {
  //               ...me,
  //               savedLessons: [...me.savedLessons, lessonToSave],
  //             },
  //           },
  //         });
  //       },
  //     });

  //     setSavedLessonIds([...savedLessonIds, lessonToSave.lessonId]);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <>
      <Jumbotron fluid className="text-colour bg-colour">
        <Container>
          <h1>Search for Lessons!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a lesson"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedLessons.length
            ? `Viewing ${searchedLessons.length} results:`
            : "Search for a lesson to begin"}
        </h2>
        <CardColumns>
          {searchedLessons.map((lesson) => {
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
                  {/* {Auth.loggedIn() && (
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
                  )} */}
                </Card.Body>
                {lesson.preview ? (
                  <Preview url={lesson.play_url}></Preview>
                ): ""}
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default Search;
