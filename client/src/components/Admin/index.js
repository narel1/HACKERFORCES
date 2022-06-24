import React, { useEffect, useState } from "react";
import api from "../../api";
import ProblemCard from "../ProblemCard";

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";

import "./admin.css";

const Admin = () => {
    const [problems, setProblems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false);
    const [name, setName] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        getProblems();
    }, []);

    const getProblems = async () => {
        try {
            const res = await api.get("/api/problems");
            if (res.status === 200) {
                setProblems([...res.data]);
            } else {
                console.error(`Error: ${res.status}`);
                setError(res);
            }
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setError(err);
        }
    };

    const toggle = () => setModal(!modal);
    const handleSubmit = async () => {
        try {
            const res = await api.post("/api/problems", {
                name,
                body,
            });
            if (res.status === 200) {
                setProblems([...problems, res.data]);
            } else {
                console.error(`Error: ${res.status}`);
            }
        } catch (err) {
            console.error(err);
        }
        toggle();
    };

    if (isLoading) {
        return <div>Loading ...</div>;
    } else if (error !== null) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <div className="create-problem">
                <Button
                    className="create-problem-btn"
                    color="success"
                    onClick={toggle}
                >
                    Create New Problem
                </Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        Create a new problem
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>{" "}
                                <Input
                                    name="name"
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                ></Input>
                                <Label for="body">Body</Label>{" "}
                                <Input
                                    name="body"
                                    bsSize="lg"
                                    type="textarea"
                                    onChange={(e) => setBody(e.target.value)}
                                ></Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>

            <div className="problems-list">
                {problems.map((problem) => (
                    <ProblemCard
                        key={problem.id}
                        id={problem.id}
                        name={problem.name}
                        code={problem.code}
                        isAdmin={true}
                    />
                ))}
            </div>
        </>
    );
};

export default Admin;
