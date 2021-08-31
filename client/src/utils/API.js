export const getMe = (
  // token
) => {
  return fetch("/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      // authorization: `Bearer ${token}`,
    },
  });
};

export const searchLessons = () => {
  return fetch("/api/lessons", {
    
  })
}

export const createUser = (userData) => {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const saveLesson = (lessonData, token) => {
  return fetch("/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(lessonData),
  });
};

export const deleteLesson = (lessonId, token) => {
  return fetch(`/api/users/lessons/${lessonId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// export const searchZoomLessons = (query) => {
//     return fetch(`https://api.zoom.us/v2/meetings/${query}/recordings`);
//     //query is MeetingID
// };