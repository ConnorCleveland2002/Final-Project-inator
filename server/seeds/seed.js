const db = require("../config/connection");
const { Lesson } = require("../models");

const lessonData = require("./lessonData.json");

db.once("open", async () => {
  await Lesson.deleteMany({});

  const lessonsConst = await Lesson.insertMany(lessonData);

  console.log(lessonData);
  process.exit(0);
});
