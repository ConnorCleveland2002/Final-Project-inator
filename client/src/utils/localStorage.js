export const getSavedLessonIds = () => {
  const savedLessonIds = localStorage.getItem("saved_lessons")
    ? JSON.parse(localStorage.getItem("saved_lessons"))
    : [];

  return savedLessonIds;
};

export const saveLessonIds = (lessonIdArr) => {
  if (lessonIdArr.length) {
    localStorage.setItem("saved_lessons", JSON.stringify(lessonIdArr));
  } else {
    localStorage.removeItem("saved_lessons");
  }
};

export const removeLessonId = (lessonId) => {
  const savedLessonIds = localStorage.getItem("saved_lessons")
    ? JSON.parse(localStorage.getItem("saved_lessons"))
    : null;

  if (!savedLessonIds) {
    return false;
  }

  const updatedSavedLessonIds = savedLessonIds?.filter(
    (savedLessonId) => savedLessonId !== lessonId
  );
  localStorage.setItem("saved_lessons", JSON.stringify(updatedSavedLessonIds));

  return true;
};
