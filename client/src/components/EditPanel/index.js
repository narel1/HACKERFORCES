import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Button,
    Label,
    Input,
    Form,
    FormGroup,
    Spinner,
    Row,
    Col,
    Card,
    CardSubtitle,
    CardText,
} from "reactstrap";

import api from "../../api";

import "./editpanel.css";

const EditPanel = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [body, setBody] = useState("");
    const [testcases, setTestcases] = useState([
        { input: "", output: "", id: "" },
    ]);
    const [isProblemUpdated, setIsProblemUpdate] = useState(true);
    const [problemUpdateStatus, setProblemUpdateStatus] = useState("");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    useEffect(() => {
        getProblem(id);
        getTestCases(id);
    }, [id]);

    const getTestCases = async (id) => {
        // TODO: Add update and delete operation for test cases.
        try {
            const res = await api.get("/api/problem/" + id + "/testcases");
            if (res.status === 200) {
                const { input, output, test_case_ids } = res.data;
                const test_cases = [];
                for (let idx = 0; idx < input.length; ++idx) {
                    test_cases.push({
                        input: input[idx],
                        output: output[idx],
                        id: test_case_ids[idx],
                    });
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
                const { name, body } = res.data;
                setName(name);
                setBody(body);
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

    const handleProblemSubmit = async (e) => {
        e.preventDefault();
        setIsProblemUpdate(false);
        try {
            const res = await api.put("/api/problem", {
                id,
                name,
                body,
            });
            if (res.status === 200) {
                setProblemUpdateStatus("Saved");
            } else {
                console.error(`Error: ${res.status}`);
                setProblemUpdateStatus("Error Occured");
            }
        } catch (err) {
            console.error(`Error: ${err}`);
            setProblemUpdateStatus("Error Occured");
        }
        setIsProblemUpdate(true);
    };

    const handleTestCaseSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/api/problem/" + id + "/testcases", {
                input,
                output,
            });
            if (res.status === 200) {
                setTestcases([
                    ...testcases,
                    { input, output, id: res.data.number },
                ]);
                setInput("");
                setOutput("");
            } else {
                console.error(`Error: ${res.status}`);
            }
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    };

    return (
        <>
            <div className="edit-problem">
                <Form onSubmit={handleProblemSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>{" "}
                        <Input
                            name="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Input>
                        <Label className="edit-body-label" for="body">
                            Body
                        </Label>{" "}
                        <Input
                            name="body"
                            bsSize="lg"
                            value={body}
                            type="textarea"
                            onChange={(e) => setBody(e.target.value)}
                        ></Input>
                        <Button
                            className="save-btn"
                            color="success"
                            type="submit"
                        >
                            Save Changes
                        </Button>
                        <span className="problem-status">
                            {problemUpdateStatus}
                        </span>
                    </FormGroup>
                </Form>
            </div>
            {!isProblemUpdated ? (
                <div className="update-status">
                    <Spinner color="success" size="">
                        Loading...
                    </Spinner>
                </div>
            ) : (
                <></>
            )}
            <div className="testcases">
                {testcases.map((testcase, idx) => (
                    <div className="testcase" key={idx}>
                        <Row className="testcase-row">
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
                    </div>
                ))}
            </div>
            <div className="add-testcase">
                <Form onSubmit={handleTestCaseSubmit} inline>
                    <FormGroup>
                        <Label for="input">Input</Label>
                        <Input
                            name="input"
                            value={input}
                            id="input"
                            type="text"
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </FormGroup>{" "}
                    <FormGroup>
                        <Label for="output">Output</Label>{" "}
                        <Input
                            name="output"
                            value={output}
                            id="output"
                            type="text"
                            onChange={(e) => setOutput(e.target.value)}
                        />
                    </FormGroup>{" "}
                    <Button className="save-btn" color="success" type="submit">
                        Add Test Case
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default EditPanel;
