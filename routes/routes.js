const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const { signIn, refreshToken, signUp } = require("../controllers/auth");
const { upload, getAll, remove, getById, download, update } = require("../controllers/file");
const { info, logout } = require("../controllers/profile");

router.post("/signin", signIn);
router.post("/signin/new_token", refreshToken);
router.post("/signup", signUp);

router.post("/file/upload", verifyToken, upload);
router.get("/file/list", verifyToken, getAll);
router.delete("/file/delete/:id", verifyToken, remove);
router.get("/file/:id", verifyToken, getById);
router.get("/file/download/:id", verifyToken, download);
router.put("/file/update/:id", verifyToken, update);

router.get("/info", verifyToken, info);
router.get("/logout", verifyToken, logout);

module.exports = router;