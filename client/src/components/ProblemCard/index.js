import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";

import api from "../../api";

import "./problemcard.css";

const ProblemCard = ({ id, name, code, isAdmin }) => {
    const [isPresent, setIsPresent] = useState(true);

    const handleDelete = async () => {
        try {
            const res = await api.delete("/api/problem/" + id);
            if (res.status === 200) {
                setIsPresent(false);
            } else {
                console.error(`Error: ${res.status}`);
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (!isPresent) {
        return <></>;
    }
    return (
        <div className="problem">
            <Card color="dark" inverse>
                <CardBody>
                    <CardTitle tag="h5">{name}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                        {code}
                    </CardSubtitle>
                    {!isAdmin ? (
                        <Button color="success" href={"problems/" + id}>Open</Button>
                    ) : (
                        <Button color="success" href={"edit-problem/" + id}>Open</Button>
                    )}
                    {isAdmin ? (
                        <Button
                            className="delete-btn"
                            color="danger"
                            type="submit"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    ) : (
                        <></>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default ProblemCard;
