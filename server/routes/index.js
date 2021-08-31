const router = require("express").Router();
const path = require("path");
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

// router.use((req, res) => {
//   res.sendFile(path.join(__dirname, "../../client/public/index.html"));
// });
router.get("/", async (req, res) => {
  res.render("../../client/public/index.html")
});

module.exports = router;
