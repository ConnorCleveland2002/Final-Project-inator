import React, {
    useQuery,
    useState,
    // useMutation,
    // useEffect
} from "react";
import { GET_LESSONS } from "../utils/queries";
import {
//   Jumbotron,
  Container,
//   Form,
//   Col,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
import Auth from "../utils/auth";
import Preview from "./Preview";
// import { SAVE_LESSON } from "../utils/mutations";
// import { GET_ME } from "../utils/queries";
// import { saveLessonIds, getSavedLessonIds } from "../utils/localStorage";

const SearchResults = async (searchInput) => {
//   const [saveLesson] = useMutation(SAVE_LESSON);
//   const [savedLessonIds, setSavedLessonIds] = useState(getSavedLessonIds());
  const { loading, data } = useQuery(GET_LESSONS);
  const items = data?.searchInput || [];
  const [searchedLessons, setSearchedLessons] = useState([]);
  //   const [searchInput, setSearchInput] = useState("");

//   useEffect(() => {
//     return () => saveLessonIds(savedLessonIds);
//   });

  try {
    const response = await GET_LESSONS(searchInput);
    if (!response.ok) {
      throw new Error("something went wrong!");
    }
    const lessonData = await items.map((lesson) => ({
      title: lesson.title,
      teacher: lesson.teacher || ["No teacher to display"],
      topic: lesson.description,
      play_url: lesson.play_url || "",
    }));

    setSearchedLessons(lessonData);
    // setSearchInput("");
  } catch (err) {
    console.error(err);
  }

//   const handleSaveLesson = async (lessonId) => {
//     const lessonToSave = searchedLessons.find(
//       (lesson) => lesson.lessonId === lessonId
//     );
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       await saveLesson({
//         variables: { lesson: lessonToSave },
//         update: (cache) => {
//           const { me } = cache.readQuery({ query: GET_ME });
//           cache.writeQuery({
//             query: GET_ME,
//             data: {
//               me: {
//                 ...me,
//                 savedLessons: [...me.savedLessons, lessonToSave],
//               },
//             },
//           });
//         },
//       });

//       setSavedLessonIds([...savedLessonIds, lessonToSave.lessonId]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

  return (
    <>
      <Container className="text-colour bg-colour">
        <h2>
          {searchedLessons.length
            ? `Viewing ${searchedLessons.length} results:`
            : "Search for a lesson to begin"}
        </h2>
        <CardColumns>
          {searchedLessons.map((lesson) => {
            return (
                <Card
                    // key={lesson._id}
                    border="dark"
                >
                {/* {lesson.image ? (
                  <Card.Img
                    src={lesson.image}
                    alt={`The cover for ${lesson.title}`}
                    variant="top"
                  />
                ) : null} */}
                <Card.Body>
                  <Card.Title>{lesson.title}</Card.Title>
                  <p className="small">Teachers: {lesson.teachers}</p>
                  <Card.Text>{lesson.topic}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                    //   disabled={savedLessonIds?.some(
                    //     (savedLessonId) => savedLessonId === lesson.lessonId
                    //   )}
                      className="btn-block btn-info"
                    //   onClick={() => handleSaveLesson(lesson.lessonId)}
                    >
                      {/* {savedLessonIds?.some(
                        (savedLessonId) => savedLessonId === lesson.lessonId
                      )
                        ? "This lesson has already been saved!"
                        : "Save this lesson!"} */}
                                Save!
                    </Button>
                  )}
                </Card.Body>
                {lesson.preview ? (
                  <Preview url={lesson.play_url}></Preview>
                ) : (
                  ""
                )}
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchResults;
