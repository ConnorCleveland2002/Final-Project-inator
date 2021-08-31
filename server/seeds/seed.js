const db = require("../config/connection");
const { Lesson, User } = require("../models");

const lessonData = require("./lessonData.json");
const userData = require("./userData.json");

db.once("open", async () => {
  await Lesson.deleteMany({});
  await User.deleteMany({});

  const lessonsConst = await Lesson.insertMany(lessonData);
  const userConst = await User.insertMany(userData);

  console.log(lessonData);
  console.log(userData);
  process.exit(0);
});
