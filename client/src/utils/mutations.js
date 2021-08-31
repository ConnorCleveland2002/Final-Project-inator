import { gql } from "graphql-tag";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_LESSON = gql`
  mutation saveLesson($lesson: saveLessonInput!) {
    saveLesson(lesson: $lesson) {
      username
      email
      savedLessons {
        host_id
        topic
        meeting_id
        play_url
      }
    }
  }
`;

export const REMOVE_LESSON = gql`
  mutation removeLesson($lessonId: String!) {
    removeLesson(lessonId: $lessonId) {
      username
      email
      savedLessons {
        host_id
        topic
        meeting_id
        play_url
      }
    }
  }
`;
