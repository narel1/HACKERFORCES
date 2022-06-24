const express = require("express");
const router = express.Router();
const verifyToken = require("./middleware/verifyToken");

const ProblemController = require("./controllers/ProblemController");
const UserController = require("./controllers/UserController");

// Handle everything related to Problem, TestCases and its Submission.
router.get("/api/problems", verifyToken, ProblemController.getProblems);
router.post("/api/problems", verifyToken, ProblemController.createProblem);
router.get("/api/problem/:id", verifyToken, ProblemController.getProblem);
router.delete("/api/problem/:id", verifyToken, ProblemController.deleteProblem);
router.put("/api/problem", verifyToken, ProblemController.updateProblem);
router.get(
    "/api/problem/:id/testcases",
    verifyToken,
    ProblemController.getTestCases
);
router.post(
    "/api/problem/:id/testcases",
    verifyToken,
    ProblemController.createTestCase
);
router.post("/api/submission", verifyToken, ProblemController.createSubmission);

// Handle everything related to User.
router.post("/api/users", UserController.createUser);
router.post("/api/auth", UserController.authUser);

module.exports = router;
