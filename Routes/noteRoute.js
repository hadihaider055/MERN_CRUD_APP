const router = require("express").Router();
const auth = require("../Middleware/auth");
const noteCtrl = require("../Controllers/noteCtrl");

router.route("/").get(auth, noteCtrl.getNotes).post(auth, noteCtrl.createNote);

router
  .route("/:id")
  .get(auth, noteCtrl.getNote)
  .put(auth, noteCtrl.updateNote)
  .delete(auth, noteCtrl.deleteNote);

module.exports = router;
