import express from "express";
import { body } from "express-validator";
import middlewareConfig from "../middleware/index.js";
import {
  changePasswordController,
  loginController,
  registerController,
  validateTokenController,
} from "../controllers/auth.controller.js";
import {
  getAllLlmModelsController,
  addLlmModelController,
  getLlmModelByIdController,
  updateLlmModelByIdController,
  deleteLlmModelByIdController,
} from "../controllers/llmModel.controller.js";
import {
  getAllNewsController,
  addNewsController,
  getNewsByIdController,
  updateNewsByIdController,
  deleteNewsByIdController,
  getRelatedNewsByModelNameController,
} from "../controllers/news.controller.js";
import {
  addRatingController,
  getRatingByModelIdController,
} from "../controllers/rating.controller.js";

import {
  addMatrixEntryController,
  getMatrixEntriesByModelIdController,
  updateMatrixEntryController,
  deleteMatrixEntryController,
} from "../controllers/matrix.controller.js";

import authJwt from "../middleware/authJwt.js";
const { verifyToken, isAdmin } = authJwt;
const router = express.Router();
const { verifyRegistration } = middlewareConfig;

router.use((req, res, next) => {
  res.header(
    `Access-Control-Allow-Headers`,
    `x-access-token, Origin, Content-Type, Accept`
  );
  next();
});

router.get("/", (req, res) => {
  res.send("Hello, world!");
});

router.post(
  "/auth/register",
  [
    body("username").exists().escape(),
    body("full_name")
      .exists()
      .custom((value) => {
        if (
          typeof value === "object" &&
          Object.keys(value).length === 3 &&
          typeof value.first_name === "string" &&
          typeof value.last_name === "string" &&
          value.first_name.trim() !== "" &&
          value.last_name.trim() !== ""
        ) {
          return true;
        } else {
          throw new Error("Invalid full_name object");
        }
      }),
    body("email").exists().normalizeEmail().isEmail(),
    body("password").exists().escape(),
    body("role").optional().isIn(["admin", "customer"]),
    verifyRegistration.checkDuplicateUsernameOrEmail,
  ],
  registerController
);

router.post(
  `/auth/login`,
  [body(`username`).exists().escape(), body(`password`).exists().escape()],
  loginController
);

router.get(`/auth/verify-token`, verifyToken, validateTokenController);

router.get("/llm-models", getAllLlmModelsController);
router.post("/llm-models", verifyToken, addLlmModelController);
router.get("/llm-models/:id", verifyToken, getLlmModelByIdController);
router.put("/llm-models/:id", verifyToken, updateLlmModelByIdController);
router.delete("/llm-models/:id", verifyToken, deleteLlmModelByIdController);

router.get("/news", getAllNewsController);
router.get("/news/related/:name", getRelatedNewsByModelNameController);
router.post("/news", verifyToken, addNewsController);
router.get("/news/:id", getNewsByIdController);
router.put("/news/:id", verifyToken, updateNewsByIdController);
router.delete("/news/:id", verifyToken, deleteNewsByIdController);

router.post("/rating", verifyToken, addRatingController);
router.get("/rating/:modelId", getRatingByModelIdController);

router.post("/matrix", addMatrixEntryController);
router.get("/matrix/:modelId", getMatrixEntriesByModelIdController);
router.put("/matrix/:id", updateMatrixEntryController);
router.delete("/matrix/:id", deleteMatrixEntryController);
export default router;
