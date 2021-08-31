import { gql } from "graphql-tag";

export const GET_ME = gql`
  query me {
    me {
      _id
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

export const GET_LESSONS = gql`
  query searchLessons {
    searchLessons {
      title
      teacher
      topic
      play_url
    }
  }
`;
