import React, { useState } from "react";

import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Container,
    Row,
    Col,
} from "reactstrap";

import api from "../../api";

import "./dashboard.css";

const Dashboard = () => {
    const [studentEmail, setStudentEmail] = useState("");
    const [studentPassword, setStudentPassword] = useState("");

    const [studentLoginEmail, setStudentLoginEmail] = useState("");
    const [studentLoginPassword, setStudentLoginPassword] = useState("");

    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");

    const [adminLoginEmail, setAdminLoginEmail] = useState("");
    const [adminLoginPassword, setAdminLoginPassword] = useState("");

    const handleStudent = async (e) => {
        e.preventDefault();
        // Create Student
        try {
            const res = await api.post("/api/users", {
                email: studentEmail,
                password: studentPassword,
                isAdmin: false,
            });
            if (res.status === 200) {
                setStudentEmail("");
                setStudentPassword("");
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user_id", res.data.user.id);
                localStorage.setItem("user_email", res.data.user.email);
                window.location = "/student";
            } else {
                console.error(`Error: ${res.status}`);
            }
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    };

    const handleStudentLogin = async (e) => {
        e.preventDefault();
        // Login Student
        try {
            const res = await api.post("/api/auth", {
                email: studentLoginEmail,
                password: studentLoginPassword,
                isAdmin: false,
            });
            if (res.status === 200) {
                setStudentLoginEmail("");
                setStudentLoginPassword("");
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user_id", res.data.user.id);
                localStorage.setItem("user_email", res.data.user.email);
                window.location = "/student";
            } else {
                console.error(`Error: ${res.status}`);
            }
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    };

    const handleAdmin = async (e) => {
        e.preventDefault();
        // Create Admin
        try {
            const res = await api.post("/api/users", {
                email: adminEmail,
                password: adminPassword,
                isAdmin: true,
            });
            if (res.status === 200) {
                setAdminEmail("");
                setAdminPassword("");
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user_id", res.data.user.id);
                localStorage.setItem("user_email", res.data.user.email);
                window.location = "/admin";
            } else {
                console.error(`Error: ${res.status}`);
            }
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    };

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        // Login Admin
        try {
            const res = await api.post("/api/auth", {
                email: adminLoginEmail,
                password: adminLoginPassword,
                isAdmin: true,
            });
            if (res.status === 200) {
                setAdminLoginEmail("");
                setAdminLoginPassword("");
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user_id", res.data.user.id);
                localStorage.setItem("user_email", res.data.user.email);
                window.location = "/admin";
            } else {
                console.error(`Error: ${res.status}`);
            }
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    };

    return (
        <>
            <Container>
                <h1>Hackerforces</h1>
                <Row className="signup-row">
                    <Col className="student-col" xs="6">
                        <div className="student-login-signup">
                            <Form onSubmit={handleStudent}>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={studentEmail || ""}
                                        onChange={(e) =>
                                            setStudentEmail(e.target.value)
                                        }
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={studentPassword || ""}
                                        onChange={(e) =>
                                            setStudentPassword(e.target.value)
                                        }
                                    />
                                </FormGroup>
                                <Button
                                    className="create-student-btn"
                                    color="success"
                                    type="submit"
                                >
                                    Create Student
                                </Button>
                            </Form>
                        </div>
                    </Col>
                    <Col className="admin-col" xs="6">
                        <div className="student-login-signup">
                            <Form onSubmit={handleAdmin}>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={adminEmail || ""}
                                        onChange={(e) =>
                                            setAdminEmail(e.target.value)
                                        }
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={adminPassword || ""}
                                        onChange={(e) =>
                                            setAdminPassword(e.target.value)
                                        }
                                    />
                                </FormGroup>
                                <Button
                                    className="create-admin-btn"
                                    color="success"
                                    type="submit"
                                >
                                    Create Admin
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
                <Row className="login-row">
                    <Col className="student-col" xs="6">
                        <div className="student-login-signup">
                            <Form onSubmit={handleStudentLogin}>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={studentLoginEmail || ""}
                                        onChange={(e) =>
                                            setStudentLoginEmail(e.target.value)
                                        }
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={studentLoginPassword || ""}
                                        onChange={(e) =>
                                            setStudentLoginPassword(
                                                e.target.value
                                            )
                                        }
                                    />
                                </FormGroup>
                                <Button
                                    className="create-student-btn"
                                    color="success"
                                    type="submit"
                                >
                                    Login Student
                                </Button>
                            </Form>
                        </div>
                    </Col>
                    <Col className="admin-col" xs="6">
                        <div className="student-login-signup">
                            <Form onSubmit={handleAdminLogin}>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={adminLoginEmail || ""}
                                        onChange={(e) =>
                                            setAdminLoginEmail(e.target.value)
                                        }
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={adminLoginPassword || ""}
                                        onChange={(e) =>
                                            setAdminLoginPassword(
                                                e.target.value
                                            )
                                        }
                                    />
                                </FormGroup>
                                <Button
                                    className="create-admin-btn"
                                    color="success"
                                    type="submit"
                                >
                                    Login Admin
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Dashboard;
