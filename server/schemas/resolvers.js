const { AuthenticationError } = require("apollo-server-core");
const { User, Lesson } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });
        return userData;
      }
    },
    searchLessons: async (parent, {searchInput}, context) => {
      const lessons = await Lesson.find({ topic: { $regex: searchInput } });
      return lessons;
    },
    // searchLessons: async (parent, { searchInput }, context) => {
    //   return await db.Lesson.find().where(searchInput = )
    // }
  },
  Mutation: {
    // searchLessons: async (parent, { searchInput }, context) => {
    //   const lessons = await Lesson.find({ topic: searchInput });
    //   return lessons;
    // },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Error, no user");
      }
      const passwordValidation = await user.isCorrectPassword(password);
      if (!passwordValidation) {
        throw new AuthenticationError("Error, wrong password");
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log(error);
      }
    },
    addLesson: async (parent, args) => {
      try {
        const lesson = await Lesson.create(args);
        return { user };
      } catch (error) {
        console.log(error);
      }
    },
    saveLesson: async (parent, { lesson }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedLessons: lesson } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeLesson: async (parent, { lessonId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedLessons: { lessonId: lessonId } } },
          { new: true }
        );
        return updatedUser;
      }
    },
  },
};

module.exports = resolvers;