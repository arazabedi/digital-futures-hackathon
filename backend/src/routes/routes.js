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

import authJwt from "../middleware/authJwt.js";
const { verifyToken } = authJwt;
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
export default router;
