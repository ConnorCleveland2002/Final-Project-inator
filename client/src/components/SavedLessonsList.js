import { GET_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { Card, Container, CardColumns } from "react-bootstrap";

const SavedLessonsList = () => {
  const {
    // loading,
    data,
  } = useQuery(GET_ME);

  console.log(data);

  // event.preventDefault();
  try {
    // const lessonData =
    data.map((user) => ({
      title: savedLessons.title,
      teacher: savedLessons.teacher || ["No teacher to display"],
      topic: savedLessons.description,
      play_url: savedLessons.play_url || "",
    }));

    // setSearchedLessons(lessonData);
    // setSearchInput("");
  } catch (err) {
    console.error(err);
  }

  return (
    <>
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
