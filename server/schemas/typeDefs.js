const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    me: User
    searchLessons: Lesson
  }

  type Mutation {
    login(email: String!
      password: String!
    ): Auth
    addUser(
      username: String!
      email: String!
      password: String!
    ): Auth
    addLesson(
      title: String!
      teacher: String!
      host_id: String
      topic: String!
      meeting_id: String
      play_url: String!
    ): Lesson
    saveLesson(
      title: String!
      teacher: String!
      host_id: String
      topic: String!
      meeting_id: String
      play_url: String!
    ): User
    removeLesson(
      title: String!
    ): User
  }

  type User {
    _id: ID
    username: String
    email: String
    savedLessons: [Lesson]
    savedTeachers: [User]
  }

  type Teacher {
    _id: ID
    username: String
    email: String
    savedLessons: [Lesson]
    savedTeachers: [User]
  }

  type Lesson {
    _id: ID
    title: String!
    teacher: String!
    host_id: String
    topic: String!
    meeting_id: String
    play_url: String!
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
