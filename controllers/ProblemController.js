const axios = require("axios");

const Problem = require("../models/Problem");
const config = require("config");

const { PROBLEM_API, PROBLEM_ACCESS_TOKEN } = config;

module.exports = {
    getProblems(req, res) {
        Problem.find()
            .then((problems) => res.json(problems))
            .catch((err) => console.log(err));
    },

    getProblem(req, res) {
        Problem.findOne({ id: req.params.id })
            .then((problem) => res.json(problem))
            .catch((err) => console.log(err));
    },

    createProblem(req, res) {
        axios
            .post(
                `${PROBLEM_API}/problems?access_token=${PROBLEM_ACCESS_TOKEN}`,
                {
                    name: req.body.name,
                    body: req.body.body,
                    masterjudgeId: 1001,
                }
            )
            .then((response) => {
                const problem_id = response.data.id;
                axios
                    .get(
                        `${PROBLEM_API}/problems/${problem_id}?access_token=${PROBLEM_ACCESS_TOKEN}`
                    )
                    .then((response) => {
                        const { name, body, code, testcases, id } =
                            response.data;

                        const newProblem = new Problem({
                            name,
                            body,
                            code,
                            testcases,
                            id,
                        });

                        newProblem
                            .save()
                            .then((problem) => res.json(problem))
                            .catch((err) => res.status(400).json(err));
                    })
                    .catch((err) => res.status(500).json(err));
            })
            .catch((err) => res.status(500).json(err));
    },

    getTestCases(req, res) {
        const id = req.params.id;
        Problem.findOne({ id })
            .then((problem) => {
                const input = [];
                const output = [];
                const test_case_ids = [];
                const input_promises = [];
                const output_promises = [];
                for (const testcase of problem.testcases) {
                    test_case_ids.push(testcase.number);
                    input_promises.push(
                        axios
                            .get(
                                `${PROBLEM_API}/problems/${id}/testcases/${testcase.number}/input?access_token=${PROBLEM_ACCESS_TOKEN}`
                            )
                            .then((response) => input.push(response.data))
                            .catch((err) => res.status(500).json(err))
                    );

                    output_promises.push(
                        axios
                            .get(
                                `${PROBLEM_API}/problems/${id}/testcases/${testcase.number}/output?access_token=${PROBLEM_ACCESS_TOKEN}`
                            )
                            .then((response) => output.push(response.data))
                            .catch((err) => res.status(500).json(err))
                    );
                }
                Promise.all(input_promises).then(() => {
                    Promise.all(output_promises).then(() => {
                        return res.json({ input, output, test_case_ids });
                    });
                });
            })
            .catch((err) => console.log(err));
    },

    createSubmission(req, res) {
        axios
            .post(
                `${PROBLEM_API}/submissions?access_token=${PROBLEM_ACCESS_TOKEN}`,
                {
                    problemId: req.body.id,
                    source: req.body.source,
                    compilerId: 1,
                }
            )
            .then((response) => {
                const submission_id = response.data.id;
                const checkSubmission = () => {
                    axios
                        .get(
                            `${PROBLEM_API}/submissions/${submission_id}?access_token=${PROBLEM_ACCESS_TOKEN}`
                        )
                        .then((response) => {
                            if (response.data.executing) {
                                checkSubmission();
                            } else {
                                return res.json(response.data.result);
                            }
                        })
                        .catch((err) => res.json(400).json(err));
                };
                checkSubmission();
            })
            .catch((err) => res.status(500).json(err));
    },

    deleteProblem(req, res) {
        axios
            .delete(
                `${PROBLEM_API}/problems/${req.params.id}?access_token=${PROBLEM_ACCESS_TOKEN}`
            )
            .then(() => {
                Problem.deleteOne({ id: req.params.id })
                    .then(() => res.json())
                    .catch((err) => res.json(500).json(err));
            })
            .catch((err) => res.status(500).json(err));
    },

    updateProblem(req, res) {
        axios
            .put(
                `${PROBLEM_API}/problems/${req.body.id}?access_token=${PROBLEM_ACCESS_TOKEN}`,
                {
                    name: req.body.name,
                    body: req.body.body,
                }
            )
            .then(() => {
                Problem.updateOne(
                    { id: req.body.id },
                    { name: req.body.name, body: req.body.body }
                )
                    .then(() => res.json())
                    .catch((err) => res.status(400).json(err));
            })
            .catch((err) => res.status(400).json(err));
    },

    createTestCase(req, res) {
        axios
            .post(
                `${PROBLEM_API}/problems/${req.params.id}/testcases?access_token=${PROBLEM_ACCESS_TOKEN}`,
                {
                    input: req.body.input,
                    output: req.body.output,
                    judgeId: 1,
                }
            )
            .then((response) => {
                Problem.findOneAndUpdate(
                    { id: req.params.id },
                    {
                        $push: { testcases: response.data },
                    }
                )
                    .then(() => res.json(response.data))
                    .catch((err) => res.status(400).json(err));
            })
            .catch((err) => res.status(400).json(err));
    },
};
