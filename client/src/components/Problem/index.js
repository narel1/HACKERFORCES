import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Card,
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
    Label,
    Row,
    Col,
    Input,
    Form,
    FormGroup,
    Spinner,
} from "reactstrap";

import api from "../../api";

import "./problem.css";

const Problem = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState({
        name: "",
        body: "",
        code: "",
        testcases: [],
    });
    const [sourceCode, setSourceCode] = useState("");
    const [testcases, setTestcases] = useState([{ input: "", output: "" }]);
    const [isProblemLoading, setIsProblemLoading] = useState(true);
    const [error, setError] = useState(null);
    const [resultPending, setResultPending] = useState(false);
    const [result, setResult] = useState("");

    useEffect(() => {
        getProblem(id);
        getTestCases(id);
    }, [id]);

    const getTestCases = async (id) => {
        try {
            const res = await api.get("/api/problem/" + id + "/testcases");
            if (res.status === 200) {
                const { input, output } = res.data;
                const test_cases = [];
                for (let idx = 0; idx < input.length; ++idx) {
                    test_cases.push({ input: input[idx], output: output[idx] });
                }
                setTestcases([...test_cases]);
            } else {
                console.error(`Error: ${res.status}`);
                // setError(res);
            }
            // setIsProblemLoading(false);
        } catch (err) {
            console.error(err);
            // setError(err);
        }
    };

    const getProblem = async (id) => {
        try {
            const res = await api.get("/api/problem/" + id);
            if (res.status === 200) {
                const { name, body, code, testcases } = res.data;
                setProblem({ name, body, code, testcases });
            } else {
                console.error(`Error: ${res.status}`);
                setError(res);
            }
            setIsProblemLoading(false);
        } catch (err) {
            console.error(err);
            setError(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResultPending(true);
        try {
            const res = await api.post("/api/submission/", {
                id,
                source: sourceCode,
            });
            if (res.status === 200) {
                setResult(res.data.status.name);
            } else {
                console.error(`Error: ${res.status}`);
            }
        } catch (err) {
            console.error(`Error: ${err}`);
        }
        setResultPending(false);
    };

    if (isProblemLoading) {
        return <div>Loading ...</div>;
    } else if (error !== null) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <div className="full-problem">
                <Card body color="secondary" outline>
                    <CardTitle tag="h5">{problem.name}</CardTitle>
                    <CardSubtitle>{problem.code}</CardSubtitle>
                    <CardText>{problem.body}</CardText>
                </Card>
            </div>
            <div className="testcases">
                {testcases.map((testcase, idx) => (
                    <Row className="testcase-row" key={idx}>
                        <Col sm="6">
                            <Card body>
                                <CardSubtitle>
                                    <strong>Input</strong>
                                </CardSubtitle>
                                <CardText>{testcase.input}</CardText>
                            </Card>
                        </Col>
                        <Col sm="6">
                            <Card body>
                                <CardSubtitle>
                                    <strong>Output</strong>
                                </CardSubtitle>
                                <CardText>{testcase.output}</CardText>
                            </Card>
                        </Col>
                    </Row>
                ))}
            </div>
            <div className="submission">
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="source">Code</Label>{" "}
                        <Input
                            name="source"
                            bsSize="lg"
                            type="textarea"
                            onChange={(e) => setSourceCode(e.target.value)}
                        ></Input>
                    </FormGroup>
                    <Button color="success" type="submit">Submit</Button>
                    <span className="result">{result}</span>
                </Form>
            </div>
            {resultPending ? (
                <div className="submission-status">
                    <Spinner color="success" size="">
                        Loading...
                    </Spinner>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default Problem;
