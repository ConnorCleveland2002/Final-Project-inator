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
      }
    }
  }
`;

export const ADD_LESSON = gql`
mutation addLesson($title: String!, $teacher: String!, $topic: String!, $play_url: String!, $host_id: String) {
  addLesson(title: $title, teacher: $teacher, topic: $topic, play_url: $play_url, host_id: $host_id) {
    Lesson {
      title
      teacher
      topic
      play_url
      host_id
    }
  }
}
`
export const SAVE_LESSON = gql`
  mutation saveLesson($lesson: saveLessonInput) {
    saveLesson(lesson: $lesson) {
      username
      email 
      savedLessons {
        _id
        title
        teacher
        host_id
        topic
        meeting_id
        play_url
      }
    }
  }
`;

export const REMOVE_LESSON = gql`
  mutation removeLesson($play_url: String!) {
    removeLesson(play_url: $play_url) {
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

// export const SEARCH_LESSON = gql`
// mutation searchLessons($topic: topic) {
//   searchLessons(topic: $topic) {
//     title
//     topic
//     play_url
//   }
// }`;