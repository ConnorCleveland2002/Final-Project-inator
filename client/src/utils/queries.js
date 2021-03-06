import { gql } from "graphql-tag";

export const GET_ME = gql`
  query me {
    me {
      _id
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

export const GET_LESSONS = gql`
  query searchLessons($regex: String!) {
    searchLessons(searchInput: $regex) {
      title
      teacher
      topic
      play_url
    }
  }
`;

export const GET_SAVED_LESSONS = gql`
  query getSavedLessons {
    me {
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

export const SEARCH_ALL_LESSONS = gql`
  query searchAllLessons {
    searchAllLessons {
      _id
      title
      teacher
      host_id
      topic
      meeting_id
      play_url
    }
  }
`;
