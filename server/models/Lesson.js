const { Schema, model } = require("mongoose");
// const bcrypt = require("bcrypt");

const lessonSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    teacher: {
      type: String,
      required: true,
      unique: true,
    },
    topic: {
        type: String,
        required: true,
    },
    play_url: {
        type: String,
        required: true,
    },
    host_id: {
        type: String,
        required: false,
    }
    // password: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// lessonSchema.pre("save", async function (next) {
//   if (this.isNew || this.isModified("password")) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }

//   next();
// });

// lessonSchema.methods.isCorrectPassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

lessonSchema.virtual("lessonCount").get(function () {
  return this.savedLessonss.length;
});

const Lesson = model("Lesson", lessonSchema);

module.exports = Lesson;
