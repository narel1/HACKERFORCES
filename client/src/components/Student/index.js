import React, { useEffect, useState } from "react";
import api from "../../api";
import ProblemCard from "../ProblemCard";

import "./student.css";

const Student = () => {
    const [problems, setProblems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (isLoading) {
        return <div>Loading ...</div>;
    } else if (error !== null) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="problems-list">
            {problems.map((problem) => (
                <ProblemCard
                    key={problem.id}
                    id={problem.id}
                    name={problem.name}
                    code={problem.code}
                    isAdmin={false}
                />
            ))}
        </div>
    );
};

export default Student;
